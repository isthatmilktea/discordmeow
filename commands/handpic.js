const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const { color } = require(`../config.json`);
const { getPost, getImage } = require('random-reddit')


module.exports = {
	data: new SlashCommandBuilder()
		.setName('handpic')
		.setDescription('sends a random picture from the r/ManHands subreddit'),
	async execute(interaction) {
        
		const subreddit = "ManHands";

        const img = await getImage(subreddit);

        console.log(img)

        const embed = new EmbedBuilder()
        .setColor(`${color}`)
        .setTitle(`__**from r/ManHands**__`)
        .setImage(img)
        .setURL(`https://reddit.com/r/${subreddit}`)

        await interaction.deferReply()

        return interaction.editReply({ embeds: [embed] });
	},
};