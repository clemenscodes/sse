import { render } from '@testing-library/react';
import { CreateNote } from './create-note';

describe('Note', () => {
    it('should render successfully', () => {
        const { baseElement } = render(<CreateNote />);
        expect(baseElement).toBeTruthy();
    });
});
