const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require(`discord.js`)
const { ErrEmbed } = require(`../exports/errEmbed.js`)
const { color } = require(`../config.json`);
const { stripIndents } = require('common-tags');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('kick')
		.setDescription('kicks a user')
        .addUserOption(option =>
            option.setName(`user`)
            .setDescription(`user to kick`)
            .setRequired(true))
        .addStringOption(option =>
            option.setName(`reason`)
            .setDescription(`reason for the kick`)
            .setRequired(false)),
	async execute(interaction) {
		const user = interaction.options.getMember(`user`)
        let reason = interaction.options.getString(`reason`)

        if (!reason) reason = `no reason provided`

         if (user.kickable === false) {
            return interaction.reply({ embeds: [ErrEmbed], ephemeral: true })
        }

        if (!interaction.member.permissions.has("KICK_MEMBERS")) {
            return interaction.reply({ embeds: [ErrEmbed], ephemeral: true })
        }

        if (user.id === interaction.user.id) {
            return interaction.reply({ embeds: [ErrEmbed], ephemeral: true })
        }

        user.kick({ reason: `${interaction.user.username} ; ${reason}`})
        .catch(e => interaction.reply({ content: `there has been an error~ error: ${e}`, ephemeral: true }))

        const FinEmbed = new MessageEmbed()
        .setColor(`${color}`)
        .setTitle(`__**kick info**__`)
        .setDescription(stripIndents`- user kicked: ${user}
        - reason for moderation action: ${reason}
        - moderator ${interaction.user}`);

        interaction.reply({ embeds: [FinEmbed] })
	},
};