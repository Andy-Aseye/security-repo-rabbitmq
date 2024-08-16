import { fetchAndSaveCves } from "./fetchCVE.js";
import Cve from "../models/cve.models.js";

export function handleDatabaseOperations(channel) {
  channel.consume("db_queue", async (msg) => {
    const content = JSON.parse(msg.content.toString());

    switch (content.action) {
      case "fetchAndSave":
        await fetchAndSaveCves(content.cpeName);
        break;
      case "getCves":
        const { page, limit } = content;
        const cves = await Cve.find({})
          .skip((page - 1) * limit)
          .limit(limit);

        const response = { cves, total: await Cve.countDocuments() };

        channel.sendToQueue(
          msg.properties.replyTo,
          Buffer.from(JSON.stringify(response)),
          { correlationId: msg.properties.correlationId }
        );
        break;
      // Additional cases can be added as needed
      default:
        console.log("Unknown action:", content.action);
    }

    channel.ack(msg);
  });
}
