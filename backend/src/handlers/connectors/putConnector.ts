import { Request, Response } from "express"; // Cambio: Importa tipos de TypeScript
import { connectorController } from "../../controllers"; // Cambio: Importa usando `import`

export const putConnector = async (
  req: Request,
  res: Response
): Promise<void> => {
  // Cambio: Tipado de parámetros y retorno
  try {
    const { name } = req.params;
    const { apiUrl, apiKey } = req.body;
    const updatedConnector = await connectorController.updateByName(name, {
      apiUrl,
      apiKey,
    });

    if (!updatedConnector) {
      res.status(404).json({
        error: true,
        message: "Connector not found",
      });
      return;
    }

    res.status(200).json({
      message: "The connector was updated successfully",
      connector: updatedConnector,
    });
    return;
  } catch (error: any) {
    // Cambio: Tipado del error
    res.status(400).json({
      error: true,
      message: error.message || "Unknown error",
    });
  }
};
