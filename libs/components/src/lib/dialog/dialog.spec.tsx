import { fireEvent, render, screen } from '@testing-library/react';
import { Dialog, DialogContent, DialogTrigger } from './dialog';

describe('Dialog', () => {
    it('should render successfully', () => {
        const { baseElement } = render(
            <Dialog>
                <DialogTrigger>Open Dialog</DialogTrigger>
                <DialogContent>
                    <p>Dialog content</p>
                </DialogContent>
            </Dialog>
        );
        expect(baseElement).toBeTruthy();
    });

    it('should open the dialog', () => {
        render(
            <Dialog>
                <DialogTrigger>Open Dialog</DialogTrigger>
                <DialogContent>
                    <p>Dialog content</p>
                </DialogContent>
            </Dialog>
        );

        // Open the dialog
        fireEvent.click(screen.getByText('Open Dialog'));
        expect(screen.getByText('Dialog content')).toBeInTheDocument();
    });
});
