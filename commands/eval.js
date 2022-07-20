const { SlashCommandBuilder, EmbedBuilder } = require(`discord.js`);
const { ErrEmbed } = require(`../exports/errEmbed.js`)
const { color } = require(`../config.json`)
const beautify = require(`beautify`)

module.exports = {
	data: new SlashCommandBuilder()
		.setName('eval')
		.setDescription('runs code')
        .addStringOption(option =>
            option.setName(`code`)
            .setDescription(`the code to run`)
            .setRequired(true)),
	async execute(interaction) {
        const code = interaction.options.getString(`code`)

		if (interaction.user.id !== '630817206145646602') {
            return interaction.reply({ embeds: [ErrEmbed], ephemeral: true })
        }

        try {
            if (code.toLowerCase().includes("token")) {
                return interaction.reply({ embeds: [ErrEmbed], ephemeral: true });
            }

            const toEval = code;
            let evaluated = eval(toEval);

            let embed = new EmbedBuilder()
            .setColor(`${color}`)
            .setTitle(`__**evaluation**__`)
            .addField("code imported:", `\`\`\`js\n${beautify(code, { format: "js"})}\n\`\`\``)
            .addField("evaluated:", `${evaluated}`)
            .addField("type of:", `${typeof(evaluated)}`);

            return interaction.reply({ embeds: [embed], ephemeral: true });
                } catch (e) {
                    let embed = new EmbedBuilder()
                    .setColor(`${color}`)
                    .setTitle("__**error on evaluation**__")
                    .setDescription(`${e}`)
                    return interaction.reply({ embeds: [embed], ephemeral: true });
        }
	},
};