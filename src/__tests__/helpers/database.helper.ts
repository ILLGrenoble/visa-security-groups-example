import * as fs from 'fs';
import { DataSource } from '../../datasources';
import { logger } from '../../utils';
import { testDataSource } from '../fixtures/datasources/testdb.datasource';

async function emptyDatabase(datasource: DataSource) {
  const tables = ['security_group_filter', 'security_group'];
  for (const table of tables) {
    try {
      await datasource.query({text: `drop table if exists ${table};`});
    } catch (error) {
      logger.error(error.message);
    }
  }
}

export function givenInitialisedTestDatabase() {
  return givenInitialisedDatabase(testDataSource);
}

export async function givenInitialisedDatabase(datasource: DataSource) {
  await datasource.start();
  await emptyDatabase(datasource);

  const fixtures = fs.readFileSync('./resources/__tests__/fixtures.sql', 'utf8');
  const sqlQueries = fixtures
    .replace(/(\r\n|\n|\r)/gm, '')
    .split(';')
    .filter(query => query.length > 0)
    .map(query => query + ';');

  for (let i = 0; i < sqlQueries.length; i++) {
    const sqlQuery = sqlQueries[i];
    try {
      logger.debug(`Executing fixtures SQL query : ${sqlQuery}`);
      await datasource.query({text: sqlQuery});
    } catch (error) {
      logger.error(error);
    }
  }
}

export async function closeTestDatabase() {
  await testDataSource.stop();
}
