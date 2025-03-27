// web/api/status.ts
import { Router, Request, Response } from "express";
import { CustomClient } from "../../../../types";
import { PermissionFlagsBits } from "discord.js";
import guildMiddleware from "../../../../methods/middleware/guildMiddleware";

const createRouter = (client: CustomClient) => {
  const router = Router();

  router.get("/", async (req: Request, res: Response) => {
    try {
      const guild = guildMiddleware(req.query.guildId?.toString(), client, res);
      if (!guild) return;
      res.json({
        guild: {
          name: guild.name,
        },
      });
    } catch (error) {
      console.error("Error processing request:", error);
      res.status(500).json({ error: "Failed to process request" });
    }
  });

  return router;
};

export default createRouter;
