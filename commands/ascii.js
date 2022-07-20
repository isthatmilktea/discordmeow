const { ErrEmbed } = require(`../exports/errEmbed.js`);
const figlet = require(`figlet`);
const { SlashCommandBuilder } = require(`discord.js`);

module.exports = {
	data: new SlashCommandBuilder()
		.setName('ascii')
		.setDescription('converts normal text into ascii')
        .addStringOption(option =>
            option.setName(`text`)
            .setDescription(`text to convert`)
            .setRequired(true)),
	async execute(interaction) {
		const text = interaction.options.getString(`text`);

        if (text.length > 2000) { 
            return interaction.reply({ embeds: [ErrEmbed] })
        }

        figlet(text, function(err, data) {
            if (err) {
                console.log('Something went wrong...');
                console.dir(err);
                return;
            }
            interaction.reply({ content: `\`\`\`${data}\`\`\`` })
        });
	},
};