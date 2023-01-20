import {
  SlashCommandBuilder,
  ChatInputCommandInteraction,
  CacheType,
} from "discord.js";

export default class Command {
  data: SlashCommandBuilder;
  execute: (
    interaction: ChatInputCommandInteraction<CacheType>
  ) => Awaited<void>;

  constructor(obj: {
    data: SlashCommandBuilder;
    execute(interaction: ChatInputCommandInteraction<CacheType>): Awaited<void>;
  }) {
    this.data = obj.data;
    this.execute = obj.execute;
  }
}
