import { SecurityGroupRepository } from '../../repositories';
import { SecurityGroupService } from '../../services';
import { testDataSource } from '../fixtures/datasources/testdb.datasource';

export interface TestApplicationContext {
  securityGroupRepository: SecurityGroupRepository;
  securityGroupService: SecurityGroupService;
}

export function createTestApplicationContext(): TestApplicationContext {
  const securityGroupRepository = new SecurityGroupRepository(testDataSource);
  const securityGroupService = new SecurityGroupService(securityGroupRepository);

  return {
    securityGroupRepository,
    securityGroupService,
  };
}
