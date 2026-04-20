<script setup lang="ts">
import type { Block, HtmlBlock, PageConfig } from '../types/types'
import { HTML_TAGS } from '../types/types'
import { createRegistry } from '../lib/actionRegistry.ts'
import BlockComp from './blocks/Block.vue'
import CardComp from './blocks/Card.vue'
import CardGridComp from './blocks/CardGrid.vue'
import HtmlContentComp from './blocks/HtmlContent.vue'
import MarkdownComp from './blocks/Markdown.vue'
import PlaintextComp from './blocks/Plaintext.vue'
import ObserverComp from './blocks/Observer.vue'

defineProps<{ blocks: PageConfig }>()

const registry = createRegistry<object>({
  card: CardComp,
  'card-grid': CardGridComp,
  html: HtmlContentComp,
  markdown: MarkdownComp,
  plaintext: PlaintextComp,
  observer: ObserverComp,
})

// For custom blocks: strip _type + _key (neither belongs as a component prop)
function customAttrs(block: Block): Record<string, unknown> {
  const { _type: _t, _key: _k, ...rest } = block as unknown as Record<string, unknown>
  return rest
}

// For HTML blocks: strip only _key (Block.vue needs _type as a required prop)
function htmlAttrs(block: HtmlBlock): Record<string, unknown> {
  const { _key: _k, ...rest } = block as unknown as Record<string, unknown>
  return rest
}

function asHtmlBlock(block: Block): HtmlBlock {
  return block as HtmlBlock
}
</script>

<template>
  <template v-for="(block, i) in blocks" :key="block._key ?? block.id ?? i">
    <component
      v-if="registry.resolve(block._type)"
      :is="registry.resolve(block._type)"
      v-bind="customAttrs(block)"
      :block-key="block._key"
      :block-type="block._type"
    />
    <BlockComp
      v-else-if="HTML_TAGS.has(block._type)"
      v-bind="(htmlAttrs(asHtmlBlock(block)) as unknown as HtmlBlock)"
      :block-key="block._key"
    />
  </template>
</template>
