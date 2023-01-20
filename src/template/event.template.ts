import { Awaitable, ClientEvents, Events } from "discord.js";

export default class Event<K extends keyof ClientEvents> {
  name: K;
  once?: boolean;
  execute: (...args: ClientEvents[K]) => Awaitable<void>;

  constructor(obj: {
    name: K;
    once?: boolean;
    execute: (...args: ClientEvents[K]) => Awaitable<void>;
  }) {
    this.name = obj.name;
    this.once = obj.once;
    this.execute = obj.execute;
  }
}
