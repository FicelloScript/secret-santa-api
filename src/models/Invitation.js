const mongoose = require('mongoose');

const invitationSchema = new mongoose.Schema({
    email: { type: String, required: true },
    groupId: { type: mongoose.Schema.Types.ObjectId, ref: 'Group', required: true },
    createdAt: { type: Date, default: Date.now, index: { expires: '2d' } }
});

const Invitation = mongoose.model('Invitation', invitationSchema);

module.exports = Invitation;
