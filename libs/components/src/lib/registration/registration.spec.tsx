import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import Register from './registration';

describe('Register', () => {
    it('should render successfully', () => {
        const { baseElement } = render(<Register />);
        expect(baseElement).toBeTruthy();
    });

    it('should display validation errors when form fields are empty', async () => {
        render(<Register />);

        fireEvent.click(screen.getByText('Register'));

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
        render(<Register submit={onSubmitMock} />);

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
                value: 'testPassword123!',
            },
        });

        fireEvent.input(screen.getByPlaceholderText('Confirm Password'), {
            target: {
                value: 'testPassword123!',
            },
        });

        fireEvent.click(screen.getByText('Register'));

        await waitFor(() => {
            expect(onSubmitMock).toHaveBeenCalledWith({
                username: 'testUser',
                email: 'testuser@test.com',
                password: 'testPassword123!',
                passwordConfirm: 'testPassword123!',
            });
        });
    });
});
