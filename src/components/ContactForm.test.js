import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import {render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import ContactForm from './ContactForm';

test('renders without errors', ()=>{
    render(<ContactForm />);
});

test('renders the contact form header', ()=> {
    render(<ContactForm />);
    const contactFormHeader = screen.getByText(/contact form/i);
    
    expect(contactFormHeader).toBeInTheDocument();
    expect(contactFormHeader).toBeTruthy();
});

test('renders ONE error message if user enters less then 5 characters into firstname.', async () => {
    render(<ContactForm />);
   
    const firstName = screen.getByPlaceholderText('Edd');
    userEvent.type(firstName, 'Lore');
    const shortFirstNameErrors = await screen.findAllByText(/error/i);

    expect(shortFirstNameErrors.length).toBe(1);
});

test('renders THREE error messages if user enters no values into any fields.', async () => {
    render(<ContactForm />);

    const submitButton = screen.getByRole('button');
    userEvent.click(submitButton);
    const emptyFieldsErrors = await screen.findAllByText(/error/i);
 
    expect(emptyFieldsErrors.length).toBe(3);
});

test('renders ONE error message if user enters a valid first name and last name but no email.', async () => {
    render(<ContactForm />);

    const firstName = screen.getByPlaceholderText('Edd');
    userEvent.type(firstName, 'Lorem');
    const lastName = screen.getByPlaceholderText('Burke');
    userEvent.type(lastName, 'Ipsum');
    const submitButton = screen.getByRole('button');
    userEvent.click(submitButton);
    const allErrors = await screen.findAllByText(/error/i);
    
    expect(allErrors.length).toBe(1);
});

test('renders "email must be a valid email address" if an invalid email is entered', async () => {
    render(<ContactForm />);
    
    const emailField = screen.getByPlaceholderText('bluebill1049@hotmail.com');
    userEvent.type(emailField, 'lorem@ipsum.dolor');
    const validEmailError = screen.getByText(/email must be a valid email address/);

    expect(validEmailError).toBeInTheDocument();
});

test('renders "lastName is a required field" if an last name is not entered and the submit button is clicked', async () => {

});

test('renders all firstName, lastName and email text when submitted. Does NOT render message if message is not submitted.', async () => {
    render(<ContactForm />);
    
    const emailField = screen.getByPlaceholderText('bluebill1049@hotmail.com');
    userEvent.type(emailField, 'lorem@ipsum.dolor');
    const validEmailError = screen.getByText(/email must be a valid email address/);

    expect(validEmailError).toBeInTheDocument();
});

test('renders all fields text when all fields are submitted.', async () => {
    render(<ContactForm />);

    const firstName = screen.getByPlaceholderText('Edd');
    userEvent.type(firstName, 'Bill');
    const lastName = screen.getByPlaceholderText('Burke');
    userEvent.type(lastName, 'Gates');
    const emailField = screen.getByPlaceholderText('bluebill1049@hotmail.com');
    userEvent.type(emailField, 'bill@micro.soft');
    const messageField = screen.getByLabelText('Message');
    userEvent.type(messageField, 'update your windowssss toooo ms dossssssss');
    const submitButton = screen.getByRole('button');
    userEvent.click(submitButton);
    const firstNameElement = screen.getByText('Bill');
    const lastNameElement = screen.getByText('Gates');
    const emailElement = screen.getByText('bill@micro.soft');
    const messageElement = screen.getByText('update your windowssss toooo ms dossssssss');

    expect(firstNameElement).toBeInTheDocument();
    expect(lastNameElement).toBeInTheDocument();
    expect(emailElement).toBeInTheDocument();
    expect(messageElement).toBeInTheDocument();
});