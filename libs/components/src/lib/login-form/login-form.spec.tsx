import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import LoginForm from './login-form';

describe('LoginForm', () => {
    it('should render successfully', () => {
        const onSubmitMock = jest.fn();
        const { baseElement } = render(<LoginForm submit={onSubmitMock} />);
        expect(baseElement).toBeTruthy();
    });

    it('should render username and password fields', () => {
        const onSubmitMock = jest.fn();
        render(<LoginForm submit={onSubmitMock} />);

        const usernameInput = screen.getByPlaceholderText('Username');
        expect(usernameInput).toBeInTheDocument();

        const passwordInput = screen.getByPlaceholderText('Password');
        expect(passwordInput).toBeInTheDocument();
    });

    it('should render the submit button', () => {
        const onSubmitMock = jest.fn();
        render(<LoginForm submit={onSubmitMock} />);

        const submitButton = screen.getByTestId('Login');
        expect(submitButton).toBeInTheDocument();
    });

    it('should handle form submission', async () => {
        const onSubmitMock = jest.fn();
        render(<LoginForm submit={onSubmitMock} />);

        const usernameInput = screen.getByPlaceholderText('Username');
        const passwordInput = screen.getByPlaceholderText('Password');
        const submitButton = screen.getByTestId('Login');

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
