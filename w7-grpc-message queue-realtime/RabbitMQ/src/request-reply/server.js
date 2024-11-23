const amqp = require('amqplib');

async function startServer() {
    const connection = await amqp.connect('amqp://localhost');
    const channel = await connection.createChannel();

    const requestQueue = 'request_queue';
    await channel.assertQueue(requestQueue);

    console.log('Server is waiting for requests...');

    channel.consume(requestQueue, (msg) => {
        const content = msg.content.toString();
        console.log(`Received request: ${content}`);

        const response = `Processed: ${content}`;

        channel.sendToQueue(msg.properties.replyTo, Buffer.from(response), {
            correlationId: msg.properties.correlationId,
        });

        channel.ack(msg);
    });
}

startServer();
