import { Root, PopoverAnchor, Portal, Content } from '@radix-ui/react-popover'
import {
  comboboxActions,
  type ComboboxContentItemProps,
  type ComboboxContentProps,
  type ComboboxProps,
  type Data,
  type NoData,
  type TComboboxItem,
  useActiveComboboxStore,
  useComboboxContent,
  useComboboxContentState,
  useComboboxControls,
  useComboboxItem,
  useComboboxSelectors,
} from '@udecode/plate-combobox'
import { useEditorState, useEventEditorSelectors } from '@udecode/plate-common'
import { createVirtualRef } from '@udecode/plate-floating'

import { cn } from '../../lib/utils'
import { useEffect } from 'react'

export function ComboboxItem<TData extends Data = NoData>({
  combobox,
  index,
  item,
  onRenderItem,
}: ComboboxContentItemProps<TData>) {
  const { props } = useComboboxItem({ item, index, combobox, ...(onRenderItem && { onRenderItem }) })

  return (
    <div
      className={cn(
        'relative flex h-9 cursor-pointer select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors',
        'hover:bg-accent hover:text-accent-foreground data-[highlighted=true]:bg-accent data-[highlighted=true]:text-accent-foreground',
      )}
      {...props}
    />
  )
}

export function ComboboxContent<TData extends Data = NoData>({
  component: Component,
  items = [],
  portalElement,
  combobox,
  onRenderItem,
}: ComboboxContentProps<TData>) {
  const editor = useEditorState()

  const filteredItems = useComboboxSelectors.filteredItems() as TComboboxItem<TData>[]
  const activeComboboxStore = useActiveComboboxStore()!

  const state = useComboboxContentState({ items, combobox })
  const { menuProps, targetRange } = useComboboxContent(state)

  return (
    <Root open>
      <PopoverAnchor virtualRef={createVirtualRef(editor, targetRange ?? undefined)} />

      <Portal container={portalElement}>
        <Content
          {...menuProps}
          sideOffset={5}
          side="bottom"
          align="start"
          className={cn('z-[500] m-0 max-h-[288px] w-[300px] overflow-scroll rounded-md bg-popover p-0 shadow-md')}
          onOpenAutoFocus={(event) => event.preventDefault()}
        >
          {Component ? Component({ store: activeComboboxStore }) : null}

          {filteredItems.map((item, index) => (
            <ComboboxItem {...{ key: item.key, item, combobox, index, ...(onRenderItem && { onRenderItem }) }} />
          ))}
        </Content>
      </Portal>
    </Root>
  )
}

/**
 * Register the combobox id, trigger, onSelectItem
 * Renders the combobox if active.
 */
export function Combobox<TData extends Data = NoData>({
  id,
  trigger,
  searchPattern,
  onSelectItem,
  controlled,
  maxSuggestions,
  filter,
  sort,
  disabled: _disabled,
  ...props
}: ComboboxProps<TData>) {
  const storeItems = useComboboxSelectors.items()
  const disabled = _disabled ?? (storeItems.length === 0 && !props.items?.length)

  const focusedEditorId = useEventEditorSelectors.focus?.()
  const combobox = useComboboxControls()
  const activeId = useComboboxSelectors.activeId()
  const editor = useEditorState()

  useEffect(() => {
    comboboxActions.setComboboxById({
      id,
      trigger,
      ...(searchPattern && { searchPattern }),
      ...(controlled && { controlled }),
      onSelectItem,
      ...(maxSuggestions && { maxSuggestions }),
      ...(filter && { filter }),
      ...(sort && { sort }),
    })
  }, [id, trigger, searchPattern, controlled, onSelectItem, maxSuggestions, filter, sort])

  if (!combobox || !editor.selection || focusedEditorId !== editor.id || activeId !== id || disabled) {
    return null
  }

  return <ComboboxContent combobox={combobox} {...props} />
}
