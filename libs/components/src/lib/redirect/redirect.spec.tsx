import { render } from '@testing-library/react';
import Redirect from './redirect';

describe('Redirect', () => {
    it('should render successfully', () => {
        const { baseElement } = render(<Redirect href={'/'} />);
        expect(baseElement).toBeTruthy();
    });
});
