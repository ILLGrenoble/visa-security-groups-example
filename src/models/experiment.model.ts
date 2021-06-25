import {Cycle} from "./cycle.model";
import {Instrument} from "./instrument.model";
import {Proposal} from "./proposal.model";

export interface Experiment {

  id: string;
  cycle: Cycle;
  instrument: Instrument;
  proposal: Proposal;
  startDate: Date;
  endDate: Date;
}
