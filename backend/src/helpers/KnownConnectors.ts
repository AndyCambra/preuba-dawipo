class KnownConnectors {
  private connectors: string[];

  constructor() {
    this.connectors = ["DHL", "MSC"];
  }

  public getConnectors(): string[] {
    return this.connectors;
  }

  public addConnector(connector: string): void {
    if (!this.connectors.includes(connector.toUpperCase())) {
      this.connectors.push(connector.toUpperCase());
    }
  }

  public removeConnector(connector: string): void {
    this.connectors = this.connectors.filter(
      (existingConnector) => existingConnector !== connector.toUpperCase()
    );
  }
}

export default new KnownConnectors();
