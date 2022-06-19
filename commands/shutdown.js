const { SlashCommandBuilder } = require('@discordjs/builders');
const { ErrEmbed } = require(`../exports/errEmbed.js`);


module.exports = {
	data: new SlashCommandBuilder()
		.setName('shutdown')
		.setDescription('shuts down the instance'),
	async execute(interaction) {
		if (interaction.user.id !== "630817206145646602") {
            return interaction.reply({ embeds: [ErrEmbed], ephemeral: true })
        }

        await interaction.reply({ content: `shutdown in progress, further commands will not be sent... please hold.` })

        process.exit()

	},
};