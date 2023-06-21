import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import RegisterForm from './register-form';

describe('Register', () => {
    it('should render successfully', () => {
        const { baseElement } = render(<RegisterForm />);
        expect(baseElement).toBeTruthy();
    });

    it('should display validation errors when form fields are empty', async () => {
        render(<RegisterForm />);
        fireEvent.click(screen.getByTestId('Register'));

        await waitFor(() => {
            expect(
                screen.getByText('Username must be at least 2 characters.')
            ).toBeInTheDocument();
            expect(
                screen.getByText('Please provide a valid email.')
            ).toBeInTheDocument();
            expect(
                screen.getByText('Password must be at least 8 characters.')
            ).toBeInTheDocument();
        });
    });

    it('should submit form when all fields are filled correctly', async () => {
        const onSubmitMock = jest.fn();
        render(<RegisterForm submit={onSubmitMock} />);
        const password = 'testPassword123!ahg';

        fireEvent.input(screen.getByPlaceholderText('Username'), {
            target: {
                value: 'testUser',
            },
        });

        fireEvent.input(screen.getByPlaceholderText('Email'), {
            target: {
                value: 'testuser@test.com',
            },
        });

        fireEvent.input(screen.getByPlaceholderText('Password'), {
            target: {
                value: password,
            },
        });

        fireEvent.input(screen.getByPlaceholderText('Confirm Password'), {
            target: {
                value: password,
            },
        });

        fireEvent.click(screen.getByTestId('Register'));

        await waitFor(() => {
            expect(onSubmitMock).toHaveBeenCalledWith({
                username: 'testUser',
                email: 'testuser@test.com',
                password: password,
                passwordConfirm: password,
            });
        });
    });
});
