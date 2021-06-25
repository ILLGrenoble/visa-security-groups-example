import {InstanceMember} from "./instance-member.model";
import {Plan} from "./plan.model";
import {InstanceAttribute} from "./instance-attribute.model";
import {Experiment} from "./experiment.model";

export interface Instance {

  id: number;
  name?: string;
  username?: string;
  plan: Plan;
  members: InstanceMember[];
  experiments?: Experiment[];
  attributes?: InstanceAttribute[];
}
