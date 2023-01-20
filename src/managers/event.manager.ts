import path from "path";
import fs from "fs";
import { client } from "../index";
import Event from "../template/event.template";

export type TImportEvent = {
  default: Event<any>;
};

const eventsPath = path.join("src/events");

const eventFiles = fs
  .readdirSync(eventsPath)
  .filter((file) => file.endsWith(".event.ts"));

export async function registerEvents() {
  for (const file of eventFiles) {
    const { default: event }: TImportEvent = await import(`../events/${file}`);

    if (event.once) {
      client.once(event.name, (...args) => event.execute(...args));
    } else {
      client.on(event.name, (...args) => event.execute(...args));
    }
  }
}
