import {User} from "./user.model";

export interface InstanceMember {

  id: number;
  role: string;
  user: User;
}
