import { render } from '@testing-library/react';
import EmailSent from './email-sent';

describe('EmailSent', () => {
    it('should render successfully', () => {
        const { baseElement } = render(<EmailSent />);
        expect(baseElement).toBeTruthy();
    });
});
