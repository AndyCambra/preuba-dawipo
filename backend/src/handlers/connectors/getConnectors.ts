import { Request, Response } from "express"; // Cambio: Importa tipos de TypeScript
import { connectorController } from "../../controllers"; // Cambio: Importa usando `import`

export const getConnectors = async (
  req: Request,
  res: Response
): Promise<void> => {
  // Cambio: Tipado de parámetros y retorno
  try {
    const allConnectors = await connectorController.getAll();

    res.status(201).json({
      message: "The connectors were obtained successfully",
      connectors: allConnectors,
    });
  } catch (error: any) {
    // Cambio: Tipado del error
    res.status(400).json({
      error: true,
      message: error.message || "Unknown error",
    });
  }
};
