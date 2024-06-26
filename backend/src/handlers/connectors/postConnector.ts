import { Request, Response } from "express"; // Cambio: Importa tipos de TypeScript
import { connectorController } from "../../controllers"; // Cambio: Importa usando `import`

export const postConnector = async (
  req: Request,
  res: Response
): Promise<void> => {
  // Cambio: Tipado de parámetros y retorno
  const connectors = Array.isArray(req.body) ? req.body : [req.body];

  try {
    const newConnectors = [];

    for (const connector of connectors) {
      const { name, apiUrl, apiKey } = connector;
      const newConnector = await connectorController.create({
        name,
        apiUrl,
        apiKey,
      });
      newConnectors.push(newConnector);
    }

    res.status(201).json({
      message: "The connector instances were created successfully",
      connectors: newConnectors,
    });
  } catch (error: any) {
    // Cambio: Tipado del error
    res.status(400).json({
      error: true,
      message: error.message || "Unknown error",
    });
  }
};
