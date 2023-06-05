import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Login from './login';

describe('Login', () => {
    it('should render successfully', () => {
        const { baseElement } = render(<Login />);
        expect(baseElement).toBeTruthy();
    });

    it('should render username and password fields', () => {
        render(<Login />);

        const usernameInput = screen.getByPlaceholderText('Username');
        expect(usernameInput).toBeInTheDocument();

        const passwordInput = screen.getByPlaceholderText('Password');
        expect(passwordInput).toBeInTheDocument();
    });

    it('should render the submit button', () => {
        render(<Login />);

        const submitButton = screen.getByRole('button', { name: /Submit/i });
        expect(submitButton).toBeInTheDocument();
    });

    it('should handle form submission', async () => {
        const onSubmitMock = jest.fn();
        render(<Login onSubmit={onSubmitMock} />);

        const usernameInput = screen.getByPlaceholderText('Username');
        const passwordInput = screen.getByPlaceholderText('Password');
        const submitButton = screen.getByRole('button', { name: /Submit/i });

        userEvent.type(usernameInput, 'testuser');
        userEvent.type(passwordInput, 'testpassword');
        userEvent.click(submitButton);

        await fireEvent.submit(submitButton);

        expect(onSubmitMock).toHaveBeenCalledWith({
            username: 'testuser',
            password: 'testpassword',
        });
    });
});
