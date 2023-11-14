import { PlateElement, type PlateElementProps } from '@udecode/plate-common'

import { cn } from '../../lib/utils'
import { type ElementRef, forwardRef } from 'react'

export const ParagraphElement = forwardRef<ElementRef<typeof PlateElement>, PlateElementProps>(
  function ParagraphElement({ className, children, ...props }: PlateElementProps, ref) {
    return (
      <PlateElement ref={ref} className={cn('m-0 px-0 py-1', className)} {...props}>
        {children}
      </PlateElement>
    )
  },
)
ParagraphElement.displayName = 'ParagraphElement'
