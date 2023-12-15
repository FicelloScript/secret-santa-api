const Group = require('../models/Group');
const User = require('../models/User');
const nodemailer = require('nodemailer');
const secretSantaService = require('../services/secretSantaService');

exports.assignSecretSantas = async (req, res) => {
    try {
        const groupId = req.params.groupId;
        const group = await Group.findById(groupId);

        if (!group) {
            return res.status(404).send({ error: 'Group not found' });
        }

        const assignments = secretSantaService.assignSecretSantas(group.members);
        group.assignments = assignments;
        await group.save();

        res.send({ message: 'Secret Santas assigned successfully', group });
    } catch (error) {
        
        res.status(400).send(error);
    }
};


exports.inviteMember = async (req, res) => {
    const { email, groupId } = req.body;
    const group = await Group.findById(groupId);

    if (!group) {
        return res.status(404).send({ error: 'Group not found' });
    }

    const transporter = nodemailer.createTransport({
        service: 'gmail', 
        auth: {
            user: 'test@gmail.com',
            pass: 'JQLH<MFHGLBSB<'
        }
    });

    const mailOptions = {
        from: 'test@gmail.com',
        to: email,
        subject: 'Invitation to join Secret Santa Group',
        text: `You have been invited to join the Secret Santa Group: ${group.name}. Please click on the following link to accept the invitation: [Link to accept invitation]`
    };

    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
            console.log(error);
            res.status(500).send({ error: 'Failed to send invitation' });
        } else {
            console.log('Email sent: ' + info.response);
            res.status(200).send({ message: 'Invitation sent successfully' });
        }
    });
};


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

exports.acceptInvitation = async (req, res) => {
    try {
        const { invitationId } = req.body;
        const invitation = await Invitation.findById(invitationId);
        const group = await Group.findById(invitation.groupId);

        if (!group) {
            return res.status(404).send({ error: 'Group not found' });
        }

        group.members.push(req.user._id);
        await group.save();

        await Invitation.deleteOne({ _id: invitationId });

        res.send({ message: 'Invitation accepted', group });
    } catch (error) {
        res.status(400).send(error);
    }
};

exports.declineInvitation = async (req, res) => {
    try {
        const { invitationId } = req.body;
        const invitation = await Invitation.findById(invitationId);

        if (!invitation) {
            return res.status(404).send({ error: 'Invitation not found' });
        }

        await Invitation.deleteOne({ _id: invitationId });

        res.send({ message: 'Invitation declined' });
    } catch (error) {
        res.status(400).send(error);
    }
};




