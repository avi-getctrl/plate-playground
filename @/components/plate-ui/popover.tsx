import { Content, Portal } from '@radix-ui/react-popover'
export { Root as Popover, Trigger as PopoverTrigger, Anchor as PopoverAnchor } from '@radix-ui/react-popover'
import { cva } from 'class-variance-authority'

import { cn } from '../../lib/utils'
import { ComponentPropsWithoutRef, ElementRef, forwardRef } from 'react'

export const popoverVariants = cva(
  'w-72 rounded-md border bg-popover p-4 text-popover-foreground shadow-md outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 print:hidden',
)

export const PopoverContent = forwardRef<ElementRef<typeof Content>, ComponentPropsWithoutRef<typeof Content>>(
  ({ className, style, align = 'center', sideOffset = 4, ...props }, ref) => (
    <Portal>
      <Content
        ref={ref}
        align={align}
        sideOffset={sideOffset}
        className={cn(popoverVariants(), className)}
        style={{ zIndex: 1000, ...style }}
        {...props}
      />
    </Portal>
  ),
)
PopoverContent.displayName = Content.displayName
