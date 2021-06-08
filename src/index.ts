require('dotenv').config();

import { 
  Client, 
  Message, 
  MessageReaction, 
  TextChannel,
} from 'discord.js';

const client = new Client();
const relayChannelId = process.env.RELAY_CHANNEL_ID || '';
const confessionChannelId = process.env.CONFESSION_CHANNEL_ID || '';
const nsfwChannelId = process.env.NSFW_CHANNEL_ID || '';

const reactionMap: { [key: string]: string } = {
  '✅': confessionChannelId,
  '🍆': nsfwChannelId,
};

client.on('ready', () => {
  console.log('App is ready');
});

client.on('message', async (message: Message) => {
  if (message.author.bot) {
    return;
  }

  if (message.channel.type === 'dm') {
    const channel = await client.channels.fetch(relayChannelId);

    if (!channel || !(channel instanceof TextChannel)) {
      console.error('Relay channel is invalid');
      return;
    }

    channel.send(message.content);
    message.reply('Your message has been sent!');
  }
});

client.on('messageReactionAdd', async (reaction: MessageReaction) => {
  if (reaction.message.channel.id !== relayChannelId) {
    return;
  }

  if (!Object.keys(reactionMap).includes(reaction.emoji.name)) {
    return;
  }

  const channel = await client.channels.fetch(reactionMap[reaction.emoji.name]);

  if (!(channel instanceof TextChannel)) {
    console.error('Confession channel is invalid');
    return;
  }

  channel.send({
    embed: {
      color: 0x3498db,
      title: "New cheesemiss",
      description: reaction.message.content
    }
  });
});

client.login(process.env.DISCORD_BOT_TOKEN);
