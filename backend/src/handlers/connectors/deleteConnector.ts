import { Request, Response } from "express"; // Cambio: Importa tipos de TypeScript
import { connectorController } from "../../controllers"; // Cambio: Importa usando `import`

export const deleteConnector = async (
  req: Request,
  res: Response
): Promise<void> => {
  // Cambio: Tipado de parámetros y retorno
  try {
    const { id } = req.params;
    const deleted = await connectorController.delete(id);

    if (!deleted) {
      res.status(404).json({
        error: true,
        message: "Connector not found",
      });
      return;
    }

    res.status(200).json({
      message: "The connector was deleted successfully",
    });
  } catch (error: any) {
    // Cambio: Tipado del error
    res.status(400).json({
      error: true,
      message: error.message || "Unknown error",
    });
  }
};
