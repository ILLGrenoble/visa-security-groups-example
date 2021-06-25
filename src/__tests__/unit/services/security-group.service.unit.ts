import { describe } from 'mocha';
import { expect } from 'chai';
import { givenInitialisedTestDatabase, closeTestDatabase } from '../../helpers/database.helper';
import { createTestApplicationContext, TestApplicationContext } from '../../helpers/context.helper';
import { Cycle, Experiment, Instrument } from '../../../models';

describe('SecurityGroupService', () => {
  let context: TestApplicationContext;

  before('get context', async () => {
    context = createTestApplicationContext();
  });

  after('close db connect', closeTestDatabase);

  beforeEach('Initialise Database', async() => {
    await givenInitialisedTestDatabase();
  });

  it('gets specific instrument security groups', async () => {
    const instruments: Instrument[] = [
      { id: 2, name: 'instr1' }, { id: 3, name: 'instr2' }, { id: 5, name: 'instr5' }
    ];

    const securityGroups = await context.securityGroupService.getInstrumentBasedSecurityGroups(instruments);
    expect(securityGroups.length).to.equal(2);
  });

  it('gets instrument security groups for specific experiments', async () => {
    const getDate = (differenceInDays: number ) => new Date(new Date().getTime() + differenceInDays * 24 * 60 * 60 * 1000);

    const currentCycle: Cycle = { id: 620, startDate: getDate(-10), endDate: getDate(+10) };
    const previousCycle: Cycle = { id: 520, startDate: getDate(-100), endDate: getDate(-80) };

    const experiments: Experiment[] = [
      { id: '0006-0001-000001', proposal: {id: 1}, cycle: currentCycle, instrument: {id: 1}, startDate: getDate(-3), endDate: getDate(+1) }, 
      { id: '0006-0002-000001', proposal: {id: 1}, cycle: currentCycle, instrument: {id: 2}, startDate: getDate(-1), endDate: getDate(+1) }, 
      { id: '0006-0005-000001', proposal: {id: 1}, cycle: currentCycle, instrument: {id: 5}, startDate: getDate(0), endDate: getDate(+1) },
      { id: '0005-0003-000001', proposal: {id: 1}, cycle: previousCycle, instrument: {id: 3}, startDate: getDate(-90), endDate: getDate(-88) }
    ];

    const securityGroups = await context.securityGroupService.getInstrumentBasedSecurityGroupsFromExperiments(experiments);
    expect(securityGroups.length).to.equal(2);
  });

});
