import {User} from './user';

export interface Booking {
    id?: number;
    checkin: string;
    checkout: string;
    home?: string;
    user?: User;
}
