import { render } from '@testing-library/react';
import RegistrationDialog from './registration-dialog';

describe('RegistrationDialog', () => {
    it('should render successfully', () => {
        const { baseElement } = render(<RegistrationDialog />);
        expect(baseElement).toBeTruthy();
    });
});
