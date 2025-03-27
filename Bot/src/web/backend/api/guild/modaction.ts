import { Router, Request, Response } from "express";
import { CustomClient } from "../../../../types";
import guildMiddleware from "../../../../methods/middleware/guildMiddleware";
import { AuditLogEvent } from "discord.js";

const moduleRouter = (client: CustomClient) => {
  const router = Router();

  router.get("/", async (req: Request, res: Response) => {
    try {
      const guildId = req.query.guildId?.toString();

      const guild = guildMiddleware(guildId, client, res);
      if (!guild) return;

      res.json(
        (
          await guild.fetchAuditLogs({ type: AuditLogEvent.MemberBanAdd })
        ).entries.map((log) => log.toJSON())
      );
    } catch (error) {
      console.error("Error fetching guild:", error);
      res.status(500).json({ error: "Failed to fetch guild." });
    }
  });

  return router;
};

export default moduleRouter;
