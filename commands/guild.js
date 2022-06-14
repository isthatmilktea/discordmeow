const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require(`discord.js`);
const { color } = require(`../config.json`);
const ms = require("ms");
const { DateTime } = require("luxon");
const { stripIndents } = require(`common-tags`);

module.exports = {
	data: new SlashCommandBuilder()
		.setName('guild')
		.setDescription('gives you information about a server'),
	async execute(interaction) {
		const ago = ms(Date.now() - interaction.guild.createdTimestamp, { long: true });
        const text = interaction.guild.channels.cache.filter(channel => channel.type !== "GUILD_TEXT").size;
        const voice = interaction.guild.channels.cache.filter(channel => channel.type !== "GUILD_VOICE").size;

        const embed = new MessageEmbed()
        .setColor(`${color}`)
        .setTitle(`__**server info**__`)
        .setDescription(stripIndents`- **server name**
        ${interaction.guild.name}
        - **server id**
        ${interaction.guild.id}
        - **server creation**
        ${DateTime.fromJSDate(interaction.guild.createdAt).setZone("America/New_York").toLocaleString(DateTime.DATETIME_MED)}
        ${ago} ago.
        - **server owner**
        <@${interaction.guild.ownerId}>
        - **countings**
        members: ${interaction.guild.memberCount}
        roles: ${interaction.guild.roles.cache.size}
        channels: ${interaction.guild.channels.cache.size}
        text: ${text}
        voice: ${voice}`)

        interaction.reply({ embeds: [embed] })
	},
};