import { CategoryHome } from './category-home';
import { CategoryRoom } from './category-room';
import { StatusHome } from './status-home';

export interface Home {
    id?: string;
    name: string;
    address: string;
    bedroomQuantity: number;
    bathroomQuantity: number;
    price: number;
    file: string;
    description: string;
    categoryHome?: CategoryHome;
    categoryRoom?: CategoryRoom;
    statusHome?: StatusHome;
}
