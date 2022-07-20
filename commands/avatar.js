const { SlashCommandBuilder, EmbedBuilder } = require(`discord.js`)
const { color } = require(`../config.json`);
const { stripIndents } = require(`common-tags`)
// constants and required packages go here

module.exports = {
	data: new SlashCommandBuilder()
		.setName('avatar')
		.setDescription('retrieves mentioned user\'s or your own avatar')
        .addUserOption(option =>
            option.setName(`user`)
            .setDescription(`who's avatar to retrieve`)
            .setRequired(false)),
	async execute(interaction) {
        const person = interaction.options.getUser(`user`) || interaction.user

        const personsAvatar = person.avatarURL({ forceStatic: false, size: 2048 })

		const avatarEmb = new EmbedBuilder()
        .setColor(`${color}`)
        .setDescription(stripIndents`${person}'s avatar`)
        .setImage(personsAvatar);
        interaction.reply({ embeds: [avatarEmb]} );
	},
};