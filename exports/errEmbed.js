const { MessageEmbed } = require(`discord.js`);
const { stripIndents } = require(`common-tags`);
const { color } = require(`../config.json`)
const ErrEmbed = new MessageEmbed()
.setColor(`${color}`)
.setTitle(`__**instance error**__`)
.setDescription(stripIndents`an error has occured!
this can mean a lot of things such as:
- lack of permissions, bot sided
- an error in the source code
- an uncaught exception
and more, if this continues please contact the bot owner or developer.`)

module.exports = {
    ErrEmbed
}