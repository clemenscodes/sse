import { render } from '@testing-library/react';
import Search from './search';

describe('Search', () => {
    it('should render successfully', () => {
        const { baseElement } = render(
            <Search
                search={'Test search query that can even contain XSS'}
                result={[]}
            />
        );
        expect(baseElement).toBeTruthy();
    });
});
