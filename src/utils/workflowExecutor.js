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

const executeWorkflow = async (
  includeRois,
  shouldStore,
  cameraUrl,
  cameraId
) => {
  try {
    // Step 1: Capture Image
    let imageResponse;
    try {
      imageResponse = await axios.get(`http://${cameraUrl}/photo.jpg`, {
        responseType: "arraybuffer",
        timeout: 5000, // Set a timeout to prevent hanging
      });
    } catch (error) {
      console.error("Error fetching image from camera:", cameraUrl);
      // Return or handle the error appropriately
      return { error: "Failed to retrieve image from camera" };
    }

    // Check if image data is valid
    if (!imageResponse.data || imageResponse.data.length === 0) {
      console.warn("No image data received from camera id ", cameraId);
      // Return or handle the case where there's no image data
      return { error: "No image data received from camera" };
    }

    const imageBase64 = Buffer.from(imageResponse.data, "binary").toString(
      "base64"
    );
    // Modify requestBody
    const requestBody = {
      image: imageBase64,
      image_name: "captured_image_" + Date.now() + ".jpg",
      camera_id: cameraId,
    };

    // Step 2: Perform the preprocessing
    const preprocessingResponse = await axios.post(
      `${IMAGE_PROCESSING_SERVICE_BASE_ADDRS}:${IMAGE_PROCESSING_SERVICE_SERVICE_PORT}/image-processing/process`,
      requestBody
    );

    const preprocessingData = preprocessingResponse.data;
    let predictionResponse;
    // Step 3: Perform the prediction
    try {
      predictionResponse = await axios.post(
        `${PREDICTION_SERVICE_BASE_ADDRS}:${PREDICT_SERVICE_SERVICE_PORT_INFERENCE}/predictions/mobilenet_v3`,
        preprocessingData
      );
    } catch (error) {
      console.error("Error predict image from camera:", cameraId);
      // Return or handle the error appropriately
      return { error: "Failed to call prediction service" };
    }

    const predictionData = predictionResponse.data;

    // Combine the responses
    const combinedResponse = documentArrangeUtil(
      requestBody,
      preprocessingData,
      predictionData,
      includeRois
    );
    
    let storeDocumentResponse;
    // Optional Step 4: Store the combined response if needed
    if (shouldStore) {
       storeDocumentResponse = await axios.post(
        `${DATA_MANAGEMENT_SERVICE_BASE_ADDRS}:${DATA_MANAGEMENT_SERVICE_PORT}/data-management/document/store`,
        combinedResponse
      );
      // store the documentid in the camera
      await axios.put(
        `${DATA_MANAGEMENT_SERVICE_BASE_ADDRS}:${DATA_MANAGEMENT_SERVICE_PORT}/data-management/camera/updateCamera/${cameraId}`,
        {cameraDocId:storeDocumentResponse.data.documentId}
      );
    }


    return ;
  } catch (error) {
    console.error("Error in workflow execution:", error.message);
    throw error;
  }
};

module.exports = { executeWorkflow };
