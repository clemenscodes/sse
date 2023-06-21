import { render } from '@testing-library/react';
import { Tooltip, TooltipProvider } from './tooltip';

describe('Tooltip', () => {
    it('should render successfully', () => {
        const { baseElement } = render(<Tooltip />, {
            wrapper: TooltipProvider,
        });
        expect(baseElement).toBeTruthy();
    });
});
