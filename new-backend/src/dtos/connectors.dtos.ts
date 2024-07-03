export interface CreateConnectorDTO {
  name: string;
  id: string;
  apiUrl?: string;
  apiKey?: string;
}

export interface UpdateConnectorDTO {
  name: string;
  id: string;
  apiUrl?: string;
  apiKey?: string;
}
