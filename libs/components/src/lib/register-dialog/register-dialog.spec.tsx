import { render } from '@testing-library/react';
import RegisterDialog from '../register-dialog/register-dialog';

describe('RegisterDialog', () => {
    it('should render successfully', () => {
        const { baseElement } = render(<RegisterDialog />);
        expect(baseElement).toBeTruthy();
    });
});
