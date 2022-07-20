const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const { color } = require(`../config.json`)
const request = require(`request`);

module.exports = {
	data: new SlashCommandBuilder()
		.setName('dog')
		.setDescription('sends a cute dog picture from ceo dog api'),
	async execute(interaction) {
        request("https://dog.ceo/api/breeds/image/random", { json: true }, (err, res, body) => {
            if (err) { return console.log(err); }
            const embed = new EmbedBuilder()
            .setColor(`${color}`)
            .setTitle(`From dog.ceo API`)
            .setURL(`https://dog.ceo/dog-api/`)
            .setImage(body.message)
            interaction.reply({ embeds: [embed] });
        });
	},
};