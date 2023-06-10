import { render } from '@testing-library/react';
import { useSession } from 'next-auth/react';
import Signout from './signout';

describe('Signout', () => {
    it('should render successfully', () => {
        (useSession as jest.Mock).mockReturnValueOnce({
            data: {},
            status: 'unauthenticated',
        });
        const { baseElement } = render(<Signout />);
        expect(baseElement).toBeTruthy();
    });
});
