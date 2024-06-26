import { ConnectorsController } from "./ConnectorsController";

const connectorController = new ConnectorsController();

export const _putConnector = async (
  name: string,
  apiUrl: string,
  apiKey: string
) => {
  const [updatedCount, updatedConnectors] =
    await connectorController.updateByName(name, { apiUrl, apiKey });

  if (updatedCount === 0) {
    return null;
  } else {
    return updatedConnectors[0];
  }
};
