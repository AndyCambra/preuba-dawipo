export interface CreateShipmentDTO {
  name: string;
  id: string;
  trackingNumber?: string | null;
  originCountry?: string | null;
  finalCountry?: string | null;
  departureDate?: string | null;
  arrivalDate?: string | null;
  status?: string | null;
  provider?: string | null;
  courier?: string | null;
}

export interface UpdateShipmentDTO {
  name?: string;
  trackingNumber?: string | null;
  originCountry?: string | null;
  finalCountry?: string | null;
  departureDate?: string | null;
  arrivalDate?: string | null;
  status?: string | null;
  provider?: string | null;
  courier?: string | null;
}
