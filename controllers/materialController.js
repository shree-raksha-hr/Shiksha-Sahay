const Material = require('../models/Material');

const materialController = {
  async getAllMaterials(req, res) {
    try {
      const { subject, grade, type } = req.query;
      let query = { isPublic: true };

      if (subject) query.subject = subject;
      if (grade) query.grade = parseInt(grade);
      if (type) query.type = type;

      const materials = await Material.find(query)
        .populate('uploadedBy', 'name')
        .sort({ createdAt: -1 });

      const subjects = ['Mathematics', 'Science', 'English', 'Hindi', 'Social Studies', 'Computer Science'];
      const grades = Array.from({ length: 12 }, (_, i) => i + 1);
      const types = ['text', 'video', 'audio'];

      res.render('materials/index', { 
        materials, 
        subjects, 
        grades, 
        types, 
        filters: { subject, grade, type } 
      });
    } catch (error) {
      console.error('Materials error:', error);
      res.render('error', { message: 'Failed to load materials' });
    }
  },

  async getMaterialsBySubject(req, res) {
    try {
      const { subject } = req.params;
      const materials = await Material.find({ subject, isPublic: true })
        .populate('uploadedBy', 'name')
        .sort({ createdAt: -1 });

      res.render('materials/by-subject', { materials, subject });
    } catch (error) {
      console.error('Materials by subject error:', error);
      res.render('error', { message: 'Failed to load materials' });
    }
  },

  async getMaterialsByGrade(req, res) {
    try {
      const { grade } = req.params;
      const materials = await Material.find({ grade: parseInt(grade), isPublic: true })
        .populate('uploadedBy', 'name')
        .sort({ createdAt: -1 });

      res.render('materials/by-grade', { materials, grade });
    } catch (error) {
      console.error('Materials by grade error:', error);
      res.render('error', { message: 'Failed to load materials' });
    }
  },

  async getMaterialDetails(req, res) {
    try {
      const materialId = req.params.id;
      const material = await Material.findById(materialId)
        .populate('uploadedBy', 'name email');

      if (!material || !material.isPublic) {
        return res.render('error', { message: 'Material not found' });
      }

      res.render('materials/details', { material });
    } catch (error) {
      console.error('Material details error:', error);
      res.render('error', { message: 'Failed to load material details' });
    }
  }
};

module.exports = materialController;