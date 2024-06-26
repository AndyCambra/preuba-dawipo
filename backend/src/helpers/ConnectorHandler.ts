import axios from "axios";

class ConnectorHandler {
  private name: string;
  private apiKey: string;

  constructor(name: string, apiKey: string) {
    this.name = name.toLowerCase();
    this.apiKey = apiKey;
  }

  public async handleProducts(): Promise<void> {
    try {
      console.log(
        `Getting the products from ${this.name} external connector...`
      );

      const response = await axios.get(
        `http://localhost:3002/connectors/${this.name}`,
        {
          headers: {
            [`${this.name}-api-key`]: this.apiKey,
          },
        }
      );

      const products = response.data.products;

      console.log("Parsing data...");
      const response2 = await axios.post(
        "http://localhost:3001/products",
        products
      );

      console.log(
        "Products handler response: " + JSON.stringify(response2.data.products)
      );
    } catch (error: any) {
      console.log(`Error ${error.response?.data?.message || error.message}`);
    }
  }
}

export default ConnectorHandler;
