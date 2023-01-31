const { model, Schema } = require('mongoose');
const BLSchematic = new Schema({
  userId: String
})
const Blacklisteds = model('blacklistIDs', US);

module.exports = {
    BLSchematic,
    Blacklisteds
}