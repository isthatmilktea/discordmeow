const { SlashCommandBuilder, EmbedBuilder, Embed } = require(`discord.js`);
const { color } = require(`../config.json`);
const { ErrEmbed } = require(`../exports/errEmbed.js`);
const { UserStore } = require(`../exports/getIDDB.js`);
const { stripIndents } = require(`common-tags`);

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
            .setDescription(`gets a bot invite link`))
        .addSubcommand(subcommand =>
            subcommand.setName(`list`)
            .setDescription(`shows a list of people approved for an invite link`)),
	async execute(interaction) {
        const Sub = await interaction.options.getSubcommand()
        
        switch (Sub) {
            case 'approve': {
                if (interaction.user.id !== "630817206145646602") {
                     return interaction.reply({ embeds: [ErrEmbed] });
                }
                const user = await interaction.options.getUser(`user`);

                const FindUS = await UserStore.findOne({ userId: `${user.id}` });

                if (FindUS !== null) {
                    return interaction.reply({ content: `${user} was already on the invite list.`, ephemeral: true })
                }

                const InviteApproved = new UserStore({ userId: `${user.id}` });
                await InviteApproved.save();

                interaction.reply({ content: `${user} has been added to the invite list.`, ephemeral: true });
                    break;
            }
            case 'deny': {
                if (interaction.user.id !== "630817206145646602") {
                    return interaction.reply({ embeds: [ErrEmbed] });
                }
                const user1 = await interaction.options.getUser(`user`);

                const FindUS1 = await UserStore.findOne({ userId: `${user1.id}` });

                if (FindUS1 === null) {
                    return interaction.reply({ content: `${user1} was not on the invite list.`, ephemeral: true })
                };

                await UserStore.deleteOne({ userId: `${user1.id}` });

                interaction.reply({ content: `${user1} has been removed from the invite list.`, ephemeral: true });
                    break; 
            }
            case 'link': {
                const approvedID = await UserStore.findOne({ userId: `${interaction.user.id}` });
                if (approvedID === null) {
                    return interaction.reply({ embeds: [ErrEmbed], ephemeral: true });
                }
                    interaction.reply({ content: "please do not give this link to any or anywhere public. this is only exclusive access.\nlink: https://discord.com/api/oauth2/authorize?client_id=1069799337523159102&permissions=4398046511095&scope=bot%20applications.commands", ephemeral: true })
                    break;
            }
            case 'list': {
                if (interaction.user.id !== `630817206145646602`) {
                    return interaction.reply({ embeds: [ErrEmbed] });
                };

                const list = await UserStore.find();

                console.log(list)

                const listEmbed = new EmbedBuilder()
                .setColor(`${color}`)
                .setTitle(`invite list`)
                .setDescription(`now showing ${list.length} results...`);

                for (let i = 0; i < list.length; i++) {
                    listEmbed.addFields(
                        { name: `Result ${i+1}`, value: `<@${list[i].userId}> | ${list[i].userId}`}
                    )
                }

                interaction.reply({ embeds: [listEmbed] })

                break;
            }
        }

	},
};