export type HtmlTag =
  | 'div' | 'section' | 'article' | 'main' | 'aside'
  | 'header' | 'footer' | 'nav'
  | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
  | 'p' | 'span' | 'em' | 'strong' | 'a'
  | 'ul' | 'ol' | 'li' | 'figure' | 'figcaption'
  | 'img' | 'br' | 'hr' | 'button'

export const HTML_TAGS = new Set<string>([
  'div', 'section', 'article', 'main', 'aside',
  'header', 'footer', 'nav',
  'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
  'p', 'span', 'em', 'strong', 'a',
  'ul', 'ol', 'li', 'figure', 'figcaption',
  'img', 'br', 'hr', 'button', 'input', 'textarea', 'select', 'label', 'form',
])

export type ActionDescriptor = string | { action: string; payload?: unknown }
export type EventMap = Record<string, ActionDescriptor | ActionDescriptor[]>

/** Base props injected by BlockRenderer into every custom block component. */
export interface BlockProps {
  blockKey?: string
  blockType?: string
}

/** Extended props for components that handle DOM events. */
export interface EventBlockProps extends BlockProps {
  on?: EventMap
}

interface BaseBlock {
  _key?: string  // logical identifier for action dispatch; never rendered to DOM
  id?: string    // maps to HTML id attribute
  class?: string
  on?: EventMap
}

export interface HtmlBlock extends BaseBlock {
  _type: HtmlTag
  text?: string
  children?: Block[]
  href?: string
  src?: string
  alt?: string
  target?: string
  rel?: string
}

export interface CardBlock extends BaseBlock {
  _type: 'card'
  title: string
  body?: string
  image?: string
  imageAlt?: string
  link?: { href: string; label: string }
}

export interface CardGridBlock extends BaseBlock {
  _type: 'card-grid'
  children: CardBlock[]
}

export interface HtmlContentBlock extends BaseBlock {
  _type: 'html'
  content: string
}

export interface MarkdownBlock extends BaseBlock {
  _type: 'markdown'
  content: string
}

export interface PlaintextBlock extends BaseBlock {
  _type: 'plaintext'
  content: string
}

export interface ObserverBlock extends BaseBlock {
  _type: 'observer'
  on: Pick<EventMap, 'inview' | 'outview'> & EventMap
  children: Block[]
}

export type Block = HtmlBlock | CardBlock | CardGridBlock | HtmlContentBlock | MarkdownBlock | PlaintextBlock | ObserverBlock
export type PageConfig = Block[]
