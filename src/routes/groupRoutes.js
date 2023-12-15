const express = require('express');
const router = express.Router();
const groupController = require('../controllers/groupController');
const { authenticate } = require('../middlewares/middlewares');


router.post('/group', groupController.createGroup);
router.post('/group/addMember', groupController.addMember);
router.post('/group', authenticate, groupController.createGroup);
router.post('/group/invite', authenticate, groupController.inviteMember);
router.post('/group/acceptInvitation', authenticate, groupController.acceptInvitation);
router.post('/group/declineInvitation', authenticate, groupController.declineInvitation);
router.post('/group/:groupId/assignSecretSantas', authenticate, groupController.assignSecretSantas);


module.exports = router;
