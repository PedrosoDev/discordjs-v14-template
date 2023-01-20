import { Client, Events, GatewayIntentBits } from "discord.js";
import { commands, registerCommands } from "./managers/command.manager";

import dotenv from "dotenv";
import { registerEvents } from "./managers/event.manager";
dotenv.config();

const { DISCORD_TOKEN } = process.env;

export const client = new Client({
  intents: [GatewayIntentBits.Guilds],
});

(async () => {
  await Promise.all([registerCommands(), registerEvents()]);
})();

client.login(DISCORD_TOKEN);
