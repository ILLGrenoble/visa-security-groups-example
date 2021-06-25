import { Connection, createConnection, EntityManager, ObjectType, Repository } from 'typeorm';
import { logger } from '../utils';
import { APPLICATION_CONFIG } from '../application-config';
import { DataSource } from './datasource';

export class TypeORMDataSource implements DataSource {
  static dataSourceName = 'typeorm';

  private _config: any;
  private _connection: Connection;
  private _connectionPromise: Promise<Connection>;

  constructor() {
    this._config = {
      type: APPLICATION_CONFIG().database.type,
      host: APPLICATION_CONFIG().database.host,
      port: APPLICATION_CONFIG().database.port,
      username: APPLICATION_CONFIG().database.user,
      password: APPLICATION_CONFIG().database.password,
      database: APPLICATION_CONFIG().database.name,
      schema: APPLICATION_CONFIG().database.schema,
      logging: APPLICATION_CONFIG().database.logging,
      synchronize: false
    };
  }

  /**
   * Start the datasource when application is started
   */
  async start(): Promise<void> {
    logger.info('Initialising database connection');
    await this.connection();
  }

  /**
   * Disconnect the datasource when application is stopped. This allows the
   * application to be shut down gracefully.
   */
  async stop(): Promise<void> {
    if (this._connection) {
      logger.info('Closing database connection');
      await this._connection.close();
      this._connection = null;
    }
  }

  /**
   * Main entry point to make a database query containing a query string and list of query parameter values
   * @param queryData The query string an parameter values
   * @returns The raw database results (rows of data)
   */
  async query(queryData: {text: string, values?: any[]}) {
    const connection = await this.connection();
    const entityManager = connection.manager;

    return entityManager.query(queryData.text, queryData.values);
  }

  /**
   * Returns a promise containing the database connection. Will make the connection only once and return the same one to all subsequent calls 
   */
   private async connection(): Promise<Connection> {
    try {
      let connection = this._connection;
      if (connection == null && this._connectionPromise == null) {
        this._connectionPromise = createConnection(this._config);
        connection = this._connection = await this._connectionPromise;
      } else if (connection == null && this._connectionPromise != null) {
        connection = await this._connectionPromise;
      }

      return connection;
    } catch (error) {
      logger.error(`Could not connect to the database : ${error.message}`);
      process.exit();
    }
  }
}
