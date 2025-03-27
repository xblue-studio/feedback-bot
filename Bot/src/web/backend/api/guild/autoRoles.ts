import { Router, Request, Response } from "express";
import { CustomClient } from "../../../../types";
import guildMiddleware from "../../../../methods/middleware/guildMiddleware";

const createRouter = (client: CustomClient) => {
  const router = Router();

  router.get("/", async (req: Request, res: Response) => {
    try {
      const guild = guildMiddleware(req.query.guildId?.toString(), client, res);
      if (!guild) return;
      res.json({
        roles: guild.roles.cache.toJSON().map(({ id, name, color }) => ({
          id,
          name,
          color,
        })),
        bot: (await client.db.get(`${guild.id}.autoRoles.bot`)) || [],
        human: (await client.db.get(`${guild.id}.autoRoles.human`)) || [],
      });
    } catch (error) {
      console.error("api error:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  });

  router.post("/", async (req: Request, res: Response) => {
    try {
      const guild = guildMiddleware(req.query.guildId?.toString(), client, res);
      if (!guild) return;
      await client.db.set(`${guild.id}.autoRoles.bot`, req.body.bot);
      await client.db.set(`${guild.id}.autoRoles.human`, req.body.human);
      res.status(200).json({ message: "Auto roles updated successfully." });
    } catch (error) {
      console.error("api error:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  });

  return router;
};

export default createRouter;
