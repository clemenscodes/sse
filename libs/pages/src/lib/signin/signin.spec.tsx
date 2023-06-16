import { render } from '@testing-library/react';
import { useSession } from 'next-auth/react';
import Signin from './signin';

describe('Signin', () => {
    it('should render successfully', () => {
        (useSession as jest.Mock).mockReturnValueOnce({
            data: {},
            status: 'unauthenticated',
        });
        const { baseElement } = render(<Signin />);
        expect(baseElement).toBeTruthy();
    });
});
