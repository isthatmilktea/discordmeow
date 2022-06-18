const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require(`discord.js`)
const { ErrEmbed } = require(`../exports/errEmbed.js`)
const { color } = require(`../config.json`);
const { stripIndents } = require('common-tags');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('role')
		.setDescription('gives or takes a role from a member')
        .addSubcommand(subcommand =>
            subcommand
            .setName(`grant`)
            .setDescription(`grants a role`)
            .addUserOption(option =>
                option.setName(`user`)
                .setDescription(`who to give a role`)
                .setRequired(true))
            .addRoleOption(option =>
                option.setName(`role`)
                .setDescription(`what role to give`)
                .setRequired(true)))
        .addSubcommand(subcommand =>
            subcommand
            .setName(`revoke`)
            .setDescription(`revokes a role`)
            .addUserOption(option =>
                option.setName(`user`)
                .setDescription(`who to take away a role from`)
                .setRequired(true))
            .addRoleOption(option =>
                option.setName(`role`)
                .setDescription(`what role to take away`)
                .setRequired(true))),
	async execute(interaction) {
        const user = interaction.options.getMember(`user`);
        const role = interaction.options.getRole(`role`);

        if (!interaction.member.permissions.has("MANAGE_ROLES")) {
            return interaction.reply({ embeds: [ErrEmbed] });
        }

        const Sub = interaction.options.getSubcommand()

        switch (Sub) {
            case 'grant':
                await user.roles.add(role)
                .catch(e => interaction.reply(e));

                const FinEmbed1 = new MessageEmbed()
                .setColor(`${color}`)
                .setTitle(`__**role added**__`)
                .setDescription(stripIndents`- role added: ${role}
                - user edited: ${user}
                - moderator: ${interaction.user}`);

                interaction.reply({ embeds: [FinEmbed1] });
                    break;
            case 'revoke':
                await user.roles.remove(role)
                .catch(e => interaction.reply(e));

                const FinEmbed2 = new MessageEmbed()
                .setColor(`${color}`)
                .setTitle(`__**role revoked**__`)
                .setDescription(stripIndents`- role removed: ${role}
                - user edited: ${user}
                - moderator ${interaction.user}`);

                interaction.reply({ embeds: [FinEmbed2]});
                    break;
    }


	},
};