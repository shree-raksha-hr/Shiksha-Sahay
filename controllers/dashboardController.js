const Class = require('../models/Class');
const Material = require('../models/Material');

const dashboardController = {
  async getDashboard(req, res) {
    try {
      const user = req.session.user;
      let dashboardData = {};

      if (user.role === 'school') {
        // Get classes created by this school
        dashboardData.classes = await Class.find({ schoolId: user.id })
          .populate('volunteerId', 'name email')
          .sort({ date: -1 })
          .limit(5);
        
        dashboardData.stats = {
          totalClasses: await Class.countDocuments({ schoolId: user.id }),
          bookedClasses: await Class.countDocuments({ schoolId: user.id, status: 'booked' }),
          availableClasses: await Class.countDocuments({ schoolId: user.id, status: 'available' })
        };
      } else if (user.role === 'volunteer') {
        // Get available classes and classes booked by this volunteer
        dashboardData.availableClasses = await Class.find({ status: 'available' })
          .populate('schoolId', 'schoolName')
          .sort({ date: 1 })
          .limit(5);
        
        dashboardData.myClasses = await Class.find({ volunteerId: user.id })
          .populate('schoolId', 'schoolName')
          .sort({ date: -1 })
          .limit(5);

        dashboardData.stats = {
          myClasses: await Class.countDocuments({ volunteerId: user.id }),
          availableClasses: await Class.countDocuments({ status: 'available' })
        };
      } else if (user.role === 'student') {
        // Get recent learning materials
        dashboardData.recentMaterials = await Material.find({ isPublic: true })
          .populate('uploadedBy', 'name')
          .sort({ createdAt: -1 })
          .limit(6);
        
        dashboardData.stats = {
          totalMaterials: await Material.countDocuments({ isPublic: true }),
          textMaterials: await Material.countDocuments({ type: 'text', isPublic: true }),
          videoMaterials: await Material.countDocuments({ type: 'video', isPublic: true }),
          audioMaterials: await Material.countDocuments({ type: 'audio', isPublic: true })
        };
      }

      res.render('dashboard/index', { user, dashboardData });
    } catch (error) {
      console.error('Dashboard error:', error);
      res.render('error', { message: 'Failed to load dashboard' });
    }
  }
};

module.exports = dashboardController;