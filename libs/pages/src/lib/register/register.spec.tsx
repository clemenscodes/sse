import { render } from '@testing-library/react';
import { useSession } from 'next-auth/react';
import Register from './register';

describe('Signup', () => {
    it('should render successfully', () => {
        (useSession as jest.Mock).mockReturnValueOnce({
            data: {},
            status: 'unauthenticated',
        });

        const { baseElement } = render(<Register />);
        expect(baseElement).toBeTruthy();
    });
});
