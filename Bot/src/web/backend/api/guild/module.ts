import { Router, Request, Response } from "express";
import { CustomClient } from "../../../../types";
import guildMiddleware from "../../../../methods/middleware/guildMiddleware";

const moduleRouter = (client: CustomClient) => {
  const router = Router();

  router.get("/", async (req: Request, res: Response) => {
    try {
      const guildId = req.query.guildId?.toString();
      const module = req.query.module?.toString();

      const guild = guildMiddleware(guildId, client, res);
      if (!guild) return;

      res.json((await client.db.get(`${guild.id}.modules.${module}`)) || {});
    } catch (error) {
      console.error("Error fetching guild:", error);
      res.status(500).json({ error: "Failed to fetch guild." });
    }
  });

  router.post("/", async (req: Request, res: Response) => {
    try {
      const guildId = req.query.guildId?.toString();
      const module = req.query.module?.toString();

      const guild = guildMiddleware(guildId, client, res);
      if (!guild) return;

      await client.db.set(
        `${guild.id}.modules.${module}`,
        (req.body.bool = "on")
      );

      res.sendStatus(200);
    } catch (error) {
      console.error("Error fetching guild:", error);
      res.status(500).json({ error: "Failed to fetch guild." });
    }
  });

  return router;
};

export default moduleRouter;
