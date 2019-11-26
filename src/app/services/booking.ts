import {User} from './user';

export interface Booking {
    id?: string;
    checkin: string;
    checkout: string;
    home?: string;
    user?: User;
}
