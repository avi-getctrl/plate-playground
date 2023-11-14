import { useMarkToolbarButton, useMarkToolbarButtonState } from '@udecode/plate-common'

import { ToolbarButton, type ToolbarButtonProps } from './toolbar'

export interface MarkToolbarButtonProps extends Pick<ToolbarButtonProps, 'tooltip' | 'children'> {
  readonly nodeType: string
  readonly clear?: string | string[]
}

/**
 * Toolbar button to toggle the mark of the leaves in selection.
 */
export function MarkToolbarButton({ clear, nodeType, ...props }: MarkToolbarButtonProps) {
  const state = useMarkToolbarButtonState({ clear, nodeType })
  const { props: buttonProps } = useMarkToolbarButton(state)

  return <ToolbarButton {...buttonProps} {...props} />
}
