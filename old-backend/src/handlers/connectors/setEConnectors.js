const handleECProducts = require("../../helpers/EConnectors/handleECProducts");
const knownConnectors = require("../../helpers/EConnectors/knownConnectors");

const setEConnectors = async (req, res) => {
  const connectors = Array.isArray(req.body) ? req.body : [req.body];

  try {
    for (const connector of connectors) {
      const { name, apiKey } = connector;

      if (knownConnectors.includes(name.toUpperCase())) {
        await handleECProducts(name, apiKey);
      } else {
        throw new Error("Just for now we only have support for DHL and MSC");
      }
    }

    res.status(200).json({
      message: "The connector instances were set successfully",
    });
  } catch (error) {
    res.status(400).json({
      error: true,
      message: error.message || "Unknown error",
    });
  }
};

module.exports = {
  setEConnectors,
};
