import { ConnectorsController } from "./ConnectorsController";

const connectorController = new ConnectorsController();

export const _getConnectors = async () => {
  const allConnectors = await connectorController.getAll();

  if (allConnectors.length === 0) {
    throw new Error("There are no registered connectors yet");
  } else {
    return allConnectors;
  }
};
