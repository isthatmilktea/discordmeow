const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const { ErrEmbed } = require(`../exports/errEmbed.js`)
const { color } = require(`../config.json`);
const { stripIndents } = require('common-tags');
const { DateTime } = require(`luxon`);
// constants and required packages go here

module.exports = {
	data: new SlashCommandBuilder()
		.setName('userinfo')
		.setDescription('shows user/member information')
        .addUserOption(option =>
            option.setName(`user`)
            .setDescription(`who to identify. defaults to interaction author.`)
            .setRequired(false))
        .setDMPermission(false),
	async execute(interaction) {
		let member = interaction.options.getMember(`user`);
        let user = interaction.options.getUser(`user`);

        if (!member || !user) { 
            member = interaction.member
            user = interaction.user 
        }

        const JoinTime = DateTime.fromJSDate(member.joinedAt).setZone("America/New_York").toLocaleString(DateTime.DATETIME_MED);
        const CachedRoles = member.roles.cache
        .filter(r => r.id !== interaction.guild.id)
        const FilteredRoles = CachedRoles.sort((a, b) => b.position - a.position).map(role => role.toString());
        const CreateTime = DateTime.fromJSDate(user.createdAt).setZone("America/New_York").toLocaleString(DateTime.DATETIME_MED);

        const embed = new EmbedBuilder()
        .setColor(member.displayHexColor === "#000000" ? "#ffffff" : member.displayHexColor)
        .setTitle(`__**user id**__`)
        .setThumbnail(user.avatarURL())
        .setDescription(stripIndents`__member information__
        - nickname: ${member.nickname !== null ? `${member.nickname}` : `${user.username}`}
        - joined at: ${JoinTime}
        - server roles: ${FilteredRoles}
        __user information__
        - user id: ${user.id}
        - created at: ${CreateTime}`)

        interaction.reply({ embeds: [embed] });
	},
};