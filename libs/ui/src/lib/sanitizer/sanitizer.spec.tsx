import { render } from '@testing-library/react';

import Sanitizer from './sanitizer';

describe('Sanitizer', () => {
    it('should render successfully', () => {
        const { baseElement } = render(<Sanitizer />);
        expect(baseElement).toBeTruthy();
    });
});
