const express = require('express');
const { body, validationResult } = require('express-validator');
const router = express.Router();
const Contact = require('../models/Contact');
const validateContactInput = require('../middlewares/validation');

// Create a new contact
router.post('/', validateContactInput, async (req, res) => {
    try {
        const { firstName, lastName, email, phoneNumber, company, jobTitle } = req.body;

        const contact = new Contact({ firstName, lastName, email, phoneNumber, company, jobTitle });

        await contact.save();

        res.status(201).json(contact);
    } catch (error) {
        if (error.code === 11000) {
            res.status(400).json({ message: 'Email/Phone already exists.' });
        } else {
            res.status(500).json({ message: 'Server error', error });
        }
    }
});

// Update a contact
router.put('/:id', validateContactInput, async (req, res) => {
    try {
        const { id } = req.params;
        const updatedData = req.body;

        const contact = await Contact.findByIdAndUpdate(id, updatedData, { new: true });

        if (!contact) {
            return res.status(404).json({ message: 'Contact not found.' });
        }

        res.status(200).json(contact);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
});

// Get all contacts
router.get('/', async (req, res) => {
    try {
        const { page = 1, limit = 3, sortBy = 'firstName', order = 'asc' } = req.query;

        const skip = (page - 1) * limit;
        const contacts = await Contact.find()
            .sort({ [sortBy]: order === 'asc' ? 1 : -1 })
            .skip(parseInt(skip))
            .limit(parseInt(limit));

        const totalContacts = await Contact.countDocuments();

        res.status(200).json({
            contacts,
            total: totalContacts,
            page: parseInt(page),
            limit: parseInt(limit),
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
});

// Delete a contact
router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;

        const contact = await Contact.findByIdAndDelete(id);

        if (!contact) {
            return res.status(404).json({ message: 'Contact not found.' });
        }

        res.status(200).json({ message: 'Contact deleted successfully.' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
});

module.exports = router;
