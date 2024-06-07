const {
  _getExternalApiByName,
} = require("../controllers/_getExternalApiByName");

const getExternalApiByName = async (req, res) => {
  const { name } = req.params;

  try {
    const externalApi = await _getExternalApiByName(name);
    if (!externalApi) {
      return res.status(404).json({ message: "API not found" });
    }
    res.status(200).json(externalApi);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching API", error: error.message });
  }
};

module.exports = { getExternalApiByName };
