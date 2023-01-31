const { model, Schema } = require('mongoose');
const LastFMSchematic = new Schema({
  userId: String,
  LastFMUN: String
})
const LSFModel = model('LastFMID', LastFMSchematic);

module.exports = {
    LastFMSchematic,
    LSFModel
}