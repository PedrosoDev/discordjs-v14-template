import { Events } from "discord.js";
import Event from "../template/event.template";

export default new Event({
  name: Events.ClientReady,
  once: true,
  execute(client) {
    console.log(`⚡ Bot is running: ${client.user.tag}`);
  },
});
