import type { Meta, StoryObj } from '@storybook/react';

import Button from '../../ui/Button';

const meta = {
  title: 'Components/Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'Button',
    type: 'button',
    theme: 'light',
    className: [],
  },
};
