const { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits } = require(`discord.js`)
const { ErrEmbed } = require(`../exports/errEmbed.js`)
const { color } = require(`../config.json`);
const { stripIndents } = require('common-tags');
const convert = require(`convert-seconds-to-human`);

module.exports = {
	data: new SlashCommandBuilder()
		.setName('ban')
		.setDescription('bans a user')
        .addUserOption(option =>
            option.setName(`user`)
            .setDescription(`user to ban`)
            .setRequired(true))
        .addIntegerOption(option =>
            option.setName(`days`)
            .setDescription(`amount of days to delete messages`)
            .setRequired(false)
            .addChoices(
                { name: `none`, value: 0 },
                { name: `1 day`, value: 86400 },
                { name: `2 days`, value: 172800 },
                { name: `3 days`, value: 259200 },
                { name: `4 days`, value: 345600 },
                { name: `5 days`, value: 432000 },
                { name: `6 days`, value: 518400 },
                { name: `7 days`, value: 604800 }
            ))
        .addStringOption(option =>
            option.setName(`reason`)
            .setDescription(`reason for the ban`)
            .setRequired(false))
        .setDMPermission(false)
        .setDefaultMemberPermissions(PermissionFlagsBits.BanMembers | PermissionFlagsBits.Administrator),
	async execute(interaction) {
		const user = interaction.options.getUser(`user`);
        const messageDel = interaction.options.getInteger(`days`);
        let reason = interaction.options.getString(`reason`);

        if (!reason) reason = "no reason provided"

        if (user.bannable === false) {
            return interaction.reply({ embeds: [ErrEmbed], ephemeral: true })
        }

        if (user.id === interaction.user.id) {
            return interaction.reply({ embeds: [ErrEmbed], ephemeral: true })
        }

        interaction.guild.members.ban(user, { deleteMessageSeconds: messageDel, reason: `${interaction.user.username} ; ${reason}`})
        .catch(e => interaction.reply({ content: `there has been an error~ error: ${e}`, ephemeral: true }))

        const daysString = convert(messageDel, 'cal')

        const FinEmbed = new EmbedBuilder()
        .setColor(`${color}`)
        .setTitle(`__**ban info**__`)
        .setDescription(stripIndents`- user banned: ${user}
        - reason for moderation action: ${reason}
        - days deleted: ${daysString.days}
        - moderator: ${interaction.user}`);

        interaction.reply({ embeds: [FinEmbed] })
	},
};