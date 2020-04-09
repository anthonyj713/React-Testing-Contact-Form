import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import ContactForm from './ContactForm';
import MutationObserver from 'mutation-observer';

global.MutationObserver = MutationObserver 

test('text renders', () => {
    const { getByText } = render(<ContactForm />);
     getByText(/first name/i);
     getByText(/last name/i);
     getByText(/email/i);
     getByText(/message/i);
});


test('submit adds new text to the list', () => {
    const { queryByLabelText, getByTestId, getByText } = render(<ContactForm />);
    const firstNameInput = queryByLabelText(/first name/i);
    const lastNameInput = queryByLabelText(/last name/i);
    const emailInput = queryByLabelText(/email/i);
    const messageInput = queryByLabelText(/message/i);

    fireEvent.change(firstNameInput, { target: { value: 'Al'}});
    fireEvent.change(lastNameInput, { target: { value: 'Taco'}});
    fireEvent.change(emailInput, { target: {value: 'bell@email.com'}});
    fireEvent.change(messageInput, { target: { value: 'Bring back the green sauce'}});


    expect(firstNameInput.value).toBe('Al');
    expect(lastNameInput.value).toBe('Taco');
    expect(emailInput.value).toBe('bell@email.com');
    expect(messageInput.value).toBe('Bring back the green sauce');

    fireEvent.click(getByText(/submit/i));

    const firstNameText = getByTestId('Al');
    expect(firstNameText).toBeInTheDocument();
});




