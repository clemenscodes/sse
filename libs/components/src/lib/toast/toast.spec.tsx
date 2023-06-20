import { render } from '@testing-library/react';
import { Toast, ToastProvider } from './toast';

describe('Toast', () => {
    it('should render successfully', () => {
        const { baseElement } = render(<Toast />, { wrapper: ToastProvider });
        expect(baseElement).toBeTruthy();
    });
});
