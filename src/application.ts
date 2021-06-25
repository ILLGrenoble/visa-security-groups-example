import "reflect-metadata";
import { authenticationMiddleware, logger } from './utils';
import express from 'express'
import * as http from 'http';
import {SecurityGroupController} from "./controllers";
import { DataSource, TypeORMDataSource } from './datasources';
import { APPLICATION_CONFIG } from './application-config';
import { container } from "tsyringe";

export class Application {

  private _server: http.Server;
  private _datasource: DataSource = new TypeORMDataSource();

  constructor() {
    this._init();
  }

  async start(): Promise<null> {
    if (!this._server) {
      // Start the application
      logger.info('Starting application');

      const app = express();
      app.use(express.json());
      app.use(authenticationMiddleware)

      await this._datasource.start();

      app.post('/api/securitygroups', (req, res) => container.resolve(SecurityGroupController).post(req, res));

      const port = APPLICATION_CONFIG().server.port;
      const host = APPLICATION_CONFIG().server.host;
      this._server = app.listen(port, host);

      logger.info(`Application started (listening on ${host}:${port})`);
    }

    return null;
  }

  async stop(): Promise<null> {
    if (this._server) {
      logger.info('Stopping http server...');
      this._server.close();

      await this._datasource.stop(); 

      logger.info('... http server stopped');
      this._server = null;
    }

    return null;
  }

  private _init() {
    container.register<DataSource>("DataSource", {
      useValue: this._datasource
    });
  }
}

