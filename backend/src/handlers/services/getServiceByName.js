const { _getServiceByName } = require("../../controllers");

const getServiceByName = async (req, res) => {
  const { name } = req.params;
  
  try {
    const service = await _getServiceByName(name);
    if (!service) {
      return res.status(404).json({ message: "service not found" });
    }
    res.status(200).json(service);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching service", error: error.message });
  }
};

module.exports = { getServiceByName };
