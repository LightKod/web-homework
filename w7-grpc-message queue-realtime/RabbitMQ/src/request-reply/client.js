const amqp = require('amqplib');

async function sendRequest(request) {
    const connection = await amqp.connect('amqp://localhost');
    const channel = await connection.createChannel();

    const requestQueue = 'request_queue';
    const replyQueue = await channel.assertQueue('', { exclusive: true });

    const correlationId = Math.random().toString();
    console.log(`Sending request: ${request}`);

    channel.sendToQueue(requestQueue, Buffer.from(request), {
        correlationId: correlationId,
        replyTo: replyQueue.queue,
    });

    channel.consume(replyQueue.queue, (msg) => {
        if (msg.properties.correlationId === correlationId) {
            console.log(`Received reply: ${msg.content.toString()}`);
            channel.close();
            connection.close();
        }
    }, { noAck: true });
}

sendRequest('Hello Server!');
