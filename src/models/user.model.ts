import { Employer } from "./employer.model";
import {Role} from "./role.model";

export interface User {

  id: string;
  firstName: string;
  lastName: string;
  email?: string;
  affiliation?: Employer;
  roles?: Role[];
}
