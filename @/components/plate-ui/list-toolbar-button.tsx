import { ELEMENT_UL, useListToolbarButton, useListToolbarButtonState } from '@udecode/plate-list'

import { Icons } from './icons'

import { ToolbarButton } from './toolbar'

export function ListToolbarButton({ nodeType = ELEMENT_UL }: { readonly nodeType?: string }) {
  const state = useListToolbarButtonState({ nodeType })
  const { props } = useListToolbarButton(state)

  return (
    <ToolbarButton tooltip={nodeType === ELEMENT_UL ? 'Bulleted List' : 'Numbered List'} {...props}>
      {nodeType === ELEMENT_UL ? <Icons.ul /> : <Icons.ol />}
    </ToolbarButton>
  )
}
