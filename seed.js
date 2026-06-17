const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./models/User');
const Doctor = require('./models/Doctor');
const Patient = require('./models/Patient');
const Appointment = require('./models/Appointment');
const Prescription = require('./models/Prescription');

dotenv.config();

const seedData = async () => {
  try {
    // Connect to database
    await mongoose.connect(
      process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/hospital-management'
    );
    console.log('MongoDB connected for seeding...');

    // Clear existing data
    await User.deleteMany();
    await Doctor.deleteMany();
    await Patient.deleteMany();
    await Appointment.deleteMany();
    await Prescription.deleteMany();
    console.log('Cleared existing records.');

    // 1. Create Admin
    const adminUser = await User.create({
      name: 'System Admin',
      email: 'admin@healthhub.com',
      password: 'adminpassword',
      role: 'admin',
    });
    console.log('Admin user created: admin@healthhub.com / adminpassword');

    // 2. Create Doctor
    const doctorUser = await User.create({
      name: 'Robert Carter',
      email: 'doctor@healthhub.com',
      password: 'doctorpassword',
      role: 'doctor',
    });
    const doctorProfile = await Doctor.create({
      user: doctorUser._id,
      specialization: 'Cardiologist',
      contactNumber: '+1 (555) 019-8833',
      availability: { start: '09:00', end: '17:00' },
      status: 'active',
    });
    console.log('Doctor user created: doctor@healthhub.com / doctorpassword');

    // 3. Create Patient
    const patientUser = await User.create({
      name: 'Sarah Jenkins',
      email: 'patient@healthhub.com',
      password: 'patientpassword',
      role: 'patient',
    });
    const patientProfile = await Patient.create({
      user: patientUser._id,
      dateOfBirth: new Date('1990-05-15'),
      gender: 'Female',
      bloodGroup: 'A+',
      contactNumber: '+1 (555) 012-3456',
      address: '789 Pine Lane, Seattle, WA',
      medicalHistory: [
        {
          condition: 'Mild Asthma',
          notes: 'Diagnosed in childhood, managed with albuterol inhaler PRN.',
        },
      ],
      status: 'discharged',
    });
    console.log('Patient user created: patient@healthhub.com / patientpassword');

    // 4. Create an Appointment
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    
    await Appointment.create({
      patient: patientProfile._id,
      doctor: doctorProfile._id,
      date: tomorrow,
      timeSlot: '10:30',
      status: 'pending',
      reason: 'Routine cardiovascular evaluation and asthma checkup.',
    });
    console.log('Initial appointment seeded for tomorrow at 10:30.');

    console.log('Seeding completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Seeding failed:', error);
    process.exit(1);
  }
};

seedData();
