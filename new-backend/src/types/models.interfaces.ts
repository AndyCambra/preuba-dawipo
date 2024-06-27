export interface UserAttributes {
    id: string;
    name: string;
    lastName: string;
    email: string;
    password: string;
    avatarUrl?: string | null;
    rol: 'user' | 'admin';
};

export interface ConnectorAttributes {
    id: string;
    name: string;
    apiUrl: string;
    apiKey: string;
};

export interface ShipmentAttributes {
    id: string;
    name: string;
    trackingNumber?: string | null;
    originCountry?: string | null;
    finalCountry?: string | null;
    departureDate?: string | null;
    arrivalDate?: string | null;
    status?: string | null;
    provider?: string | null;
    courier?: string | null;
};
  