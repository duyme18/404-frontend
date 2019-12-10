import {CategoryHome} from './category-home';
import {CategoryRoom} from './category-room';
import {StatusHome} from './status-home';
import {Booking} from './booking';

export interface Home {
  id?: number;
  name: string;
  address: string;
  bedroomQuantity: number;
  bathroomQuantity: number;
  price: string;
  file: string;
  description: string;
  categoryHome?: CategoryHome;
  categoryRoom?: CategoryRoom;
  statusHome?: StatusHome;
  booking?: Booking;
}
