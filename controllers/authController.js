const User = require('../models/User');

const authController = {
  async register(req, res) {
    try {
      const { name, email, password, role, schoolName, grade, subjects, phone, address } = req.body;

      // Check if user already exists
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.render('auth/register-role', { 
          role, 
          error: 'User with this email already exists' 
        });
      }

      // Create user data object
      const userData = { name, email, password, role, phone, address };
      
      // Add role-specific fields
      if (role === 'school') {
        userData.schoolName = schoolName;
      } else if (role === 'student') {
        userData.grade = parseInt(grade);
      } else if (role === 'volunteer') {
        userData.subjects = Array.isArray(subjects) ? subjects : [subjects];
      }

      // Create new user
      const user = new User(userData);
      await user.save();

      // Set session
      req.session.user = {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      };

      res.redirect('/dashboard');
    } catch (error) {
      console.error('Registration error:', error);
      res.render('auth/register-role', { 
        role: req.body.role, 
        error: 'Registration failed. Please try again.' 
      });
    }
  },

  async login(req, res) {
    // console.log("login!")
    try {
      const { email, password } = req.body;

      // Find user
      const user = await User.findOne({ email });
      if (!user) {
        return res.render('auth/login', { error: 'Invalid email or password' });
      }

      // Check password
      const isValidPassword = await user.comparePassword(password);
      if (!isValidPassword) {
        return res.render('auth/login', { error: 'Invalid email or password' });
      }

      // Set session
      req.session.user = {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      };

      res.redirect('/dashboard');
    } catch (error) {
      console.error('Login error:', error);
      res.render('auth/login', { error: 'Login failed. Please try again.' });
    }
  },

  logout(req, res) {
    req.session.destroy((err) => {
      if (err) {
        console.error('Logout error:', err);
      }
      res.redirect('/');
    });
  }
};

module.exports = authController;