/*    
These interfaces as well as the models and DTOs are temporarily flexible
        (certain null fields are temporarily allowed)
*/

type MaybeString = string | null;

export interface IUser {
  id: string;
  name: string;
  lastName: string;
  email: string;
  password: string;
  avatarUrl?: MaybeString;
  rol: 'user' | 'admin';
}

export interface IConnector {
  id: string;
  name: string;
  apiUrl?: MaybeString;
  apiKey?: MaybeString;
}

export interface IShipment {
  id: string;
  name: string;
  trackingNumber?: MaybeString;
  originCountry?: MaybeString;
  finalCountry?: MaybeString;
  departureDate?: MaybeString;
  arrivalDate?: MaybeString;
  status?: MaybeString;
  provider?: MaybeString;
  courier?: MaybeString;
}
