const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require(`discord.js`)
const { ErrEmbed } = require(`../exports/errEmbed.js`)
const { color } = require(`../config.json`);
const { stripIndents } = require('common-tags');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('purge')
		.setDescription('purges the past messages')
        .addNumberOption(option =>
            option.setName(`number`)
            .setDescription(`number of messages to delete`)
            .setRequired(true)),
	async execute(interaction) {
		const number = interaction.options.getNumber(`number`);

        if (!interaction.member.permissions.has("MANAGE_MESSAGES")) {
            return interaction.reply({ embeds: [ErrEmbed]})
        }

        if (number < 2 || number > 100) {
            return interaction.reply({ embeds: [ErrEmbed] })
        }

        const fetched = await interaction.channel.messages.fetch({ limit: number })

        await interaction.channel.bulkDelete(fetched);

        const FinEmbed = new MessageEmbed()
        .setColor(`${color}`)
        .setTitle(`__**purge**__`)
        .setDescription(stripIndents`- amount of messages purged: ${number}
        - moderator: ${interaction.user}`);

        interaction.reply({ embeds: [FinEmbed] })
	},
};