import { render } from '@testing-library/react';
import Register from './register';

describe('Signup', () => {
    it('should render successfully', () => {
        const { baseElement } = render(<Register />);
        expect(baseElement).toBeTruthy();
    });
});
