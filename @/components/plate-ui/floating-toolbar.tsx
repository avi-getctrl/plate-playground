import { PortalBody, useComposedRef } from '@udecode/plate-common'
import {
  flip,
  FloatingToolbarState,
  offset,
  useFloatingToolbar,
  useFloatingToolbarState,
} from '@udecode/plate-floating'

import { cn } from '../../lib/utils'

import { Toolbar, ToolbarProps } from './toolbar'
import { ElementRef, forwardRef } from 'react'

export interface FloatingToolbarProps extends ToolbarProps {
  readonly state?: FloatingToolbarState
}

export const FloatingToolbar = forwardRef<ElementRef<typeof Toolbar>, FloatingToolbarProps>(function FloatingToolbar(
  { state, children, ...props },
  componentRef,
) {
  const floatingToolbarState = useFloatingToolbarState({
    ...state,
    floatingOptions: {
      placement: 'top',
      middleware: [
        offset(12),
        flip({
          padding: 12,
          fallbackPlacements: ['top-start', 'top-end', 'bottom-start', 'bottom-end'],
        }),
      ],
      ...state?.floatingOptions,
    },
  })

  const { ref: floatingRef, props: rootProps, hidden } = useFloatingToolbar(floatingToolbarState)

  const ref = useComposedRef<HTMLDivElement>(componentRef, floatingRef)

  if (hidden) {
    return null
  }
  return (
    <PortalBody>
      <Toolbar
        ref={ref}
        className={cn('absolute z-50 whitespace-nowrap border bg-popover px-1 opacity-100 shadow-md print:hidden')}
        {...rootProps}
        {...props}
      >
        {children}
      </Toolbar>
    </PortalBody>
  )
})
FloatingToolbar.displayName = 'FloatingToolbar'
