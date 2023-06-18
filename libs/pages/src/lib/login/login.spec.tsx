import { render } from '@testing-library/react';
import { useSession } from 'next-auth/react';
import Login from './login';

describe('Signin', () => {
    it('should render successfully', () => {
        (useSession as jest.Mock).mockReturnValueOnce({
            data: {},
            status: 'unauthenticated',
        });
        const { baseElement } = render(<Login />);
        expect(baseElement).toBeTruthy();
    });
});
