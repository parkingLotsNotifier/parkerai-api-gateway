// workflowExecutor.js
const axios = require("axios");
const { documentArrangeUtil } = require("./documentArrangeUtil");
const {
  IMAGE_PROCESSING_SERVICE_BASE_ADDRS,
  IMAGE_PROCESSING_SERVICE_SERVICE_PORT,
  PREDICTION_SERVICE_BASE_ADDRS,
  PREDICT_SERVICE_SERVICE_PORT_INFERENCE,
  DATA_MANAGEMENT_SERVICE_BASE_ADDRS,
  DATA_MANAGEMENT_SERVICE_PORT,
} = require("../../config/env");

const executeWorkflow = async (requestBody, includeRois, shouldStore) => {
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
    const combinedResponse = documentArrangeUtil(
      requestBody,
      preprocessingData,
      predictionData,
      includeRois
    );

    // Optional Step 4: Store the combined response if needed
    if (shouldStore) {
      const storeDocumentResponse = await axios.post(
        `${DATA_MANAGEMENT_SERVICE_BASE_ADDRS}:${DATA_MANAGEMENT_SERVICE_PORT}/data-management/document/store`,
        combinedResponse
      );
      return storeDocumentResponse.data;
    }

    return combinedResponse;
  } catch (error) {
    console.error("Error in workflow execution:", error.message);
    throw error;
  }
};

module.exports = { executeWorkflow };
