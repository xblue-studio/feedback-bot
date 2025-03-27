import { Response } from "express";
import { CustomClient } from "../../types";
import { PermissionFlagsBits } from "discord.js";

export default function guildMiddleware(
  guildId: string | undefined,
  client: CustomClient,
  res: Response
) {
  if (!guildId || !client.apiUser) {
    res.status(401).json({ error: "Unauthorized" });
    return false;
  }
  const guild = client.guilds.cache.get(guildId);
  if (!guild) {
    res.status(404).json({ error: "Guild not found" });
    return false;
  }
  const botmember = guild?.members.cache.get(client.user?.id ?? "");
  if (!guildId || !guild || !botmember) {
    res.status(400).json({ error: "Missing guildId parameter" });
    return false;
  }
  if (!botmember.permissions.has(PermissionFlagsBits.Administrator)) {
    res.status(403).json({
      error: "You do not have the required permissions for this guild",
    });
    return false;
  }
  const member = guild.members.cache.get(client.apiUser.id);
  if (!member) {
    res.status(404).json({ error: "Member not found in the guild" });
    return false;
  }
  if (!member.permissions.has("Administrator")) {
    res.status(403).json({
      error: "You do not have the required permissions for this guild",
    });
    return false;
  }
  return guild;
}
