import type { Meta, StoryObj } from '@storybook/react'
import { PlateEditor } from './PlateEditor'

const meta: Meta<typeof PlateEditor> = {
  component: PlateEditor,
}

export default meta

type Story = StoryObj<typeof meta>

export const Editor: Story = {}
