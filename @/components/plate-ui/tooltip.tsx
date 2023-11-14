import { Content } from '@radix-ui/react-tooltip'
export {
  Root as Tooltip,
  Trigger as TooltipTrigger,
  Portal as TooltipPortal,
  Provider as TooltipProvider,
} from '@radix-ui/react-tooltip'

import { cn } from '../../lib/utils'
import { type ComponentPropsWithoutRef, type ElementRef, forwardRef } from 'react'

export const TooltipContent = forwardRef<ElementRef<typeof Content>, ComponentPropsWithoutRef<typeof Content>>(
  ({ className, sideOffset = 4, ...props }, ref) => (
    <Content
      ref={ref}
      sideOffset={sideOffset}
      className={cn(
        'z-50 overflow-hidden rounded-md border bg-popover px-3 py-1.5 text-sm text-popover-foreground shadow-md',
        className,
      )}
      {...props}
    />
  ),
)
TooltipContent.displayName = Content.displayName
