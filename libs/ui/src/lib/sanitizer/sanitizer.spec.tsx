import { render, fireEvent } from '@testing-library/react';

import Sanitizer from './sanitizer';

describe('Sanitizer', () => {
    it('should sanitize input on button click', async () => {
        const { getByText, getByLabelText, getByTestId } = render(
            <Sanitizer />
        );
        const input = getByLabelText('xss-input') as HTMLInputElement;
        const button = getByText('Sanitize');

        const xss = [
            '<iframe src="javascript:1+1"></iframe>',
            '-prompt(8)-',
            '-prompt(8)-',
            "'-alert(1)//",
            '<x onmousedown=alert(1)>click this!',
        ];

        xss.forEach((payload) => {
            fireEvent.change(input, {
                target: { value: payload },
            });
            fireEvent.click(button);
            const output = getByTestId('xss-output');
            const expected = getByTestId('react-sanitized');
            expect(output.innerHTML).toBe(expected.innerHTML);
        });
    });
});
