const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require(`discord.js`);
const { color } = require(`../config.json`);
const ms = require("ms");
const moment = require("moment");
const { stripIndents } = require(`common-tags`);

module.exports = {
	data: new SlashCommandBuilder()
		.setName('guild')
		.setDescription('gives you information about a server'),
	async execute(interaction) {
		const ago = ms(Date.now() - interaction.guild.createdTimestamp, { long: true });
        const text = interaction.guild.channels.cache.filter(channel => channel.type === channel.isTextBased).size;
        const voice = interaction.guild.channels.cache.filter(channel => channel.type === channel.isVoiceBased).size;

        const embed = new MessageEmbed()
        .setColor(`${color}`)
        .setTitle(`__**server info**__`)
        .setDescription(stripIndents`- **server name**
        ${interaction.guild.name}
        - **server id**
        ${interaction.guild.id}
        - **server creation**
        ${moment(interaction.guild.createdAt, "MM-DD-YYYY hh:mm:ss a")}
        ${ago} ago.
        - **server owner**
        <@${interaction.guild.ownerId}>
        - **countings**
        members: ${interaction.guild.memberCount}
        roles: ${interaction.guild.roles.cache.size}
        channels: ${interaction.guild.channels.cache.size}
        text: ${text} ~BROKEN~
        voice: ${voice} ~BROKEN~`)

        interaction.reply({ embeds: [embed] })
	},
};