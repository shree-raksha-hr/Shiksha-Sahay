const express = require('express');
const materialController = require('../controllers/materialController');

const router = express.Router();

// View all materials
router.get('/', materialController.getAllMaterials);

// View materials by subject and grade
router.get('/subject/:subject', materialController.getMaterialsBySubject);
router.get('/grade/:grade', materialController.getMaterialsByGrade);

// View material details
router.get('/view/:id', materialController.getMaterialDetails);

module.exports = router;