const fs = require('node:fs');
const path = require('node:path');
const { Client, Collection, GatewayIntentBits } = require('discord.js');
const { token, MongoPass } = require('./config.json');
const mongoose = require(`mongoose`);

// Create a new client instance
const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.commands = new Collection();
const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const filePath = path.join(commandsPath, file);
	const command = require(filePath);
	// Set a new item in the Collection
	// With the key as the command name and the value as the exported module
	client.commands.set(command.data.name, command);
}

mongoose.connect(`mongodb+srv://joey:${MongoPass}@cosmic.rveuw.mongodb.net/?retryWrites=true&w=majority`);

mongoose.set('strictQuery', true);

client.on('interactionCreate', async interaction => {
	if (!interaction.isCommand()) return;

	const command = client.commands.get(interaction.commandName);

	if (!command) return;

	try {
		await command.execute(interaction);
	} catch (error) {
		console.error(error);
		await interaction.reply({ content: 'there was an error with this command.', ephemeral: true });
	}
});

// When the client is ready, run this code (only once)
client.once('ready', () => {
	console.log(`this instance has been started in ${client.guilds.cache.size} guilds`);
	client.user.setActivity('everything all at once', { type: "WATCHING" });
	client.user.setStatus(`idle`);
});

// Login to Discord with your client's token
client.login(token);