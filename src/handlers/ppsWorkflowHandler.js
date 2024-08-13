const axios = require("axios");
const { 
  DATA_MANAGEMENT_SERVICE_BASE_ADDRS,
  DATA_MANAGEMENT_SERVICE_PORT
} = require('../../config/env');
const { executePpWorkflow } = require('./ppWorkflowHandler');

const ppsWorkflowHandler = async (req, res) => {
  try {
    // Reuse the ppWorkflow logic
    const combinedResponse = await executePpWorkflow(req.body);

    console.log(combinedResponse)
    // Step 4: Store the combined response in the database
    const storeDocumentResponse = await axios.post(
      `${DATA_MANAGEMENT_SERVICE_BASE_ADDRS}:${DATA_MANAGEMENT_SERVICE_PORT}/data-management/document/store`,
      combinedResponse
    );
    // Return the response to the client
    return res.status(200).json(storeDocumentResponse.data);
  } catch (error) {
    console.error("Error in pps-workflow:", error.message);
    return res.status(500).json({ message: "Workflow execution failed", error: error.message });
  }
};

module.exports = ppsWorkflowHandler;
