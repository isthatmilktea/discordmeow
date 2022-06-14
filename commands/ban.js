const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require(`discord.js`)
const { ErrEmbed } = require(`../exports/errEmbed.js`)
const { color } = require(`../config.json`);
const { stripIndents } = require('common-tags');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('ban')
		.setDescription('bans a user')
        .addUserOption(option =>
            option.setName(`user`)
            .setDescription(`user to ban`)
            .setRequired(true))
        .addStringOption(option =>
            option.setName(`reason`)
            .setDescription(`reason for the ban`)
            .setRequired(false)),
	async execute(interaction) {
		const user = interaction.options.getUser(`user`)
        let reason = interaction.options.getString(`reason`)

        if (!reason) reason = "no reason provided"

        if (user.bannable === false) {
            return interaction.reply({ embeds: [ErrEmbed], ephemeral: true })
        }

        if (!interaction.member.permissions.has("BAN_MEMBERS")) {
            return interaction.reply({ embeds: [ErrEmbed], ephemeral: true })
        }

        if (user.id === interaction.user.id) {
            return interaction.reply({ embeds: [ErrEmbed], ephemeral: true })
        }

        interaction.guild.members.ban(user, { deleteMessageDays: 7, reason: `${interaction.user.username} ; ${reason}`})
        .catch(e => interaction.reply({ content: `there has been an error~ error: ${e}`, ephemeral: true }))

        const FinEmbed = new MessageEmbed()
        .setColor(`${color}`)
        .setTitle(`__**ban info**__`)
        .setDescription(stripIndents`- user banned: ${user}
        - reason for moderation action: ${reason}
        - moderator: ${interaction.user}`);

        interaction.reply({ embeds: [FinEmbed] })
	},
};