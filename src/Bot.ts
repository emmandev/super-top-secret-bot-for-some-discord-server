import { injectable } from "inversify";
import { Client, Message, TextChannel } from "discord.js";

@injectable()
export class Bot
{
  private client: Client;

  constructor(client: Client)
  {
    this.client = client;
  }

  public listen(token: any, relay_ch_id: any, confession_ch_id: any) : Promise<string>
  {
    this.client.on('message', (message: Message) => {
      if (message.author.bot) {
        return;
      }

      if (message.channel.type == "dm") {
        let channel = this.client.channels.get(relay_ch_id) as TextChannel;
        channel.send(message.content);
      }
    });

    return this.client.login(token);
  }
}