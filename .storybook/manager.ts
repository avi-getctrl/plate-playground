import { addons } from '@storybook/manager-api'
import { create } from '@storybook/theming/create'

import reactLogoUrl from '../src/assets/react.svg'

export const theme = create({
  base: 'dark',
  brandTitle: 'Test storybook',
  brandUrl: 'https://app.getctrl.co',
  brandImage: reactLogoUrl,
})

addons.setConfig({
  theme,
  panelPosition: 'right',
  sidebar: {
    showRoots: true,
  },
})
