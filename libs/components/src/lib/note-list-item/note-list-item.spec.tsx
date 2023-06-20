import { render } from '@testing-library/react';
import NoteListItem from './note-list-item';

describe('NoteListItem', () => {
    it('should render successfully', () => {
        const { baseElement } = render(
            <NoteListItem
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
