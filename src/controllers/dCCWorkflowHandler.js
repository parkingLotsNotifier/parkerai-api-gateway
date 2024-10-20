const { executeWorkflow } = require("../utils/workflowExecutor");

const dCCWorkflowHandler = async (req, res) => {
  try {
    const combinedResponse = await executeWorkflow(req.body, true, true);
    return res.status(200).json(combinedResponse);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Workflow execution failed", error: error.message });
  }
};

module.exports = dCCWorkflowHandler;
