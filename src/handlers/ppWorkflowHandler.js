const axios = require("axios");
const { 
  IMAGE_PROCESSING_SERVICE_BASE_ADDRS,
  IMAGE_PROCESSING_SERVICE_SERVICE_PORT,
  PREDICTION_SERVICE_BASE_ADDRS,
  PREDICT_SERVICE_SERVICE_PORT_INFERENCE
} = require('../../config/env');

// Core function to handle the ppWorkflow
const executePpWorkflow = async (requestBody) => {
  try {
    // Step 1: Perform the preprocessing
    const preprocessingResponse = await axios.post(
      `${IMAGE_PROCESSING_SERVICE_BASE_ADDRS}:${IMAGE_PROCESSING_SERVICE_SERVICE_PORT}/image-processing/process`,
      requestBody
    );

    const preprocessingData = preprocessingResponse.data;

    // Step 2: Perform the prediction
    const predictionResponse = await axios.post(
      `${PREDICTION_SERVICE_BASE_ADDRS}:${PREDICT_SERVICE_SERVICE_PORT_INFERENCE}/predictions/mobilenet_v3`,
      preprocessingData
    );

    const predictionData = predictionResponse.data;

    // Step 3: Combine the responses
    const combinedResponse = {
      camera_id: requestBody.camera_id,
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

    return combinedResponse;
  } catch (error) {
    console.error("Error in pp-workflow execution:", error.message);
    throw error;
  }
};

// Original ppWorkflowHandler function
const ppWorkflowHandler = async (req, res) => {
  try {
    const combinedResponse = await executePpWorkflow(req.body);
    return res.status(200).json(combinedResponse);
  } catch (error) {
  
    return res.status(500).json({ message: "Workflow execution failed", error: error.message });
  }
};

module.exports = { ppWorkflowHandler, executePpWorkflow };
