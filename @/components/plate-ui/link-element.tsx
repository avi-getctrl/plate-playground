import { PlateElement, type PlateElementProps, type Value } from '@udecode/plate-common'
import { type TLinkElement, useLink } from '@udecode/plate-link'

import { cn } from '../../lib/utils'
import { type ElementRef, forwardRef } from 'react'

export const LinkElement = forwardRef<ElementRef<typeof PlateElement>, PlateElementProps<Value, TLinkElement>>(
  function LinkElement({ className, children, ...props }, ref) {
    const { props: linkProps } = useLink({ element: props.element })

    return (
      <PlateElement
        asChild
        ref={ref}
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        className={cn('font-medium text-primary underline decoration-primary underline-offset-4', className)}
        {...linkProps}
        {...props}
      >
        <a>{children}</a>
      </PlateElement>
    )
  },
)
LinkElement.displayName = 'LinkElement'
