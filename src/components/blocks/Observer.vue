<script setup lang="ts">
import { defineAsyncComponent, onMounted, onUnmounted, ref } from 'vue'
import type { Block, EventBlockProps, EventMap } from '../../types/types'
import { useActionRegistry } from '../../lib/actionRegistry.ts'
import { toArray } from '../../lib/utils'

const BlockRenderer = defineAsyncComponent(() => import('../BlockRenderer.vue'))

const props = defineProps<{
  on: EventMap
  children: Block[]
} & EventBlockProps>()
// id and class fall through to the root <div>

const actionRegistry = useActionRegistry()
const rootEl = ref<Element | null>(null)

let observer: IntersectionObserver | null = null

onMounted(() => {
  if (!actionRegistry || !rootEl.value) return
  const { inview, outview } = props.on
  if (!inview && !outview) return

  observer = new IntersectionObserver((entries) => {
    for (const entry of entries) {
      if (entry.isIntersecting && inview) {
        const opts = { eventName: 'inview', event: null, args: [], blockType: props.blockType ?? 'observer', blockKey: props.blockKey }
        toArray(inview).forEach(d => actionRegistry.dispatch(d, opts))
      }
      if (!entry.isIntersecting && outview) {
        const opts = { eventName: 'outview', event: null, args: [], blockType: props.blockType ?? 'observer', blockKey: props.blockKey }
        toArray(outview).forEach(d => actionRegistry.dispatch(d, opts))
      }
    }
  })
  observer.observe(rootEl.value)
})

onUnmounted(() => observer?.disconnect())
</script>

<template>
  <div ref="rootEl">
    <BlockRenderer :blocks="children" />
  </div>
</template>
