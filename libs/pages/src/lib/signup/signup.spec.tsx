import { render } from '@testing-library/react';
import { useSession } from 'next-auth/react';
import Signup from './signup';

describe('Signup', () => {
    it('should render successfully', () => {
        (useSession as jest.Mock).mockReturnValueOnce({
            data: {},
            status: 'unauthenticated',
        });

        const { baseElement } = render(<Signup />);
        expect(baseElement).toBeTruthy();
    });
});
