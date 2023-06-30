import { render } from '@testing-library/react';
import NoteList from './note-list';

describe('NoteList', () => {
    it('should render successfully', () => {
        const { baseElement } = render(
            <NoteList
                notes={[
                    {
                        id: 'id',
                        content: 'Test',
                        isPublic: false,
                    },
                ]}
            />
        );
        expect(baseElement).toBeTruthy();
    });
});
