const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require(`discord.js`);
const { stripIndents } = require(`common-tags`);
const { color } = require(`../config.json`);

module.exports = {
	data: new SlashCommandBuilder()
		.setName('ping')
		.setDescription('shows latency and api ping'),
	async execute(interaction) {
		await interaction.reply({ content: `registering message latency...` })

        const message = await interaction.editReply({ content: `registering 2nd message latency...`})

        interaction.editReply({ content: stripIndents`__**ping information**__
        - latency: ${Math.floor(message.editedAt - interaction.createdAt)}ms
        - api latency: ${Math.round(interaction.client.ws.ping)}ms` })
	},
};