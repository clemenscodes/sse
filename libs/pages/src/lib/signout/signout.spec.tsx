import { render } from '@testing-library/react';
import Signout from './signout';
import { useSession } from 'next-auth/react';

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
