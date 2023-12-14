const Group = require('../models/Group');
const User = require('../models/User');

exports.addMember = async (req, res) => {
    try {
        const { groupId, userId } = req.body;
        const group = await Group.findById(groupId);
        const user = await User.findById(userId);

        if (!group || !user) {
            return res.status(404).send();
        }

        group.members.push(user._id);
        await group.save();
        res.status(200).send(group);
    } catch (error) {
        res.status(400).send(error);
    }
};


