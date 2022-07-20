const { SlashCommandBuilder, EmbedBuilder } = require(`discord.js`);
const { color, MongoPass } = require(`../config.json`);
const { ErrEmbed } = require(`../exports/errEmbed.js`)
const Keyv = require(`keyv`)
const inviteList = new Keyv(`mongodb+srv://joey:${MongoPass}@cosmic.rveuw.mongodb.net/?retryWrites=true&w=majority`, { collection: "approvedIDs" });


module.exports = {
	data: new SlashCommandBuilder()
		.setName('invite')
		.setDescription('adds a member to the invite approve list')
        .addSubcommand(subcommand =>
            subcommand.setName(`approve`)
            .setDescription(`approves a user for the invite list`)
            .addUserOption(option =>
                option.setName(`user`)
                .setDescription(`user to approve`)
                .setRequired(true)))
        .addSubcommand(subcommand =>
            subcommand.setName(`deny`)
            .setDescription(`denies a user from the invite list`)
            .addUserOption(option =>
                option.setName(`user`)
                .setDescription(`user to deny`)
                .setRequired(true)))
        .addSubcommand(subcommand =>
            subcommand.setName(`link`)
            .setDescription(`gets a bot invite link`)),
	async execute(interaction) {
        const Sub = await interaction.options.getSubcommand()
        
        switch (Sub) {
            case 'approve': {
                if (interaction.user.id !== "630817206145646602") {
                     return interaction.reply({ embeds: [ErrEmbed] });
                }
                const user = await interaction.options.getUser(`user`);
                await inviteList.set(user.id, user.id);
                interaction.reply({ content: `${user} has been added to the invite list.`, ephemeral: true });
                    break;
            }
            case 'deny': {
                if (interaction.user.id !== "630817206145646602") {
                    return interaction.reply({ embeds: [ErrEmbed] });
                }
                const user1 = await interaction.options.getUser(`user`);
                await inviteList.delete(user1.id);
                interaction.reply({ content: `${user1} has been removed from the invite list.`, ephemeral: true });
                    break; 
            }
            case 'link': {
                const approveID = await inviteList.get(interaction.user.id);
                if (approveID === undefined) {
                    return interaction.reply({ embeds: [ErrEmbed], ephemeral: true });
                }
                if (approveID === interaction.user.id) {
                    interaction.reply({ content: "please do not give this link to any or anywhere public. this is only exclusive access.\nlink: https://discord.com/api/oauth2/authorize?client_id=684941677802029101&permissions=1644971949559&scope=bot", ephemeral: true })
                }
                    break;
            }
        }

	},
};