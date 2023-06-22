import { render } from '@testing-library/react';
import Consent from './consent';

describe('Consent', () => {
    it('should render successfully', () => {
        const { baseElement } = render(<Consent>Consented</Consent>);
        expect(baseElement).toBeTruthy();
    });
});
