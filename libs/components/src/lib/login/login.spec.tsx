import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Login from './login';

describe('Login', () => {
    it('should render successfully', () => {
        const onSubmitMock = jest.fn();
        const { baseElement } = render(<Login submit={onSubmitMock} />);
        expect(baseElement).toBeTruthy();
    });

    it('should render username and password fields', () => {
        const onSubmitMock = jest.fn();
        render(<Login submit={onSubmitMock} />);

        const usernameInput = screen.getByPlaceholderText('Username');
        expect(usernameInput).toBeInTheDocument();

        const passwordInput = screen.getByPlaceholderText('Password');
        expect(passwordInput).toBeInTheDocument();
    });

    it('should render the submit button', () => {
        const onSubmitMock = jest.fn();
        render(<Login submit={onSubmitMock} />);

        const submitButton = screen.getByRole('button', { name: /Submit/i });
        expect(submitButton).toBeInTheDocument();
    });

    it('should handle form submission', async () => {
        const onSubmitMock = jest.fn();
        render(<Login submit={onSubmitMock} />);

        const usernameInput = screen.getByPlaceholderText('Username');
        const passwordInput = screen.getByPlaceholderText('Password');
        const submitButton = screen.getByRole('button', { name: /Submit/i });

        await userEvent.type(usernameInput, 'testuser');
        await userEvent.type(passwordInput, 'testPassword1');
        fireEvent.submit(submitButton);

        await waitFor(() => {
            expect(onSubmitMock).toHaveBeenCalledWith({
                username: 'testuser',
                password: 'testPassword1',
            });
        });
    });
});
