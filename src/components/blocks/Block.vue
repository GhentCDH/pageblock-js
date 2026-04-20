<script setup lang="ts">
import { defineAsyncComponent } from 'vue'
import type { Block, HtmlTag, EventMap } from '../../types/types'
import { useBlockEvents } from '../../lib/useBlockEvents'

const BlockRenderer = defineAsyncComponent(() => import('../BlockRenderer.vue'))

const props = defineProps<{
  _type: HtmlTag
  text?: string
  children?: Block[]
  on?: EventMap
  blockKey?: string
}>()
// href, src, alt, target, rel, id, class fall through to the root element

const { domHandlers } = useBlockEvents(
  () => ({ on: props.on, blockKey: props.blockKey, blockType: props._type }),
)
</script>

<template>
  <component :is="_type" v-on="domHandlers">
    <BlockRenderer v-if="children" :blocks="children" />
    <template v-else-if="text">{{ text }}</template>
  </component>
</template>
