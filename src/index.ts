require('dotenv').config();
import "reflect-metadata";
import AppContainer from "./providers/container";
import { Bot } from "./Bot";

const bot: Bot = AppContainer.resolve<Bot>(Bot);

bot.listen(process.env.DISCORD_BOT_TOKEN)
.then(data => {
  console.log('something happened zomg');
})
.catch(err => {
  console.log(err);
});