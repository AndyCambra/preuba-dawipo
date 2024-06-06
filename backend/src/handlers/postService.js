const postData = [];

const postService = async (req, res) => {
  try {
    postData.push(req.body);
    res.status(201).json({
      message: "The data was received successfully",
      data: req.body,
    });
  } catch (error) {
    res.status(400).json({
      error: true,      
      message: error.message || "Unknown error",
    });
  }
};

module.exports = {
  postService,
  postData,
};
