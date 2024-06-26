import { ConnectorsController } from "./ConnectorsController";

const connectorController = new ConnectorsController();

export const _deleteConnector = async (name: string): Promise<boolean> => {
  const deletedCount = await connectorController.deleteByName(name);
  return deletedCount > 0;
};
