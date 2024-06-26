import { Request, Response } from "express";
import { connectorController } from "../../controllers";
import ConnectorHandler from "../../helpers/ConnectorHandler";
import KnownConnectors from "../../helpers/KnownConnectors";

export const setConnectors = async (
  req: Request,
  res: Response
): Promise<void> => {
  const connectors = Array.isArray(req.body) ? req.body : [req.body];

  try {
    const updatedConnectors = [];

    for (const connector of connectors) {
      const { name, apiUrl, apiKey } = connector;
      const updatedConnector = await connectorController.updateByName(name, {
        apiUrl,
        apiKey,
      });
      if (KnownConnectors.getConnectors().includes(name.toUpperCase())) {
        const handler = new ConnectorHandler(name, apiKey);
        await handler.handleProducts();
      }
      updatedConnectors.push(updatedConnector);
    }

    res.status(200).json({
      message: "The connector instances were set successfully",
      connectors: updatedConnectors,
    });
  } catch (error: any) {
    res.status(400).json({
      error: true,
      message: error.message || "Unknown error",
    });
  }
};
