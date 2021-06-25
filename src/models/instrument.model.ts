import { User } from "./user.model";

export interface Instrument {

  id: number;
  name?: string;
  scientists?: User[];
}
