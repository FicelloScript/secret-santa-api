const express = require('express');
const router = express.Router();
const groupController = require('../controllers/groupController');

router.post('/group', groupController.createGroup);
router.post('/group/addMember', groupController.addMember);

// Autres routes pour les groupes

module.exports = router;
