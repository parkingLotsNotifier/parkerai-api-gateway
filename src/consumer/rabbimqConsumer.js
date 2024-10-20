const amqp = require("amqplib");
const { RABBITMQ_SERVER_URL, QUEUE_NAME } = require("../../config/env");
const { executeWorkflow } = require("../utils/workflowExecutor");

async function startConsumer() {
    try {
        const connection = await amqp.connect(RABBITMQ_SERVER_URL);
        const channel = await connection.createChannel();
        await channel.assertQueue(QUEUE_NAME);

        console.log("Consumer is running. Waiting for messages...");

        channel.consume(QUEUE_NAME, async message => {
            const { parkingLotId, cameras } = JSON.parse(message.content.toString());
            
            console.log(`Received message for parking lot ${parkingLotId}`);

            if (!Array.isArray(cameras)) {
                console.error("Expected 'cameras' to be an array but got:", typeof cameras);
                return; // Optionally return or handle the error appropriately
            }
            
            // Assuming cameraUrls is an array and handling each camera URL independently
            const results = await Promise.all(cameras.map(async (camera) => {
                // Note: Include any additional necessary parameters as per executeWorkflow signature
                return executeWorkflow( true, true, camera.cameraUrl, camera.cameraId);
            }));

            console.log(`Workflow executed for each camera with results: ${JSON.stringify(results)}`);
            
            // Acknowledge the message as processed
            channel.ack(message);
        });
    } catch (error) {
        console.error("Failed to start consumer:", error);
    }
}

module.exports = { startConsumer };
