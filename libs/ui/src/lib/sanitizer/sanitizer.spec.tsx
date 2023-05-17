import { render, fireEvent } from '@testing-library/react';

import Sanitizer from './sanitizer';

describe('Sanitizer', () => {
    it('should sanitize input on button click', async () => {
        const { getByText, getByLabelText, getByTestId } = render(
            <Sanitizer />
        );
        const input = getByLabelText('xss-input') as HTMLInputElement;
        const button = getByText('Sanitize');
        const xss = '<iframe src="javascript:1+1"></iframe>';
        fireEvent.change(input, {
            target: { value: xss },
        });
        fireEvent.click(button);
        const output = getByTestId('xss-output');
        expect(output.innerHTML).not.toBe(xss);
    });
});
