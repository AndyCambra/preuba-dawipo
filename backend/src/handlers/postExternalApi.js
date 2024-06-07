const { _postExternalApi } = require("../controllers/_postExternalApi");

const postExternalApi = async (req, res) => {
  console.log("Received body:", req.body); // Added this line to log the request body
  const { name, apiUrl } = req.body;
  console.log("Received name:", name); // Debugging line
  console.log("Received apiUrl:", apiUrl); // Debugging line

  try {
    const newExternalApi = await _postExternalApi(name, apiUrl);

    res.status(201).json({
      message: "The External API instance was created successfully",
      externalApi: newExternalApi,
    });
  } catch (error) {
    res.status(400).json({
      error: true,
      message: error.message || "Unknown error",
    });
  }
};

module.exports = {
  postExternalApi,
};
