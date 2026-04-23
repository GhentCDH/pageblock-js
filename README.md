# pageblocks-js

A Vue 3 page rendering system driven by a JSON config. Define your page as an array of typed blocks; `BlockRenderer` turns it into HTML.

The system supports any HTML tag plus custom block components. Blocks can be nested recursively and connect to registered action handlers via an `on` event map.

## Basic usage

```vue
<script setup lang="ts">
import BlockRenderer from './components/BlockRenderer.vue'
import type { PageConfig } from './types/types'

const page: PageConfig = [
  { _type: 'h1', text: 'Hello world' },
  { _type: 'p',  text: 'This page is driven by JSON.' },
  {
    _type: 'card-grid',
    children: [
      { _type: 'card', title: 'Card 1', body: 'This is the first card.' },
      { _type: 'card', title: 'Card 2', body: 'This is the second card.' },
    ],
  }
]
</script>

<template>
  <BlockRenderer :blocks="page" />
</template>
```

## Concepts

| Property | Purpose |
|---|---|
| `_type` | Selects the element or custom block to render |
| `_key` | Logical identifier passed to action handlers; never rendered to DOM |
| `text` | Text content shorthand (leaf nodes only) |
| `children` | Nested blocks (rendered recursively) |
| `on` | Event map — connects DOM/observer events to registered actions |

## Configuration

### HTML tags

Any standard HTML tag works as `_type`:

```json
{ "_type": "h1",      "text": "Heading" }
{ "_type": "p",       "text": "Paragraph" }
{ "_type": "a",       "href": "/about", "text": "Link" }
{ "_type": "img",     "src": "/hero.png", "alt": "Hero" }
{ "_type": "button",  "text": "Click me" }
{ "_type": "ul",      "children": [{ "_type": "li", "text": "Item" }] }
```

Extra properties (`href`, `src`, `alt`, `target`, `rel`, …) fall through directly to the HTML element.

### Content blocks

#### HTML, Markdown, and plaintext

```json
{ "_type": "html",      "content": "<b>Raw</b> HTML string" }
{ "_type": "markdown",  "content": "**Bold** and _italic_" }
{ "_type": "plaintext", "content": "Bare text node, no wrapper element" }
```

> **Note:** `html` and `markdown` use `v-html` — only use with trusted content.

#### Cards

```json
{ "_type": "card",
  "title": "My card",
  "body": "Card body text.",
  "image": "/thumb.jpg", "imageAlt": "Thumbnail",
  "link": { "href": "/more", "label": "Read more" } }

{ "_type": "card-grid",
  "children": [
    { "_type": "card", "title": "One", "body": "..." },
    { "_type": "card", "title": "Two", "body": "..." }
  ] }
```

#### Observer

The `observer` block wraps content in an `IntersectionObserver`. It fires `inview` when the block enters the viewport and `outview` when it leaves.

```json
{
  "_type": "observer",
  "_key": "hero-section",
  "class": "fade-target",
  "on": {
    "inview":  { "action": "animateIn",  "payload": { "duration": 300 } },
    "outview": { "action": "animateOut", "payload": { "duration": 300 } }
  },
  "children": [
    { "_type": "h2", "text": "Animated section" },
    { "_type": "p",  "text": "Fades in when scrolled into view." }
  ]
}
```

You can use a plain action name string instead of a descriptor object:

```json
{ "on": { "inview": "logInview", "outview": "logInview" } }
```

The `event` field in `ActionContext` is `null` for observer events (there is no native DOM event). Use `eventName` to distinguish `"inview"` from `"outview"`.

The block renders a plain `<div>` wrapper around its children — use `class` to style it.

## Registering custom block components

Add a Vue component and register it in `BlockRenderer.vue`:

**1. Create the component** (`src/components/blocks/Callout.vue`):

```vue
<script setup lang="ts">
import type { EventBlockProps } from '../../types/types'
import { useBlockEvents } from '../../lib/useBlockEvents'

const props = defineProps<{
  message: string
  variant?: 'info' | 'warning' | 'error'
} & EventBlockProps>()

const { domHandlers } = useBlockEvents(
  () => ({ on: props.on, blockKey: props.blockKey, blockType: props.blockType ?? 'callout' }),
)
</script>

<template>
  <div :class="['callout', variant ?? 'info']" v-on="domHandlers">
    {{ message }}
  </div>
</template>
```

**2. Add the TypeScript interface**:

```ts
export interface CalloutBlock extends BaseBlock {
  _type: 'callout'
  message: string
  variant?: 'info' | 'warning' | 'error'
}

// Add to the Block union:
export type Block = HtmlBlock | CardBlock | CardGridBlock | CalloutBlock | /* … */
```

**3. Register it** (`src/components/BlockRenderer.vue`):

```ts
import CalloutComp from './blocks/Callout.vue'

const registry = createRegistry<object>({
  // …existing entries…
  callout: CalloutComp,
})
```

**4. Use it in your config:**

```json
{
  "_type": "callout",
  "_key": "warn-1",
  "message": "Watch out!",
  "variant": "warning",
  "on": { "click": "dismiss" }
}
```

## Events and action handlers

Blocks support an `on` property that maps event names to registered actions.

```json
{
  "_type": "button",
  "_key": "save-btn",
  "text": "Save",
  "on": { "click": "save" }
}
```

```json
{
  "_type": "div",
  "_key": "collapsible-1",
  "class": "collapsible",
  "on": {
    "click": { "action": "collapse", "payload": { "speed": 0.2 } }
  }
}
```

Multiple actions per event:

```json
{
  "_type": "button",
  "_key": "delete-42",
  "text": "Delete",
  "on": {
    "click": [
      "log",
      { "action": "deleteItem", "payload": { "id": 42 } }
    ]
  }
}
```

Supported event names: any DOM event (`click`, `keydown`, `input`, …) plus `inview` and `outview` on `observer` blocks.

### Registering handlers

Call `provideActionRegistry` inside your root component's `setup()`. Every handler receives an `ActionContext` object:

```ts
interface ActionContext {
  action: string        // registered action name ("deleteItem")
  eventName: string     // what triggered it ("click", "inview", …)
  event: Event | null   // native DOM event; null for observer events
  blockType: string     // block's _type value
  blockKey?: string     // block's _key value
  payload?: unknown     // custom payload from the action descriptor
}
```

#### Plain object (recommended default)

```ts
import { provideActionRegistry } from './lib/actionRegistry'

provideActionRegistry({
  save:       ({ blockKey }) => console.log('save', blockKey),
  deleteItem: ({ payload })  => api.delete((payload as { id: number }).id),
  log:        (ctx)          => console.log('[action]', ctx),
})
```

#### Delegating to a Pinia store

The registry is just a plain object — call store actions from inside each handler:

```ts
import { useItemStore } from './stores/items'

const store = useItemStore()

provideActionRegistry({
  save:       ({ payload }) => store.save(payload),
  deleteItem: ({ payload }) => store.delete((payload as { id: number }).id),
  refresh:    ()            => store.fetchAll(),
})
```

This keeps the block system fully decoupled from your store — action names in JSON don't have to match store method names, and you can reshape payloads or combine multiple stores freely.

#### Composable / factory function (for larger apps)

Extract the registry into a composable when it grows large:

```ts
// src/lib/usePageActions.ts
import { provideActionRegistry } from './actionRegistry'
import { useItemStore } from '../stores/items'
import { useRouter } from 'vue-router'

export function usePageActions() {
  const store = useItemStore()
  const router = useRouter()

  provideActionRegistry({
    deleteItem: ({ payload }) => store.delete((payload as { id: number }).id),
    navigate:   ({ payload }) => router.push((payload as { to: string }).to),
    log:        (ctx)         => console.log('[action]', ctx),
  })
}
```

```ts
// App.vue
import { usePageActions } from './lib/usePageActions'
usePageActions()
```

## Project structure

```
demo/
  App.vue             ← demo application
  assets/             ← demo assets

src/
  types/
    types.ts          ← TypeScript interfaces for all block types
  lib/
    actionRegistry.ts ← createRegistry, provideActionRegistry, useActionRegistry
    useBlockEvents.ts ← composable for DOM event handling
    utils.ts          ← shared helpers (toArray)
  components/
    BlockRenderer.vue ← root renderer — iterates a PageConfig array
    blocks/
      Block.vue       ← renders any HTML tag; handles DOM events
      Card.vue        ← card composite block
      CardGrid.vue    ← responsive card grid
      HtmlContent.vue ← raw HTML via v-html
      Markdown.vue    ← markdown parsed by marked, rendered via v-html
      Plaintext.vue   ← bare text node, no wrapper element
      Observer.vue    ← IntersectionObserver wrapper; fires inview/outview actions
```
