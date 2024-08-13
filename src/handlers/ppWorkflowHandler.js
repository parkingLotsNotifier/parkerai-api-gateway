// src/handlers/ppWorkflowHandler.js
const axios = require("axios");
const { IMAGE_PROCESSING_SERVICE_BASE_ADDRS: IMAGE_SERVICE_BASE_ADDRS
        IMAGE_SERVICE_PORT,
        PREDICTION_SERVICE_BASE_ADDRS,
        PREDICTION_SERVICE_PORT } = require('../../config/env');

const ppWorkflowHandler = async (req, res) => {
  try {
    const requestBody = req.body;

    const preprocessingResponse = await axios.post(
      "http://localhost:3002/image-processing/process",
      requestBody
    );

    const preprocessingData = preprocessingResponse.data;

    const predictionResponse = await axios.post(
      "http://localhost:8080/predictions/mobilenet_v3",
      preprocessingData
    );

    const predictionData = predictionResponse.data;

    const combinedResponse = {
      file_name: preprocessingData.file_name,
      slots: preprocessingData.slots.map((slot, index) => {
        const correspondingPrediction = predictionData.find(
          (pred) => pred.index === index
        );
        return {
          coordinate: slot.coordinate,
          prediction: correspondingPrediction
            ? correspondingPrediction.prediction
            : null,
          file_name: slot.file_name,
          lot_name: slot.lot_name,
        };
      }),
    };

    return res.status(200).json(combinedResponse);
  } catch (error) {
    console.error("Error in pp-workflow:", error.message);

    return res
      .status(500)
      .json({ message: "Workflow execution failed", error: error.message });
  }
};

module.exports = ppWorkflowHandler;
