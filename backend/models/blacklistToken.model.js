
// const mongoose = require('mongoose');

// const blacklistSchema = new mongoose.Schema({
//     token: {
//         type: String,
//         required: true,
//         unique: true,
//     },
//     createdAt: {
//         type: Date,
//         default: Date.now,
//         expires: 86400, //second
//     },
// });

// const Blacklist = mongoose.model('Blacklist', blacklistSchema);
// module.exports = Blacklist;

const mongoose = require('mongoose');

const blackListTokenSchema = new mongoose.Schema({
    token: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
        expires: '7d', // Automatically delete after 7 days
    },
});

// Prevent model overwrite
module.exports = mongoose.models.Blacklist || mongoose.model('Blacklist', blackListTokenSchema);
