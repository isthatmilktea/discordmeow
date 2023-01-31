const { SlashCommandBuilder, EmbedBuilder, version: djsVersion } = require(`discord.js`);
const { stripIndents } = require(`common-tags`);
const { color } = require(`../config.json`);
const { ErrEmbed } = require(`../exports/errEmbed.js`);
// constants and required packages go here

module.exports = {
	data: new SlashCommandBuilder()
		.setName('info')
		.setDescription('information about the bot'),
	async execute(interaction) {
		const embed1 = new EmbedBuilder()
        .setColor(`${color}`)
        .setDescription(stripIndents`__**bot info**__
        bot instance: ${interaction.client.user.username}
        dev / owner: <@630817206145646602>
        bot creation: 
        > original crystelian creation: 6/10/22
        > hoax creation: 1/30/23
        *some nerd stuff if u want it:*
        discord.js version: v${djsVersion}
        node.js version: ${process.version}
        either running it on my computer or digitalocean vps
        github repo: [https://github.com/isthatmilktea/discordmeow](click here :p)
        thanks for using the bot <3`)
        interaction.reply({ embeds: [embed1] })
	},
};