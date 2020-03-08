import { injectable } from "inversify";
import { Client, Message, TextChannel, MessageReaction, User } from "discord.js";

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

    this.client.on('messageReactionAdd', (reaction: MessageReaction, user: User) => {
      if (reaction.message.channel.id != relay_ch_id) {
        return;
      }

      if (reaction.emoji.name != '✅') {
        return;
      }

      let confessionChannel = this.client.channels.get(confession_ch_id) as TextChannel;
      confessionChannel.send({
        embed: {
          color: 0x3498db,
          title: "New cheesemiss",
          description: reaction.message.content
        }
      });
    });

    return this.client.login(token);
  }
}