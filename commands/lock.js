const { SlashCommandBuilder, EmbedBuilder } = require(`discord.js`);
const { ErrEmbed } = require(`../exports/errEmbed.js`);
const { color } = require(`../config.json`);
const { PermissionFlagsBits } = require('discord-api-types/v10');
// constants and required packages go here

module.exports = {
	data: new SlashCommandBuilder()
		.setName('lock')
		.setDescription('locks a channel')
        .setDMPermission(false)
        .setDefaultMemberPermissions(PermissionFlagsBits.ManageChannels | PermissionFlagsBits.Administrator),
	async execute(interaction) {
        interaction.channel.permissionOverwrites.create(interaction.channel.guild.roles.everyone, { SEND_MESSAGES: false })
        const embed = new EmbedBuilder()
        .setColor(`${color}`)
        .setTitle(`__**channel locked**__`)
        .setDescription(`this channel has been locked.`);

        interaction.reply({ embeds: [embed] });
	},
};