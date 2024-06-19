const {
  _getExternalApiByName,
} = require("../controllers/_getExternalApiByName");
const axios = require("axios");

const fetchDataFromExternalApi = async (req, res) => {
  const requestData = Array.isArray(req.body) ? req.body[0] : req.body;
  const { serviceName, apiKey } = requestData;

  try {
    // Retrieve the external API details from the database
    const externalApi = await _getExternalApiByName(serviceName);
    if (!externalApi) {
      return res.status(404).json({ message: "API not found" });
    }

    // Append the API key to the URL if provided
    let apiUrl = externalApi.apiUrl;
    if (apiKey) {
      apiUrl += (apiUrl.includes("?") ? "&" : "?") + `api_key=${apiKey}`;
    }

    // Make the HTTP request to the external API
    const apiResponse = await axios.get(apiUrl);
    res.status(200).json(apiResponse.data);
  } catch (error) {
    let errorMessage = "Error fetching data";
    if (
      axios.isAxiosError(error) &&
      error.response &&
      error.response.status === 403
    ) {
      errorMessage = "API key missing or incorrect";
    }
    res.status(500).json({ message: errorMessage, error: error.message });
  }
};

module.exports = { fetchDataFromExternalApi };
