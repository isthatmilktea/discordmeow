const { model, Schema } = require('mongoose');
const US = new Schema({
  userId: String
})
const UserStore = model('USDB', US);

module.exports = {
  US,
  UserStore
}