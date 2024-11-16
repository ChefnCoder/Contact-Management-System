import React from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    IconButton,
    Card,
    CardContent,
    Typography,
    Box,
    Button,
    Tooltip,
} from '@mui/material';
import { Edit, Delete, ArrowUpward, ArrowDownward } from '@mui/icons-material';

const ContactTable = ({ contacts, onEdit, onDelete, onSort, onPaginate, pagination, sortBy, order }) => {
    const handleSort = (column) => {
        const newOrder = sortBy === column && order === 'asc' ? 'desc' : 'asc';
        onSort(column, newOrder);
    };

    const handlePageChange = (newPage) => {
        if (newPage > 0 && newPage <= Math.ceil(pagination.total / pagination.limit)) {
            onPaginate(newPage);
        }
    };

    return (
        <Card sx={{ margin: 2, backgroundColor: '#f7f7f7' }}>
            <CardContent>
                <Typography variant="h5" gutterBottom color="primary">
                    Contacts List
                </Typography>
                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow>
                                {['firstName', 'lastName', 'email', 'phoneNumber'].map((column) => (
                                    <TableCell key={column} onClick={() => handleSort(column)} sx={{ cursor: 'pointer' }}>
                                        <Tooltip title={`Sort by ${column}`} arrow>
                                            <Typography>
                                                {column.charAt(0).toUpperCase() + column.slice(1)}
                                                {sortBy === column && (
                                                    order === 'asc' ? (
                                                        <ArrowUpward fontSize="small" />
                                                    ) : (
                                                        <ArrowDownward fontSize="small" />
                                                    )
                                                )}
                                            </Typography>
                                        </Tooltip>
                                    </TableCell>
                                ))}
                                <TableCell>Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {contacts.length > 0 ? (
                                contacts.map((contact, index) => (
                                    <TableRow
                                        key={contact._id}
                                        sx={{
                                            backgroundColor:'#f0f0f0',
                                            '&:hover': { backgroundColor: '#e0e0e0' },
                                        }}
                                    >
                                        <TableCell>{contact.firstName}</TableCell>
                                        <TableCell>{contact.lastName}</TableCell>
                                        <TableCell>{contact.email}</TableCell>
                                        <TableCell>{contact.phoneNumber}</TableCell>
                                        <TableCell>
                                            <IconButton onClick={() => onEdit(contact)}>
                                                <Edit />
                                            </IconButton>
                                            <IconButton onClick={() => onDelete(contact._id)}>
                                                <Delete />
                                            </IconButton>
                                        </TableCell>
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell colSpan={5} align="center">
                                        <Typography variant="subtitle1" color="textSecondary">
                                            No contacts found. Add some to get started!
                                        </Typography>
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
                <Box display="flex" justifyContent="center" m={2}>
                    <Button onClick={() => handlePageChange(pagination.page - 1)} disabled={pagination.page === 1}>
                        Previous
                    </Button>
                    <Typography variant="body2" sx={{ padding: '0 16px' }}>
                        {`Page ${pagination.page} of ${Math.ceil(pagination.total / pagination.limit)}`}
                    </Typography>
                    <Button
                        onClick={() => handlePageChange(pagination.page + 1)}
                        disabled={pagination.page === Math.ceil(pagination.total / pagination.limit)}
                    >
                        Next
                    </Button>
                </Box>
            </CardContent>
        </Card>
    );
};

export default ContactTable;
