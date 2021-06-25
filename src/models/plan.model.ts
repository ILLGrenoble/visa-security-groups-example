import {Image} from "./image.model";
import {Flavour} from "./flavour.model";

export interface Plan {

  id: number;
  image: Image;
  flavour: Flavour;
}
