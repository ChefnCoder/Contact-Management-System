import React, { useState, useEffect } from 'react';
import { TextField, Button, Card, CardContent, Typography, Grid, Divider } from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';

const ContactForm = ({ onSubmit, initialData = {} }) => {
    const [contact, setContact] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: '',
        company: '',
        jobTitle: '',
    });

    useEffect(() => {
        setContact({
            firstName: initialData.firstName || '',
            lastName: initialData.lastName || '',
            email: initialData.email || '',
            phoneNumber: initialData.phoneNumber || '',
            company: initialData.company || '',
            jobTitle: initialData.jobTitle || '',
        });
    }, [initialData]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setContact((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(contact);
    };

    return (
        <Card sx={{ margin: 2, padding: 2, backgroundColor: '#f7f7f7' }}>
            <CardContent>
                <Typography variant="h5" gutterBottom color="primary">
                    {initialData._id ? 'Edit Contact' : 'Add New Contact'}
                </Typography>
                <Divider sx={{ marginBottom: 2 }} />
                <form onSubmit={handleSubmit}>
                    <Typography variant="subtitle1" gutterBottom>
                        Personal Information
                    </Typography>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                name="firstName"
                                label="First Name"
                                value={contact.firstName}
                                onChange={handleChange}
                                fullWidth
                                required
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                name="lastName"
                                label="Last Name"
                                value={contact.lastName}
                                onChange={handleChange}
                                fullWidth
                                required
                            />
                        </Grid>
                    </Grid>
                    <Typography variant="subtitle1" gutterBottom sx={{ marginTop: 2 }}>
                        Contact Details
                    </Typography>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                name="email"
                                label="Email"
                                type="email"
                                value={contact.email}
                                onChange={handleChange}
                                fullWidth
                                required
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                name="phoneNumber"
                                label="Phone Number"
                                value={contact.phoneNumber}
                                onChange={handleChange}
                                fullWidth
                                required
                            />
                        </Grid>
                    </Grid>
                    <Typography variant="subtitle1" gutterBottom sx={{ marginTop: 2 }}>
                        Professional Information
                    </Typography>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                name="company"
                                label="Company"
                                value={contact.company}
                                onChange={handleChange}
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                name="jobTitle"
                                label="Job Title"
                                value={contact.jobTitle}
                                onChange={handleChange}
                                fullWidth
                            />
                        </Grid>
                    </Grid>
                    <Grid container spacing={2} sx={{ marginTop: 2 }}>
                        <Grid item xs={12}>
                            <Button
                                type="submit"
                                variant="contained"
                                color="primary"
                                startIcon={<SaveIcon />}
                                fullWidth
                            >
                                {initialData._id ? 'Update Contact' : 'Save Contact'}
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </CardContent>
        </Card>
    );
};

export default ContactForm;
