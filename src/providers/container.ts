import { Container } from "../../node_modules/inversify";
import { Client } from "discord.js";
import { Bot } from "../Bot";

let AppContainer = new Container();

AppContainer.bind<Bot>(Bot).toSelf();
AppContainer.bind<Client>(Client).toConstantValue(new Client());

export default AppContainer;