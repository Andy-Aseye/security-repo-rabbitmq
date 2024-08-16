import express from "express";
import { channel } from "../index.js";

const router = express.Router();

router.post("/", async (req, res, next) => {
  const { cpeName } = req.body;

  if (!cpeName) {
    return res.status(400).json({ message: "cpeName is required" });
  }

  try {
    await channel.sendToQueue(
      "db_queue",
      Buffer.from(JSON.stringify({ action: "fetchAndSave", cpeName }))
    );
    res
      .status(202)
      .json({ message: "Request to fetch and save CVEs has been queued" });
  } catch (error) {
    next(error);
  }
});

router.get("/", async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = 10;

    // Set up a response queue
    const q = await channel.assertQueue("", { exclusive: true });
    channel.consume(q.queue, (msg) => {
      if (msg.properties.correlationId === "getCves") {
        const response = JSON.parse(msg.content.toString());
        res.status(200).json(response);
        channel.ack(msg);
      }
    });

    // Send the request with a correlation ID
    channel.sendToQueue(
      "db_queue",
      Buffer.from(JSON.stringify({ action: "getCves", page, limit })),
      {
        correlationId: "getCves",
        replyTo: q.queue,
      }
    );
  } catch (error) {
    console.error("Error fetching CVEs:", error);
    res.status(500).send("An error occurred while fetching CVEs.");
  }
});

export default router;
