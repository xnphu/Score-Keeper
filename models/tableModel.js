const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TableSchema = new Schema({
    playerName1: { type: String},
    playerName2: { type: String},
    playerName3: { type: String},
    playerName4: { type: String},
    round: [[Number]]
});

module.exports = mongoose.model("Table", TableSchema);