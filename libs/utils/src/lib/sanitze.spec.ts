import { sanitize} from './sanitize';

describe('sanitize', () => {
    it('should sanitize', () => {
        expect(sanitize("<bad html>")).toEqual('');
    });
});
