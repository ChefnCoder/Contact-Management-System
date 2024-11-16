import React, { useEffect, useState } from 'react';
import ContactForm from '../components/ContactForm';
import ContactTable from '../components/ContactTable';
import API from '../services/api';
import Navbar from '../components/Navbar'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const HomePage = () => {
    const [contacts, setContacts] = useState([]);
    const [editingContact, setEditingContact] = useState(null);

    const [pagination, setPagination] = useState({ total: 0, page: 1, limit: 10 });
    const [sort, setSort] = useState({ sortBy: 'firstName', order: 'asc' });

    const fetchContacts = async (page = 1, limit = 10, sortBy = 'firstName', order = 'asc') => {
        try {
            const { data } = await API.get('/contacts', {
                params: { page, limit, sortBy, order },
            });
            setContacts(data.contacts);
            setPagination({
                total: data.total,
                page: data.page,
                limit: data.limit,
            });
            setSort({ sortBy, order });
        } catch (error) {
            console.error('Failed to fetch contacts:', error);
        }
    };
    
    const handleEditContact = (contact) => {
        setEditingContact(contact);
    };

    const handleAddOrUpdateContact = async (contact) => {
        try {
            if (editingContact) {
                await API.put(`/contacts/${editingContact._id}`, contact);
                toast.success('Contact updated successfully!');
            } else {
                await API.post('/contacts', contact);
                toast.success('Contact added successfully!');
            }
            fetchContacts();
            setEditingContact(null);
        } catch (error) {
            toast.error('Failed to save contact. Please try again.');
            console.error('Failed to add/update contact:', error);
        }
    };
    
    const handleDeleteContact = async (id) => {
        try {
            await API.delete(`/contacts/${id}`);
            toast.success('Contact deleted successfully!');
            fetchContacts();
        } catch (error) {
            toast.error('Failed to delete contact. Please try again.');
            console.error('Failed to delete contact:', error);
        }
    };
    

    useEffect(() => {
        fetchContacts();
    }, []);

    return (
        <div>
            <Navbar/>
            <ContactForm onSubmit={handleAddOrUpdateContact} initialData={editingContact || {}} />
            <ContactTable
                contacts={contacts}
                onEdit={handleEditContact}
                onDelete={handleDeleteContact}
                onSort={(sortBy, order) => fetchContacts(pagination.page, pagination.limit, sortBy, order)}
                onPaginate={(page) => fetchContacts(page, pagination.limit, sort.sortBy, sort.order)}
                pagination={pagination}
                sortBy={sort.sortBy}
                order={sort.order}
            />
            <ToastContainer />


        </div>
    );
};

export default HomePage;
