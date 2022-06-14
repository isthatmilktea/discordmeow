const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require(`discord.js`);
const { ErrEmbed } = require(`../exports/errEmbed.js`);
const { color } = require(`../config.json`);
// constants and required packages go here

module.exports = {
	data: new SlashCommandBuilder()
		.setName('lock')
		.setDescription('locks a channel'),
	async execute(interaction) {
		if (!interaction.member.permissions.has("MANAGE_CHANNELS")) {
            return interaction.reply({ embeds: [ErrEmbed] });
        }
        interaction.channel.permissionOverwrites.create(interaction.channel.guild.roles.everyone, { SEND_MESSAGES: false })
        const embed = new MessageEmbed()
        .setColor(`${color}`)
        .setTitle(`__**channel locked**__`)
        .setDescription(`this channel has been locked.`);

        interaction.reply({ embeds: [embed] });
	},
};