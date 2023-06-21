import { render } from '@testing-library/react';
import Mynotes from './mynotes';

describe('Mynotes', () => {
    it('should render successfully', () => {
        const { baseElement } = render(<Mynotes />);
        expect(baseElement).toBeTruthy();
    });
});
