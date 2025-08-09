const Class = require('../models/Class');

const classController = {
  async getAllClasses(req, res) {
    try {
      const user = req.session.user;
      let query = {};

      if (user.role === 'school') {
        query.schoolId = user.id;
      } else if (user.role === 'volunteer') {
        // Show all available classes and classes booked by this volunteer
        query = {
          $or: [
            { status: 'available' },
            { volunteerId: user.id }
          ]
        };
      }

      const classes = await Class.find(query)
        .populate('schoolId', 'schoolName name')
        .populate('volunteerId', 'name email')
        .sort({ date: 1 });

      res.render('classes/index', { classes, user });
    } catch (error) {
      console.error('Classes error:', error);
      res.render('error', { message: 'Failed to load classes' });
    }
  },

  getCreateClass(req, res) {
    const user = req.session.user;
    if (user.role !== 'school') {
      return res.redirect('/classes');
    }
    res.render('classes/create', { error: null });
  },

  async createClass(req, res) {
    try {
      const user = req.session.user;
      if (user.role !== 'school') {
        return res.redirect('/classes');
      }

      const { title, subject, grade, description, date, duration, maxStudents } = req.body;

      const newClass = new Class({
        title,
        subject,
        grade: parseInt(grade),
        description,
        date: new Date(date),
        duration: parseInt(duration),
        maxStudents: parseInt(maxStudents),
        schoolId: user.id
      });

      await newClass.save();
      res.redirect('/classes');
    } catch (error) {
      console.error('Create class error:', error);
      res.render('classes/create', { error: 'Failed to create class' });
    }
  },

  async getClassDetails(req, res) {
    try {
      const classId = req.params.id;
      const classItem = await Class.findById(classId)
        .populate('schoolId', 'schoolName name email phone')
        .populate('volunteerId', 'name email phone');

      if (!classItem) {
        return res.render('error', { message: 'Class not found' });
      }

      res.render('classes/details', { classItem, user: req.session.user });
    } catch (error) {
      console.error('Class details error:', error);
      res.render('error', { message: 'Failed to load class details' });
    }
  },

  async bookClass(req, res) {
    try {
      const user = req.session.user;
      const classId = req.params.id;

      if (user.role !== 'volunteer') {
        return res.redirect('/classes');
      }

      const classItem = await Class.findById(classId);
      if (!classItem || classItem.status !== 'available') {
        return res.redirect('/classes');
      }

      classItem.volunteerId = user.id;
      classItem.status = 'booked';
      await classItem.save();

      res.redirect(`/classes/${classId}`);
    } catch (error) {
      console.error('Book class error:', error);
      res.redirect('/classes');
    }
  },

  async cancelBooking(req, res) {
    try {
      const user = req.session.user;
      const classId = req.params.id;

      const classItem = await Class.findById(classId);
      if (!classItem) {
        return res.redirect('/classes');
      }

      // Only allow cancellation by volunteer who booked it or school that created it
      if (user.role === 'volunteer' && classItem.volunteerId.toString() === user.id) {
        classItem.volunteerId = null;
        classItem.status = 'available';
        await classItem.save();
      } else if (user.role === 'school' && classItem.schoolId.toString() === user.id) {
        classItem.volunteerId = null;
        classItem.status = 'available';
        await classItem.save();
      }

      res.redirect(`/classes/${classId}`);
    } catch (error) {
      console.error('Cancel booking error:', error);
      res.redirect('/classes');
    }
  }
};

module.exports = classController;