import { ConnectorsController } from "./ConnectorsController";

const connectorController = new ConnectorsController();

export const _postConnector = async (
  name: string,
  apiUrl: string,
  apiKey: string
) => {
  try {
    const newConnector = await connectorController.create({
      name,
      apiUrl,
      apiKey,
    });
    return newConnector;
  } catch (error: any) {
    throw new Error(error.message);
  }
};
