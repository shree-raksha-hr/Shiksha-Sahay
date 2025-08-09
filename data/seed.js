const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const User = require('../models/User');
const Class = require('../models/Class');
const Material = require('../models/Material');

// Connect to MongoDB
mongoose.connect('mongodb+srv://raksha:raksha@cluster0.6djwex5.mongodb.net/tution_support?retryWrites=true&w=majority&appName=Cluster0');

async function seedDatabase() {
  try {
    // Clear existing data
    // await User.deleteMany({});
    // await Class.deleteMany({});
    // await Material.deleteMany({});

    // console.log('Cleared existing data');

    // Create sample users
    const hashedPassword = await bcrypt.hash('password123', 10);

    // Sample School
    const school = new User({
      name: 'Government Primary School, Delhi',
      email: 'school@example.com',
      password: hashedPassword,
      role: 'school',
      schoolName: 'Government Primary School, Delhi',
      phone: '+91-9876543210',
      address: 'Sector 15, Delhi'
    });
    await school.save();

    // Sample Volunteer
    const volunteer = new User({
      name: 'Priya Sharma',
      email: 'volunteer@example.com',
      password: hashedPassword,
      role: 'volunteer',
      subjects: ['Mathematics', 'Science', 'English'],
      phone: '+91-9876543211',
      address: 'Connaught Place, Delhi'
    });
    await volunteer.save();

    // Sample Student
    const student = new User({
      name: 'Rahul Kumar',
      email: 'student@example.com',
      password: hashedPassword,
      role: 'student',
      grade: 8,
      phone: '+91-9876543212',
      address: 'Karol Bagh, Delhi'
    });
    await student.save();

    console.log('Created sample users');

    // Create sample classes
    const sampleClasses = [
      {
        title: 'Basic Algebra and Equations',
        subject: 'Mathematics',
        grade: 8,
        description: 'Introduction to algebraic concepts, solving linear equations, and understanding variables. This class will cover fundamental algebraic operations and problem-solving techniques.',
        date: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000), // 2 days from now
        duration: 60,
        schoolId: school._id,
        status: 'available',
        maxStudents: 25
      },
      {
        title: 'Plant Biology and Photosynthesis',
        subject: 'Science',
        grade: 7,
        description: 'Comprehensive study of plant structure, photosynthesis process, and the role of plants in the ecosystem. Includes practical examples and experiments.',
        date: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000), // 3 days from now
        duration: 75,
        schoolId: school._id,
        status: 'available',
        maxStudents: 30
      },
      {
        title: 'English Grammar and Writing Skills',
        subject: 'English',
        grade: 6,
        description: 'Focus on improving grammar, sentence structure, and creative writing skills. Students will learn proper punctuation, tenses, and essay writing techniques.',
        date: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000), // 1 day from now
        duration: 50,
        schoolId: school._id,
        volunteerId: volunteer._id,
        status: 'booked',
        maxStudents: 20
      }
    ];

    for (const classData of sampleClasses) {
      const newClass = new Class(classData);
      await newClass.save();
    }

    console.log('Created sample classes');

    // Create sample learning materials
    const sampleMaterials = [
      {
        title: 'Introduction to Fractions',
        subject: 'Mathematics',
        grade: 5,
        type: 'text',
        content: `
          <h2>Understanding Fractions</h2>
          <p>A fraction represents a part of a whole. It consists of two numbers:</p>
          <ul>
            <li><strong>Numerator:</strong> The top number that shows how many parts we have</li>
            <li><strong>Denominator:</strong> The bottom number that shows how many equal parts the whole is divided into</li>
          </ul>
          
          <h3>Examples:</h3>
          <p>1/2 means 1 out of 2 equal parts</p>
          <p>3/4 means 3 out of 4 equal parts</p>
          
          <h3>Types of Fractions:</h3>
          <ol>
            <li><strong>Proper Fractions:</strong> Numerator is smaller than denominator (1/2, 3/5)</li>
            <li><strong>Improper Fractions:</strong> Numerator is larger than or equal to denominator (5/3, 7/7)</li>
            <li><strong>Mixed Numbers:</strong> A whole number and a fraction combined (2 1/3)</li>
          </ol>
          
          <h3>Practice Problems:</h3>
          <p>1. What fraction of the pizza is eaten if 3 out of 8 slices are consumed?</p>
          <p>2. Convert 7/4 to a mixed number.</p>
          <p>3. Which is larger: 2/3 or 3/5?</p>
        `,
        description: 'A comprehensive guide to understanding fractions, their types, and basic operations. Perfect for grade 5 students beginning their fraction journey.',
        uploadedBy: volunteer._id,
        tags: ['fractions', 'basic math', 'numerator', 'denominator']
      },
      {
        title: 'The Water Cycle',
        subject: 'Science',
        grade: 6,
        type: 'video',
        content: 'https://www.youtube.com/embed/al-do-HGuIk',
        description: 'Learn about the water cycle through this engaging video explanation. Covers evaporation, condensation, precipitation, and collection processes.',
        uploadedBy: volunteer._id,
        tags: ['water cycle', 'evaporation', 'precipitation', 'environment']
      },
      {
        title: 'English Phonics Practice',
        subject: 'English',
        grade: 3,
        type: 'audio',
        content: '/audio/phonics-practice.mp3',
        description: 'Audio lessons for practicing English phonics and pronunciation. Helps students improve their reading and speaking skills.',
        uploadedBy: volunteer._id,
        tags: ['phonics', 'pronunciation', 'reading', 'speaking']
      },
      {
        title: 'Ancient Indian History',
        subject: 'Social Studies',
        grade: 7,
        type: 'text',
        content: `
          <h2>The Mauryan Empire</h2>
          <p>The Mauryan Empire was one of the largest empires in ancient India, founded by Chandragupta Maurya around 321 BCE.</p>
          
          <h3>Key Rulers:</h3>
          <ul>
            <li><strong>Chandragupta Maurya (321-297 BCE):</strong> Founder of the empire</li>
            <li><strong>Bindusara (297-273 BCE):</strong> Expanded the empire</li>
            <li><strong>Ashoka the Great (273-232 BCE):</strong> Most famous ruler, promoted Buddhism</li>
          </ul>
          
          <h3>Ashoka's Contributions:</h3>
          <p>Emperor Ashoka is remembered for:</p>
          <ol>
            <li>Promoting non-violence (Ahimsa)</li>
            <li>Spreading Buddhism across Asia</li>
            <li>Building hospitals and schools</li>
            <li>Creating a network of roads</li>
            <li>Establishing trade relations with other countries</li>
          </ol>
          
          <h3>The Edicts of Ashoka:</h3>
          <p>Ashoka issued edicts (royal orders) carved on rocks and pillars throughout his empire. These edicts promoted moral values, religious tolerance, and good governance.</p>
          
          <blockquote>
            "All men are my children. Just as I desire that my children should enjoy all prosperity, so do I desire for all men."
            <footer>- Emperor Ashoka</footer>
          </blockquote>
        `,
        description: 'Comprehensive study material about the Mauryan Empire and Emperor Ashoka\'s contributions to Indian history and culture.',
        uploadedBy: volunteer._id,
        tags: ['mauryan empire', 'ashoka', 'ancient india', 'buddhism']
      },
      {
        title: 'Basic Computer Operations',
        subject: 'Computer Science',
        grade: 8,
        type: 'text',
        content: `
          <h2>Introduction to Computers</h2>
          <p>A computer is an electronic device that processes data and performs calculations according to a set of instructions called programs.</p>
          
          <h3>Parts of a Computer:</h3>
          <ul>
            <li><strong>Input Devices:</strong> Keyboard, Mouse, Microphone</li>
            <li><strong>Output Devices:</strong> Monitor, Printer, Speakers</li>
            <li><strong>Processing Unit:</strong> CPU (Central Processing Unit)</li>
            <li><strong>Storage Devices:</strong> Hard Disk, RAM, USB Drive</li>
          </ul>
          
          <h3>Basic Operations:</h3>
          <ol>
            <li><strong>Input:</strong> Entering data into the computer</li>
            <li><strong>Processing:</strong> Computer works on the data</li>
            <li><strong>Output:</strong> Results are displayed or printed</li>
            <li><strong>Storage:</strong> Saving data for future use</li>
          </ol>
          
          <h3>Operating System:</h3>
          <p>The Operating System (OS) is the main software that manages computer hardware and software resources. Popular operating systems include:</p>
          <ul>
            <li>Windows</li>
            <li>macOS</li>
            <li>Linux</li>
            <li>Android (for mobile devices)</li>
          </ul>
          
          <h3>File Management:</h3>
          <p>Files are organized in folders. Basic file operations include:</p>
          <ul>
            <li>Creating files and folders</li>
            <li>Copying and moving files</li>
            <li>Renaming files</li>
            <li>Deleting files</li>
          </ul>
        `,
        description: 'Basic introduction to computers, their components, and fundamental operations. Ideal for students beginning computer studies.',
        uploadedBy: volunteer._id,
        tags: ['computer basics', 'hardware', 'software', 'operating system']
      }
    ];

    for (const materialData of sampleMaterials) {
      const material = new Material(materialData);
      await material.save();
    }

    console.log('Created sample learning materials');

    console.log('\nSample Data Created Successfully!');
    console.log('\nLogin Credentials:');
    console.log('School: school@example.com / password123');
    console.log('Volunteer: volunteer@example.com / password123');
    console.log('Student: student@example.com / password123');

  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    mongoose.connection.close();
  }
}

seedDatabase();