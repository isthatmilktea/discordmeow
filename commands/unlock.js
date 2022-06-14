const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require(`discord.js`);
const { ErrEmbed } = require(`../exports/errEmbed.js`);
const { color } = require(`../config.json`);
// constants and required packages go here

module.exports = {
	data: new SlashCommandBuilder()
		.setName('unlock')
		.setDescription('unlocks a channel'),
	async execute(interaction) {
		if (!interaction.member.permissions.has("MANAGE_CHANNELS")) {
            return interaction.reply({ embeds: [ErrEmbed] });
        }
        interaction.channel.permissionOverwrites.delete(interaction.channel.guild.roles.everyone)
        const embed = new MessageEmbed()
        .setColor(`${color}`)
        .setTitle(`__**channel unlocked**__`)
        .setDescription(`this channel has been unlocked.`);

        interaction.reply({ embeds: [embed] });
	},
};