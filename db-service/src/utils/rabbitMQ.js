import amqp from "amqplib";

export async function connectToRabbitMQ(retries = 5, interval = 5000) {
  for (let i = 0; i < retries; i++) {
    try {
      const connection = await amqp.connect("amqp://rabbitmq");
      const channel = await connection.createChannel();
      console.log("Connected to RabbitMQ");
      return { connection, channel };
    } catch (error) {
      console.log(
        `Failed to connect to RabbitMQ. Retrying in ${
          interval / 1000
        } seconds...`
      );
      await new Promise((resolve) => setTimeout(resolve, interval));
    }
  }
  throw new Error("Failed to connect to RabbitMQ after multiple retries");
}
