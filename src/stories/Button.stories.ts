import type { Meta, StoryObj } from '@storybook/react'

import { Button } from './Button'

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof Button> = {
  component: Button,
  tags: ['autodocs'],
  argTypes: {
    backgroundColor: { control: 'color' },
  },
}

export default meta

type Story = StoryObj<typeof meta>

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Primary: Story = {
  args: {
    primary: true,
    children: 'Button',
  },
}

export const Secondary: Story = {
  args: {
    children: 'Button',
  },
} as const

export const Large: Story = {
  args: {
    size: 'large',
    children: 'Button',
  },
} as const

export const Small: Story = {
  args: {
    size: 'small',
    children: 'Button',
  },
} as const
