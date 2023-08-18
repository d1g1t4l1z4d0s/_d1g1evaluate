"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const LeagueSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    currentChampion: {
        type: String,
        required: true
    },
    logo: {
        type: String,
        required: true
    },
    teams: {
        type: Array,
        required: true
    }
}, { versionKey: false });
exports.default = (0, mongoose_1.model)('league', LeagueSchema);
