const { SlashCommandBuilder } = require('discord.js');
const { ErrEmbed } = require(`../exports/errEmbed.js`);
const { stripIndent } = require(`common-tags`)

module.exports = {
	data: new SlashCommandBuilder()
		.setName('shutdown')
		.setDescription('shuts down the instance'),
	async execute(interaction) {
		if (interaction.user.id !== "630817206145646602") {
            return interaction.reply({ embeds: [ErrEmbed], ephemeral: true })
        }

        await interaction.reply({ content: stripIndent`BLACKPINK IN YO AREYUHHH
		shutting down... bye bye!` })

        process.exit()

	},
};