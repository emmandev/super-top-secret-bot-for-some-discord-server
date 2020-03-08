import { injectable } from "inversify";
import { Client } from "discord.js";

@injectable()
export class Bot
{
  private client: Client;

  constructor(client: Client)
  {
    this.client = client;
  }

  public listen(token: any) : Promise<string>
  {
    return this.client.login(token);
  }
}