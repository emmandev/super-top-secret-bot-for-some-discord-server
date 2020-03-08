import { Container } from "../../node_modules/inversify";
import { Client } from "discord.js";

let AppContainer = new Container();

AppContainer.bind<Client>(Client).toConstantValue(new Client());

export default AppContainer;