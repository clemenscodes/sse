import { fireEvent, render, screen } from '@testing-library/react';
import { Dialog, DialogContent, DialogTrigger } from './dialog';

describe('Dialog', () => {
    it('should render successfully', () => {
        const { baseElement } = render(
            <Dialog>
                <DialogTrigger>
                    <button>Open Dialog</button>
                </DialogTrigger>
                <DialogContent>
                    <p>Dialog content</p>
                </DialogContent>
            </Dialog>
        );
        expect(baseElement).toBeTruthy();
    });

    it('should open and close the dialog when trigger and close buttons are clicked', () => {
        render(
            <Dialog>
                <DialogTrigger>
                    <button>Open Dialog</button>
                </DialogTrigger>
                <DialogContent>
                    <p>Dialog content</p>
                </DialogContent>
            </Dialog>
        );

        // Open the dialog
        fireEvent.click(screen.getByText('Open Dialog'));
        expect(screen.getByText('Dialog content')).toBeInTheDocument();

        // Close the dialog
        fireEvent.click(screen.getByTitle('Close'));
        expect(screen.queryByText('Dialog content')).not.toBeInTheDocument();
    });
});
