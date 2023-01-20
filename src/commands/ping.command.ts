import { SlashCommandBuilder } from "discord.js";
import Command from "../template/command.template";

export default new Command({
  data: new SlashCommandBuilder()
    .setName("ping")
    .setDescription("Responde com 'Pong!'"),
  async execute(interaction) {
    await interaction.reply("Pong!");
  },
});
