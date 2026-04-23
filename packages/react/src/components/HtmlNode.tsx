import { createElement, type ReactElement } from 'react'
import type { BlockConfig, EventMap } from '@pageblocks/core'
import { useBlockEvents } from '../hooks/useBlockEvents'
import type { DefaultBlockProps, BlockConfigOf } from '../types/props'
import { BlockRenderer } from './BlockRenderer'

// string | number | boolean covers all valid primitive HTML attribute values
type HtmlAttrs = Record<string, string | number | boolean | null | undefined>

type HtmlNodeOwnProps = {
  text?: string
  children?: BlockConfig[]
  class?: string
}

// Base config type for HTML blocks — does not include arbitrary HTML attributes
// because [key: string] index signatures prevent Omit from working correctly.
// Use `BlockConfig & { [key: string]: unknown }` in your own code for full flexibility.
export type HtmlNodeConfig = BlockConfigOf<HtmlNodeOwnProps, keyof HTMLElementTagNameMap>
export type HtmlNodeProps = HtmlNodeOwnProps & DefaultBlockProps & { on?: EventMap } & HtmlAttrs

export function HtmlNode({
  blockType,
  blockKey,
  on,
  text,
  children: blocks,
  class: className,
  ...attrs
}: HtmlNodeProps): ReactElement {
  const eventHandlers = useBlockEvents(on, blockType, blockKey)

  const domProps: Record<string, unknown> = {
    ...(className !== undefined ? { className } : {}),
    ...attrs,
    ...eventHandlers,
  }

  const content = blocks
    ? createElement(BlockRenderer, { blocks })
    : (text ?? null)

  return createElement(blockType, domProps, content !== null ? content : undefined)
}
