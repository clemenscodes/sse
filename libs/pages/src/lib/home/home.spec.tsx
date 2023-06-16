import { render } from '@testing-library/react';
import { SessionProvider } from 'next-auth/react';
import Home from './home';

describe('Home', () => {
    it('should render successfully', () => {
        const { baseElement } = render(<Home />, { wrapper: SessionProvider });
        expect(baseElement).toBeTruthy();
    });
});
