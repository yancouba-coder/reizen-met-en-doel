import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import ChildCard from './ChildCard';
import { I18nextProvider } from 'react-i18next';
import i18n from '../../i18n/i18n';

export default {
    title: 'Molecules/ChildCard',
    component: ChildCard,
    decorators: [
        (Story) => (
            <I18nextProvider i18n={i18n}>
                <BrowserRouter>
                    <div className="max-w-sm">
                        <Story />
                    </div>
                </BrowserRouter>
            </I18nextProvider>
        ),
    ],
};

const Template = (args) => <ChildCard {...args} />;

export const Default = Template.bind({});
Default.args = {
    child: {
        id: '1',
        firstName: 'Sarah',
        age: 8,
        village: 'Hope Village',
        shortStory: 'Sarah loves to read and wants to be a teacher when she grows up.',
        priority: 'normal',
        status: 'waiting',
        photos: ['https://images.unsplash.com/photo-1519238263496-6360274a3d48?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80'],
    },
};

export const Urgent = Template.bind({});
Urgent.args = {
    child: {
        ...Default.args.child,
        priority: 'urgent',
        firstName: 'David',
    },
};

export const Sponsored = Template.bind({});
Sponsored.args = {
    child: {
        ...Default.args.child,
        status: 'sponsored',
        firstName: 'Emma',
    },
};
