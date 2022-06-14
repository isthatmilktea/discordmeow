const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
const { color } = require(`../config.json`);
const { getImage } = require(`random-reddit`);

module.exports = {
	data: new SlashCommandBuilder()
		.setName('handpic')
		.setDescription('sends a random picture from the r/ManHands subreddit'),
	async execute(interaction) {
		const subreddit = "ManHands";

        const img = await getImage(subreddit);

        const embed = new MessageEmbed()
        .setColor(`${color}`)
        .setTitle(`__**from r/ManHands**__`)
        .setImage(img)
        .setURL(`https://reddit.com/r/${subreddit}`)

        return interaction.reply({ embeds: [embed] });
	},
};