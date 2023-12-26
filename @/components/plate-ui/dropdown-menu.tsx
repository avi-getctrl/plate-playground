import { ComponentPropsWithoutRef, ElementRef, HTMLAttributes, forwardRef, useCallback, useState } from 'react'
import {
  CheckboxItem,
  Content,
  Item,
  ItemIndicator,
  Label,
  Portal,
  RadioItem,
  Separator,
  SubContent,
  SubTrigger,
} from '@radix-ui/react-dropdown-menu'
export {
  Root as DropdownMenu,
  Trigger as DropdownMenuTrigger,
  Group as DropdownMenuGroup,
  Portal as DropdownMenuPortal,
  Sub as DropdownMenuSub,
  RadioGroup as DropdownMenuRadioGroup,
} from '@radix-ui/react-dropdown-menu'
import { cva, VariantProps } from 'class-variance-authority'

import { cn } from '../../lib/utils'
import { Icons } from './icons'

export const DropdownMenuSubTrigger = forwardRef<
  ElementRef<typeof SubTrigger>,
  ComponentPropsWithoutRef<typeof SubTrigger> & { inset?: boolean }
>(({ className, inset, children, ...props }, ref) => (
  <SubTrigger
    ref={ref}
    className={cn(
      'flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none focus:bg-accent data-[state=open]:bg-accent',
      'data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
      inset && 'pl-8',
      className,
    )}
    {...props}
  >
    {children}
    <Icons.chevronRight className="ml-auto h-4 w-4" />
  </SubTrigger>
))
DropdownMenuSubTrigger.displayName = SubTrigger.displayName

export const DropdownMenuSubContent = forwardRef<
  ElementRef<typeof SubContent>,
  ComponentPropsWithoutRef<typeof SubContent>
>(({ className, ...props }, ref) => (
  <SubContent
    ref={ref}
    className={cn(
      'z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-lg data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2',
      className,
    )}
    {...props}
  />
))
DropdownMenuSubContent.displayName = SubContent.displayName

export const DropdownMenuContent = forwardRef<ElementRef<typeof Content>, ComponentPropsWithoutRef<typeof Content>>(
  ({ className, sideOffset = 4, ...props }, ref) => (
    <Portal>
      <Content
        ref={ref}
        sideOffset={sideOffset}
        className={cn(
          'z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2',
          className,
        )}
        {...props}
      />
    </Portal>
  ),
)
DropdownMenuContent.displayName = Content.displayName

// eslint-disable-next-line react-refresh/only-export-components
export const menuItemVariants = cva(
  cn(
    'relative flex h-9 cursor-pointer select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors',
    'focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
  ),
  {
    variants: {
      inset: {
        true: 'pl-8',
      },
    },
  },
)

export const DropdownMenuItem = forwardRef<
  ElementRef<typeof Item>,
  ComponentPropsWithoutRef<typeof Item> & VariantProps<typeof menuItemVariants>
>(({ className, inset, ...props }, ref) => (
  <Item ref={ref} className={cn(menuItemVariants({ inset }), className)} {...props} />
))
DropdownMenuItem.displayName = Item.displayName

export const DropdownMenuCheckboxItem = forwardRef<
  ElementRef<typeof CheckboxItem>,
  ComponentPropsWithoutRef<typeof CheckboxItem>
>(({ className, children, checked = false, ...props }, ref) => (
  <CheckboxItem
    ref={ref}
    className={cn(
      'relative flex select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
      'cursor-pointer',
      className,
    )}
    checked={checked}
    {...props}
  >
    <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
      <ItemIndicator>
        <Icons.check className="h-4 w-4" />
      </ItemIndicator>
    </span>
    {children}
  </CheckboxItem>
))
DropdownMenuCheckboxItem.displayName = CheckboxItem.displayName

interface DropdownMenuRadioItemProps extends ComponentPropsWithoutRef<typeof RadioItem> {
  hideIcon?: boolean
}

export const DropdownMenuRadioItem = forwardRef<ElementRef<typeof RadioItem>, DropdownMenuRadioItemProps>(
  ({ className, children, hideIcon, ...props }, ref) => (
    <RadioItem
      ref={ref}
      className={cn(
        'relative flex select-none items-center rounded-sm pl-8 pr-2 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
        'h-9 cursor-pointer px-2 data-[state=checked]:bg-accent data-[state=checked]:text-accent-foreground',
        className,
      )}
      {...props}
    >
      {!hideIcon && (
        <span className="absolute right-2 flex h-3.5 w-3.5 items-center justify-center">
          <ItemIndicator>
            <Icons.check className="h-4 w-4" />
          </ItemIndicator>
        </span>
      )}
      {children}
    </RadioItem>
  ),
)
DropdownMenuRadioItem.displayName = RadioItem.displayName

export const DropdownMenuLabel = forwardRef<
  ElementRef<typeof Label>,
  ComponentPropsWithoutRef<typeof Label> & { inset?: boolean }
>(({ className, inset, ...props }, ref) => (
  <Label
    ref={ref}
    className={cn('select-none px-2 py-1.5 text-sm font-semibold', inset && 'pl-8', className)}
    {...props}
  />
))
DropdownMenuLabel.displayName = Label.displayName

export const DropdownMenuSeparator = forwardRef<
  ElementRef<typeof Separator>,
  ComponentPropsWithoutRef<typeof Separator>
>(({ className, ...props }, ref) => (
  <Separator ref={ref} className={cn('-mx-1 my-1 h-px bg-muted', className)} {...props} />
))
DropdownMenuSeparator.displayName = Separator.displayName

export function DropdownMenuShortcut({ className, ...props }: HTMLAttributes<HTMLSpanElement>) {
  return <span className={cn('ml-auto text-xs tracking-widest opacity-60', className)} {...props} />
}
DropdownMenuShortcut.displayName = 'DropdownMenuShortcut'

// eslint-disable-next-line react-refresh/only-export-components
export function useOpenState() {
  const [open, setOpen] = useState(false)

  const onOpenChange = useCallback((_value = !open) => setOpen(_value), [open])

  return { open, onOpenChange }
}
