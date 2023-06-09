import { render } from '@testing-library/react';
import Signout from './signout';

describe('Signout', () => {
    it('should render successfully', () => {
        const { baseElement } = render(<Signout />);
        expect(baseElement).toBeTruthy();
    });
});
