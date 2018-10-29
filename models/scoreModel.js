const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ScoreSchema = new Schema({
    playerName1: { type: String},
    playerName2: { type: String},
    playerName3: { type: String},
    playerName4: { type: String},
    score1: { type: Number, default: 0 },
    score2: { type: Number, default: 0 },
    score3: { type: Number, default: 0 },
    score4: { type: Number, default: 0 }
});

module.exports = mongoose.model("Score", ScoreSchema);