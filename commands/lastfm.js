const { last_fm_api, last_fm_ss, color, MongoPass } = require(`../config.json`);
const LastFmApi = require('lastfm-api-client');
const { SlashCommandBuilder, EmbedBuilder } = require(`discord.js`)
const { ErrEmbed } = require(`../exports/errEmbed.js`);
const { LastFMSchematic, LSFModel } = require(`../exports/lastFMDB.js`);
const { stripIndents } = require('common-tags');
const LastFmClient = new LastFmApi({
    apiKey   : `${last_fm_api}`,
    apiSecret: `${last_fm_ss}`
});
// const Keyv = require(`keyv`)
// const lastFMUN = new Keyv(`mongodb+srv://joey:${MongoPass}@cosmic.rveuw.mongodb.net/?retryWrites=true&w=majority`, { collection: "lastFMusernames" });

module.exports = {
	data: new SlashCommandBuilder()
		.setName('lastfm')
		.setDescription('requests from the lastfm api')
        .addSubcommandGroup(subcommandgroup =>
            subcommandgroup.setName(`top`)
            .setDescription(`idk if this actually shows but`)
            .addSubcommand(subcommand =>
                subcommand.setName(`artist`)
                .setDescription(`gets the top 10 artists`)
                .addUserOption(option =>
                    option.setName(`user`)
                    .setDescription(`user to search`)
                    .setRequired(false)))
            .addSubcommand(subcommand => 
                subcommand.setName(`album`)
                .setDescription(`gets the top 10 albums`)
                .addUserOption(option =>
                    option.setName(`user`)
                    .setDescription(`user to search`)
                    .setRequired(false)))
            .addSubcommand(subcommand =>
                subcommand.setName(`tracks`)
                .setDescription(`gets the top 10 tracks`)
                .addUserOption(option =>
                    option.setName(`user`)
                    .setDescription(`user to search`)
                    .setRequired(false))))
        .addSubcommand(subcommand =>
            subcommand.setName(`nowplaying`)
            .setDescription(`requests the last.fm api for the currently playing song`)
            .addUserOption(option =>
                option.setName(`user`)
                .setDescription(`user to search`)
                .setRequired(false)))
        .addSubcommand(subcommand =>
            subcommand.setName(`recents`)
            .setDescription(`requests the last.fm api for the recent 10 tracks`)
            .addUserOption(option =>
                option.setName(`user`)
                .setDescription(`user to search`)
                .setRequired(false)))
        .addSubcommand(subcommand => 
            subcommand.setName(`scrobbles`)
            .setDescription(`requests the last.fm api for the scrobble count`)
            .addUserOption(option =>
                option.setName(`user`)
                .setDescription(`user to search`)
                .setRequired(false)))
        .addSubcommand(subcommand =>
            subcommand.setName(`set`)
            .setDescription(`sets your last.fm username`)
            .addStringOption(option =>
                option.setName(`username`)
                .setDescription(`your last.fm username`)
                .setRequired(true))),
	async execute(interaction) {


        let user = interaction.options.getUser(`user`);
        if (!user) user = interaction.user
        const FindFM = await LSFModel.findOne({ userId: `${user.id}` });
        if (interaction.options.getSubcommand() !== "set" && FindFM === null) {
            return interaction.reply({ content: "either you or this person has not set their last.fm username! use `/lastfm set (username)` to set a username." })
        }

        if (interaction.options.getSubcommand() === "nowplaying") {

            const a = await LastFmClient.user.getRecentTracks({
                user: `${FindFM.LastFMUN}`,
                limit: "1"
            })

                const embed1a = new EmbedBuilder()
                .setColor(`${color}`)
                .setTitle(`__**latest song**__`)
                .setDescription(stripIndents`[${a.recenttracks.track[0].name}](${a.recenttracks.track[0].url})
                ${a.recenttracks.track[0].artist["#text"]}
                ${a.recenttracks.track[0].album["#text"]}`)
                .setThumbnail(`${a.recenttracks.track[0].image[3]["#text"]}`)

                await interaction.deferReply()

                return interaction.editReply({ embeds: [embed1a] })
        }

        if (interaction.options.getSubcommand() === "scrobbles") {

            const f = await LastFmClient.user.getInfo({
                user: `${FindFM.LastFMUN}`,
            })

            const embed5 = new EmbedBuilder()
            .setColor(`${color}`)
            .setTitle(`__**scrobble count**__`)
            .setDescription(stripIndents`there are **${f.user.playcount}** scrobbles!`)

            await interaction.deferReply()

            return interaction.editReply({ embeds: [embed5] })
        }

        if (interaction.options.getSubcommand() === "set") {
            const stringVal = interaction.options.getString(`username`);

            if (FindFM !== null) {
                await LSFModel.updateOne(
                    { userId: `${interaction.user.id}` },
                    { $set: { LastFMUN: `${stringVal}` }}
                )
            }

            if (FindFM === null) {
                const NEWFM = new LSFModel({ userId: `${interaction.user.id}`, LastFMUN: `${stringVal}` })
                await NEWFM.save();
            }

            return interaction.reply({ content: `you have successfully set your last.fm username as ${stringVal}!` })
        }

        if (interaction.options.getSubcommand() === "recents") {

		    const e = await LastFmClient.user.getRecentTracks({
                user: `${FindFM.LastFMUN}`,
                limit: "10"
            })

            const embed = new EmbedBuilder()
            .setColor(`${color}`)
            .setTitle(`__**10 most recent tracks**__`)
            .setDescription(stripIndents`1. [${e.recenttracks.track[0].name}](${e.recenttracks.track[0].url})
            by ${e.recenttracks.track[0].artist['#text']}
            2. [${e.recenttracks.track[1].name}](${e.recenttracks.track[1].url})
            by ${e.recenttracks.track[1].artist['#text']}
            3. [${e.recenttracks.track[2].name}](${e.recenttracks.track[2].url})
            by ${e.recenttracks.track[2].artist['#text']}
            4. [${e.recenttracks.track[3].name}](${e.recenttracks.track[3].url})
            by ${e.recenttracks.track[3].artist['#text']}
            5. [${e.recenttracks.track[4].name}](${e.recenttracks.track[4].url})
            by ${e.recenttracks.track[4].artist['#text']}
            6. [${e.recenttracks.track[5].name}](${e.recenttracks.track[5].url})
            by ${e.recenttracks.track[5].artist['#text']}
            7. [${e.recenttracks.track[6].name}](${e.recenttracks.track[6].url})
            by ${e.recenttracks.track[6].artist['#text']}
            8. [${e.recenttracks.track[7].name}](${e.recenttracks.track[7].url})
            by ${e.recenttracks.track[7].artist['#text']}
            9. [${e.recenttracks.track[8].name}](${e.recenttracks.track[8].url})
            by ${e.recenttracks.track[8].artist['#text']}
            10. [${e.recenttracks.track[9].name}](${e.recenttracks.track[9].url})
            by ${e.recenttracks.track[9].artist['#text']}`)

            await interaction.deferReply()

            return interaction.editReply({ embeds: [embed] })
        }

        if (interaction.options.getSubcommandGroup() === "top" && interaction.options.getSubcommand() === "artist") {
            const b = await LastFmClient.user.getTopArtists({
                user: `${FindFM.LastFMUN}`,
                limit: "10"
            })

            const embed2 = new EmbedBuilder()
            .setColor(`${color}`)
            .setTitle(`__**top 10 artists**__`)
            .setDescription(stripIndents`1. [${b.topartists.artist[0].name}](${b.topartists.artist[0].url})
            scrobbles: ${b.topartists.artist[0].playcount}
            2. [${b.topartists.artist[1].name}](${b.topartists.artist[1].url})
            scrobbles: ${b.topartists.artist[1].playcount}
            3. [${b.topartists.artist[2].name}](${b.topartists.artist[2].url})
            scrobbles: ${b.topartists.artist[2].playcount}
            4. [${b.topartists.artist[3].name}](${b.topartists.artist[3].url})
            scrobbles: ${b.topartists.artist[3].playcount}
            5. [${b.topartists.artist[4].name}](${b.topartists.artist[4].url})
            scrobbles: ${b.topartists.artist[4].playcount}
            6. [${b.topartists.artist[5].name}](${b.topartists.artist[5].url})
            scrobbles: ${b.topartists.artist[5].playcount}
            7. [${b.topartists.artist[6].name}](${b.topartists.artist[6].url})
            scrobbles: ${b.topartists.artist[6].playcount}
            8. [${b.topartists.artist[7].name}](${b.topartists.artist[7].url})
            scrobbles: ${b.topartists.artist[7].playcount}
            9. [${b.topartists.artist[8].name}](${b.topartists.artist[8].url})
            scrobbles: ${b.topartists.artist[8].playcount}
            10. [${b.topartists.artist[9].name}](${b.topartists.artist[9].url})
            scrobbles: ${b.topartists.artist[9].playcount}`)
            .setThumbnail(`${b.topartists.artist[0].image[3]["#text"]}`);

            await interaction.deferReply()

            return interaction.editReply({ embeds: [embed2] })
        }

        if (interaction.options.getSubcommandGroup() === "top" && interaction.options.getSubcommand() === "album") {

            const c = await LastFmClient.user.getTopAlbums({
                user: `${FindFM.LastFMUN}`,
                limit: "10"
            })

            const embed3 = new EmbedBuilder()
            .setColor(`${color}`)
            .setTitle(`__**top 10 albums**__`)
            .setDescription(stripIndents`1. [${c.topalbums.album[0].name}](${c.topalbums.album[0].url})
            by [${c.topalbums.album[0].artist.name}](${c.topalbums.album[0].artist.url})
            scrobbles: ${c.topalbums.album[0].playcount}
            2. [${c.topalbums.album[1].name}](${c.topalbums.album[1].url})
            by [${c.topalbums.album[1].artist.name}](${c.topalbums.album[1].artist.url})
            scrobbles: ${c.topalbums.album[1].playcount}
            3. [${c.topalbums.album[2].name}](${c.topalbums.album[2].url})
            by [${c.topalbums.album[2].artist.name}](${c.topalbums.album[2].artist.url})
            scrobbles: ${c.topalbums.album[2].playcount}
            4. [${c.topalbums.album[3].name}](${c.topalbums.album[3].url})
            by [${c.topalbums.album[3].artist.name}](${c.topalbums.album[3].artist.url})
            scrobbles: ${c.topalbums.album[3].playcount}
            5. [${c.topalbums.album[4].name}](${c.topalbums.album[4].url})
            by [${c.topalbums.album[4].artist.name}](${c.topalbums.album[4].artist.url})
            scrobbles: ${c.topalbums.album[4].playcount}
            6. [${c.topalbums.album[5].name}](${c.topalbums.album[5].url})
            by [${c.topalbums.album[5].artist.name}](${c.topalbums.album[5].artist.url})
            scrobbles: ${c.topalbums.album[5].playcount}
            7. [${c.topalbums.album[6].name}](${c.topalbums.album[6].url})
            by [${c.topalbums.album[6].artist.name}](${c.topalbums.album[6].artist.url})
            scrobbles: ${c.topalbums.album[6].playcount}
            8. [${c.topalbums.album[7].name}](${c.topalbums.album[7].url})
            by [${c.topalbums.album[7].artist.name}](${c.topalbums.album[7].artist.url})
            scrobbles: ${c.topalbums.album[7].playcount}
            9. [${c.topalbums.album[8].name}](${c.topalbums.album[8].url})
            by [${c.topalbums.album[8].artist.name}](${c.topalbums.album[8].artist.url})
            scrobbles: ${c.topalbums.album[8].playcount}
            10. [${c.topalbums.album[9].name}](${c.topalbums.album[9].url})
            by [${c.topalbums.album[9].artist.name}](${c.topalbums.album[9].artist.url})
            scrobbles: ${c.topalbums.album[9].playcount}`)
            .setThumbnail(`${c.topalbums.album[0].image[3]["#text"]}`);

            await interaction.deferReply()

            return interaction.editReply({ embeds: [embed3] })
        }

        if (interaction.options.getSubcommandGroup() === "top" && interaction.options.getSubcommand() === "tracks") {
            
            const d = await LastFmClient.user.getTopTracks({
                user: `${FindFM.LastFMUN}`,
                limit: "10"
            })

            const embed4 = new EmbedBuilder()
            .setColor(`${color}`)
            .setTitle(`__**top 10 tracks**__`)
            .setDescription(stripIndents`1. [${d.toptracks.track[0].name}](${d.toptracks.track[0].url})
            by [${d.toptracks.track[0].artist.name}](${d.toptracks.track[0].artist.url})
            scrobbles: ${d.toptracks.track[0].playcount}
            2. [${d.toptracks.track[1].name}](${d.toptracks.track[1].url})
            by [${d.toptracks.track[1].artist.name}](${d.toptracks.track[1].artist.url})
            scrobbles: ${d.toptracks.track[1].playcount}
            3. [${d.toptracks.track[2].name}](${d.toptracks.track[2].url})
            by [${d.toptracks.track[2].artist.name}](${d.toptracks.track[2].artist.url})
            scrobbles: ${d.toptracks.track[2].playcount}
            4. [${d.toptracks.track[3].name}](${d.toptracks.track[3].url})
            by [${d.toptracks.track[3].artist.name}](${d.toptracks.track[3].artist.url})
            scrobbles: ${d.toptracks.track[3].playcount}
            5. [${d.toptracks.track[4].name}](${d.toptracks.track[4].url})
            by [${d.toptracks.track[4].artist.name}](${d.toptracks.track[4].artist.url})
            scrobbles: ${d.toptracks.track[4].playcount}
            6. [${d.toptracks.track[5].name}](${d.toptracks.track[5].url})
            by [${d.toptracks.track[5].artist.name}](${d.toptracks.track[5].artist.url})
            scrobbles: ${d.toptracks.track[5].playcount}
            7. [${d.toptracks.track[6].name}](${d.toptracks.track[6].url})
            by [${d.toptracks.track[6].artist.name}](${d.toptracks.track[6].artist.url})
            scrobbles: ${d.toptracks.track[6].playcount}
            8. [${d.toptracks.track[7].name}](${d.toptracks.track[7].url})
            by [${d.toptracks.track[7].artist.name}](${d.toptracks.track[7].artist.url})
            scrobbles: ${d.toptracks.track[7].playcount}
            9. [${d.toptracks.track[8].name}](${d.toptracks.track[8].url})
            by [${d.toptracks.track[8].artist.name}](${d.toptracks.track[8].artist.url})
            scrobbles: ${d.toptracks.track[8].playcount}
            10. [${d.toptracks.track[9].name}](${d.toptracks.track[9].url})
            by [${d.toptracks.track[9].artist.name}](${d.toptracks.track[9].artist.url})
            scrobbles: ${d.toptracks.track[9].playcount}`)
            .setThumbnail(`${d.toptracks.track[0].image[3]["#text"]}`);

            await interaction.deferReply()

            return interaction.editReply({ embeds: [embed4] })
        }
	},
};