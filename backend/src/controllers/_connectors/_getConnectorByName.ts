import { ConnectorsController } from "./ConnectorsController";

const connectorController = new ConnectorsController();

export const _getConnectorByName = async (name: string) => {
  try {
    const connector = await connectorController.getByName(name);

    if (!connector) {
      throw new Error("Connector not found");
    }

    return connector;
  } catch (error: any) {
    throw new Error(`Failed to get connector: ${error.message}`);
  }
};
