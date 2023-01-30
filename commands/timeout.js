const { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits } = require(`discord.js`)
const { ErrEmbed } = require(`../exports/errEmbed.js`)
const { color } = require(`../config.json`);
const { stripIndents } = require('common-tags');
const ms = require(`ms`);

module.exports = {
	data: new SlashCommandBuilder()
		.setName('timeout')
		.setDescription('times out a member')
        .addUserOption(option => 
            option.setName(`user`)
            .setDescription(`user to timeout`)
            .setRequired(true))
        .addIntegerOption(option => 
            option.setName(`timeout`)
            .setDescription(`how long to time out a user for`)
            .setRequired(true)
            .addChoices(
                { name: "1 minute", value: 1 },
                { name: "5 minutes", value: 5 },
                { name: "10 minutes", value: 10 },
                { name: "1 hour", value: 60 },
                { name: "1 day", value: 1440 },
                { name: "1 week", value: 10080 }
                ))
        .addStringOption(option =>
            option.setName(`reason`)
            .setDescription(`reason for this members timeout`)
            .setRequired(true))
        .setDMPermission(false)
        .setDefaultMemberPermissions(PermissionFlagsBits.ModerateMembers | PermissionFlagsBits.Administrator),
	async execute(interaction) {
        const user = interaction.options.getMember(`user`);
        const timeout = interaction.options.getInteger(`timeout`);
        const reason = interaction.options.getString(`reason`);

        if (interaction.member.id === user.id) {
            return interaction.reply({ embeds: [ErrEmbed] })
        }

        await user.timeout(timeout * 60 * 1000, `${interaction.user.username} ; ${reason}`)

        const embed = new EmbedBuilder()
        .setColor(`${color}`)
        .setTitle(`__**timeout**__`)
        .setDescription(stripIndents`- member timedout: ${user}
        - reason for moderation action: ${reason}
        - timed out for ${ms(timeout * 60 * 1000, { long: true })}
        - moderator: ${interaction.user}`)

        return interaction.reply({ embeds: [embed] });
	},
};