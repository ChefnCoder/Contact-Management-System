const mongoose = require('mongoose');

// Define the Contact schema
const ContactSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    phoneNumber: {
        type: String,
        required: true,
        unique: true,
    },
    company: {
        type: String,
    },
    jobTitle: {
        type: String,
    },
}, { timestamps: true });

// Create the model
const Contact = mongoose.model('Contact', ContactSchema);

module.exports = Contact;
