import {
  type ComponentPropsWithoutRef,
  type ElementRef,
  forwardRef,
  type ReactNode,
  useState,
  useEffect,
  Children,
  type HTMLAttributes,
} from 'react'
import {
  Button as ReactToolbarButton,
  ToggleGroup,
  ToggleItem,
  Link,
  Separator as ReactToolbarSeparator,
  Root,
} from '@radix-ui/react-toolbar'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '../../lib/utils'
import { Icons } from './icons'

import { Separator } from './separator'
import { type ToggleProps, toggleVariants } from './toggle'
import { Tooltip, TooltipContent, TooltipPortal, TooltipTrigger } from './tooltip'

const toolbarVariants = cva('relative flex select-none items-stretch gap-1 bg-background')

export const linkVariants = cva('font-medium underline underline-offset-4')

export const ToolbarToggleGroup = ToggleGroup

export interface ToolbarProps extends ComponentPropsWithoutRef<typeof Toolbar> {}

export const Toolbar = forwardRef<
  ElementRef<typeof Root>,
  ComponentPropsWithoutRef<typeof Root> & VariantProps<typeof toolbarVariants>
>(function Toolbar({ className, ...props }, ref) {
  return <Root ref={ref} className={cn(toolbarVariants(), className)} {...props} />
})
Toolbar.displayName = Root.displayName

export const ToolbarLink = forwardRef<
  ElementRef<typeof Link>,
  ComponentPropsWithoutRef<typeof Link> & VariantProps<typeof linkVariants>
>(function ToolbarLink({ className, ...props }, ref) {
  return <Link ref={ref} className={cn(linkVariants(), className)} {...props} />
})
ToolbarLink.displayName = Link.displayName

export const ToolbarSeparator = forwardRef<
  ElementRef<typeof ReactToolbarSeparator>,
  ComponentPropsWithoutRef<typeof ReactToolbarSeparator>
>(function ToolbarSeparator({ className, ...props }, ref) {
  return <ReactToolbarSeparator ref={ref} className={cn('shrink-0 bg-border', 'my-1 w-[1px]', className)} {...props} />
})
ToolbarSeparator.displayName = ReactToolbarSeparator.displayName

export interface ToolbarButtonProps
  extends ComponentPropsWithoutRef<typeof ReactToolbarButton>,
    VariantProps<typeof toggleVariants>,
    Omit<ToggleProps, 'type'> {
  readonly buttonType?: 'button' | 'toggle'
  readonly pressed?: boolean
  readonly tooltip?: ReactNode
  readonly isDropdown?: boolean
}

export const ToolbarButton = forwardRef<ElementRef<typeof ReactToolbarButton>, ToolbarButtonProps>(
  function ToolbarButton(
    { className, variant, size = 'sm', isDropdown, children, pressed, value: _value, tooltip, ...props },
    ref,
  ) {
    const [isLoaded, setIsLoaded] = useState(false)

    useEffect(() => setIsLoaded(true), [])

    const content =
      typeof pressed === 'boolean' ? (
        <ToolbarToggleGroup type="single" value="single">
          <ToolbarToggleItem
            ref={ref}
            className={cn(toggleVariants({ variant, size }), isDropdown && 'my-1 justify-between pr-1', className)}
            value={pressed ? 'single' : ''}
            {...props}
          >
            <div className="flex flex-1">{children}</div>
            <div>{isDropdown && <Icons.arrowDown className="ml-0.5 h-4 w-4" data-icon />}</div>
          </ToolbarToggleItem>
        </ToolbarToggleGroup>
      ) : (
        <ReactToolbarButton
          {...{
            ref,
            className: cn(toggleVariants({ variant, size }), isDropdown && 'pr-1', className),
            ...props,
            children,
          }}
        />
      )

    return isLoaded && tooltip ? (
      <Tooltip>
        <TooltipTrigger asChild>{content}</TooltipTrigger>
        <TooltipPortal>
          <TooltipContent>{tooltip}</TooltipContent>
        </TooltipPortal>
      </Tooltip>
    ) : (
      <>{content}</>
    )
  },
)
ToolbarButton.displayName = ReactToolbarButton.displayName

export const ToolbarToggleItem = forwardRef<
  ElementRef<typeof ToggleItem>,
  ComponentPropsWithoutRef<typeof ToggleItem> & VariantProps<typeof toggleVariants>
>(function ToolbarToggleItem({ className, variant, size, ...props }, ref) {
  return <ToggleItem ref={ref} className={cn(toggleVariants({ variant, size }), className)} {...props} />
})
ToolbarToggleItem.displayName = ToggleItem.displayName

export const ToolbarGroup = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement> & { readonly noSeparator?: boolean }>(
  function ToolbarGroup({ noSeparator, className, children }, ref) {
    const childArr = Children.map(children, (c) => c)
    if (!childArr || childArr.length === 0) {
      return null
    }
    return (
      <div ref={ref} className={cn('flex', className)}>
        {!noSeparator && (
          <div className="h-full py-1">
            <Separator orientation="vertical" />
          </div>
        )}
        <div className="mx-1 flex items-center gap-1">{children}</div>
      </div>
    )
  },
)
ToolbarGroup.displayName = 'ToolbarGroup'
