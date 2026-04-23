import { useMemo } from 'react'
import {
  BlockRenderer,
  createActionRegistry,
  createComponentRegistry,
  type ActionContext,
  type BlockConfig,
} from '@pageblocks/react'

import { Card, type CardBlockConfig } from './components'
import { CardGrid, type CardGridBlockConfig } from './components'
import { Html, type HtmlBlockConfig } from './components'
import { Markdown, type MarkdownBlockConfig } from './components'
import { Observer, type ObserverBlockConfig } from './components'
import { Text, type TextBlockConfig } from './components'

// HtmlNodeConfig can't include [key: string] (breaks Omit), so define a flexible local type
type MyHtmlNodeConfig = BlockConfig & {
  text?: string
  class?: string
  children?: MyBlocks[]
  [key: string]: unknown
}
type MyBlocks =
  | MyHtmlNodeConfig
  | CardBlockConfig
  | CardGridBlockConfig
  | HtmlBlockConfig
  | MarkdownBlockConfig
  | ObserverBlockConfig
  | TextBlockConfig

const componentRegistry = createComponentRegistry({
  card: Card,
  'card-grid': CardGrid,
  html: Html,
  markdown: Markdown,
  text: Text,
  observer: Observer,
})

const actionRegistry = createActionRegistry({
  greet: ({ args, blockKey }: ActionContext) =>
    alert(`Hello from "${blockKey}"! (clicked ${((args[0] as Event)?.target as HTMLElement)?.tagName})`),
  logInview: ({ eventName, blockKey }: ActionContext) =>
    console.log(`[${eventName}] key="${blockKey}"`),
  deleteItem: ({ blockKey, blockType, payload }: ActionContext) =>
    console.log('delete:', { blockKey, blockType, payload }),
  logChange: ({ args, blockKey }: ActionContext) =>
    console.log(`[change] key="${blockKey}" value=`, ((args[0] as Event)?.target as HTMLInputElement)?.value),
  log: (ctx: ActionContext) => console.log(ctx),
})

const page: MyBlocks[] = [
  { _type: 'h1', text: 'Welcome', class: 'page-title', on: { click: 'log' } },
  { _type: 'p', text: 'This page is driven by a JSON config.' },
  {
    _type: 'div',
    class: 'highlight-box',
    children: [
      { _type: 'h2', text: 'Nested Section' },
      { _type: 'p', text: 'Children work recursively.' },
    ],
  },
  { _type: 'img', src: '/vite.svg', alt: 'Vite logo', class: 'demo-img' },

  {
    _type: 'button',
    _key: 'greet-btn',
    text: 'Click me',
    class: 'demo-btn',
    on: { click: ['greet', 'log'] },
  },

  {
    _type: 'button',
    _key: 'delete-btn',
    text: 'Delete item 42',
    class: 'demo-btn',
    on: { click: { action: 'deleteItem', payload: { id: 42 } } },
  },
  {
    _type: 'ul',
    id: 'feature-list',
    children: [
      { _type: 'li', text: 'Type-safe JSON config' },
      { _type: 'li', text: 'Any HTML tag via _type', class: 'active' },
      {
        _type: 'li',
        children: [
          { _type: 'strong', text: 'Rich items: ' },
          { _type: 'span', text: 'any block type works inside a list' },
        ],
      },
    ],
  },
  {
    _type: 'ol',
    children: [
      { _type: 'li', text: 'Define your PageConfig JSON' },
      { _type: 'li', text: 'Pass it to BlockRenderer' },
      { _type: 'li', text: 'Done' },
    ],
  },
  { _type: 'h2', text: 'Custom blocks' },
  { _type: 'h3', text: 'Html / Markdown / Plaintext' },
  { _type: 'html', content: '<b>Bold</b> and <em>italic</em> raw HTML.' },
  { _type: 'markdown', content: '**Bold** and _italic_ via markdown.' },
  { _type: 'text', content: 'Plain text node — no wrapper element.' },
  { _type: 'h3', text: 'Input with change event' },
  {
    _type: 'input',
    _key: 'demo-input',
    type: 'text',
    placeholder: 'Type something and blur…',
    on: { input: 'logChange' },
  },
  { _type: 'h3', text: 'Cards' },
  {
    _type: 'card-grid',
    children: [
      { _type: 'card', title: 'Card One', body: 'First card body text.' },
      {
        _type: 'card',
        title: 'Card Two',
        body: 'Second card with a link.',
        link: { href: '#', label: 'Read more' },
      },
      { _type: 'card', title: 'Card Three', body: 'Third card body text.' },
    ],
    on: { click: ['log'] },
  },
  {
    _type: 'observer',
    _key: 'inview-target',
    class: 'inview-box',
    on: { inview: 'logInview', outview: 'logInview' },
    children: [
      { _type: 'p', text: 'Scroll here → fires logInview / logOutview (check console)' },
    ],
  },
]

export default function App() {
  const registries = useMemo(() => ({ actions: actionRegistry, components: componentRegistry }), [])

  return (
    <main className="page">
      <BlockRenderer blocks={page} actions={registries.actions} components={registries.components} />
    </main>
  )
}
