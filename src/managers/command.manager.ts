import {
  CacheType,
  ChatInputCommandInteraction,
  Collection,
  REST,
  Routes,
  SlashCommandBuilder,
} from "discord.js";
import fs from "fs";
import path from "path";

import dotenv from "dotenv";
import Command from "../template/command.template";
dotenv.config();

const { DISCORD_TOKEN, APPLICATION_ID, GUILD_ID, CHANNEL_ID } = process.env;

export type TImportCommand = {
  default: Command;
};

export const commands = new Collection<string, Command>();

const commandsPath = path.join("src/commands");

const commandFiles = fs
  .readdirSync(commandsPath)
  .filter((file) => file.endsWith(".command.ts"));

export async function registerCommands() {
  for (const file of commandFiles) {
    const { default: command }: TImportCommand = await import(
      `../commands/${file}`
    );

    commands.set(command.data.name, command);
  }

  try {
    console.log(
      `Started refreshing ${commands.size} application (/) commands.`
    );

    const rest = new REST({ version: "10" }).setToken(DISCORD_TOKEN!);

    const data = await rest.put(Routes.applicationCommands(APPLICATION_ID!), {
      body: Array.from(commands.values()).map((command) =>
        command.data.toJSON()
      ),
    });

    console.log(
      //@ts-ignore
      `Successfully reloaded ${data.length} application (/) commands.`
    );
  } catch (error) {
    console.error(error);
  }
}
