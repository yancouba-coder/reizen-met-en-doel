import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import ChildCard from './ChildCard';
import { I18nextProvider } from 'react-i18next';
import i18n from '../../i18n/i18n'; // Import the real i18n instance or mock it

// Mock child data
const mockChild = {
    id: '123',
    firstName: 'John',
    age: 10,
    village: 'Test Village',
    shortStory: 'A short story about John.',
    priority: 'urgent',
    status: 'waiting',
    photos: ['http://example.com/photo.jpg'],
};

const renderWithProviders = (ui) => {
    return render(
        <I18nextProvider i18n={i18n}>
            <BrowserRouter>
                {ui}
            </BrowserRouter>
        </I18nextProvider>
    );
};

describe('ChildCard', () => {
    it('renders child information correctly', () => {
        renderWithProviders(<ChildCard child={mockChild} />);

        expect(screen.getByText('John, 10')).toBeInTheDocument();
        expect(screen.getByText('Test Village')).toBeInTheDocument();
        expect(screen.getByText('A short story about John.')).toBeInTheDocument();
        expect(screen.getByText('Urgent')).toBeInTheDocument(); // Assuming 'urgent' translation key returns 'Urgent' or similar
    });

    it('renders sponsor button', () => {
        renderWithProviders(<ChildCard child={mockChild} />);
        expect(screen.getByRole('button', { name: /sponsor this child/i })).toBeInTheDocument();
    });
});
