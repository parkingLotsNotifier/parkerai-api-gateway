const { executeWorkflow } = require("../utils/workflowExecutor");

const pPSWorkflowHandler = async (req, res) => {
  try {
    const combinedResponse = await executeWorkflow(req.body, false, true);
    return res.status(200).json(combinedResponse);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Workflow execution failed", error: error.message });
  }
};

module.exports = pPSWorkflowHandler;
