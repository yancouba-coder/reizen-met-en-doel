import Button from './Button';

export default {
    title: 'Atoms/Button',
    component: Button,
    argTypes: {
        variant: {
            control: { type: 'select', options: ['primary', 'secondary', 'outline', 'ghost'] },
        },
        size: {
            control: { type: 'select', options: ['sm', 'md', 'lg'] },
        },
        isLoading: { control: 'boolean' },
        disabled: { control: 'boolean' },
    },
};

const Template = (args) => <Button {...args} />;

export const Primary = Template.bind({});
Primary.args = {
    children: 'Primary Button',
    variant: 'primary',
};

export const Secondary = Template.bind({});
Secondary.args = {
    children: 'Secondary Button',
    variant: 'secondary',
};

export const Outline = Template.bind({});
Outline.args = {
    children: 'Outline Button',
    variant: 'outline',
};

export const Loading = Template.bind({});
Loading.args = {
    children: 'Loading...',
    isLoading: true,
};
