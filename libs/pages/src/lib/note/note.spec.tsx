import { render } from '@testing-library/react';
import Note from './note';

describe('Note', () => {
    it('should render successfully', () => {
        const { baseElement } = render(
            <Note
                note={{
                    id: 'id',
                    content: 'Test',
                    isPublic: false,
                }}
            />
        );
        expect(baseElement).toBeTruthy();
    });
});
