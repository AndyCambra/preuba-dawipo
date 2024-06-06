const { _getExternalApis } = require("../controllers/_getExternalApis");

const getExternalApis = async (req, res) => {
  try {
    const allExternalApis = await _getExternalApis();

    res.status(200).json({
      message: "The External APIs were obtained successfully",
      externalApis: allExternalApis,
    });
  } catch (error) {
    res.status(400).json({
      error: true,
      message: error.message || "Unknown error",
    });
  }
};

module.exports = {
  getExternalApis,
};
