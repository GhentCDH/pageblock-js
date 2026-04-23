<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'
import {type BlockConfig, BlockRenderer, createActionDispatcher, type EventMap} from '@pageblocks/vue'
import {
  createActionRegistry, createComponentRegistry,
  type DefaultBlockProps, type BlockConfigOf,
  useComponentRegistry, useActionRegistry
} from '@pageblocks/vue'
import {toArray} from '@pageblocks/vue'

// define block config and props
type CustomConfig = {
  on: Pick<EventMap, 'inview' | 'outview'> & EventMap
  children?: BlockConfig[]
}
export type ObserverConfig = BlockConfigOf<CustomConfig, 'observer'>
type ObserverProps = DefaultBlockProps & CustomConfig

const props = defineProps<ObserverProps>()

// get registries
const actions = useActionRegistry() || createActionRegistry()
const components = useComponentRegistry() || createComponentRegistry()

const actionDispatcher = createActionDispatcher(actions)

const { children } = props
const rootEl = ref<Element | null>(null)

let observer: IntersectionObserver | null = null

onMounted(() => {
  if (!actions || !rootEl.value) return
  const { inview, outview } = props.on
  if (!inview && !outview) return

  observer = new IntersectionObserver((entries) => {
    for (const entry of entries) {
      if (entry.isIntersecting && inview) {
        const opts = { eventName: 'inview', event: null, args: [], blockType: props.blockType ?? 'observer', blockKey: props.blockKey }
        toArray(inview).forEach(d => actionDispatcher.dispatch(d, opts))
      }
      if (!entry.isIntersecting && outview) {
        const opts = { eventName: 'outview', event: null, args: [], blockType: props.blockType ?? 'observer', blockKey: props.blockKey }
        toArray(outview).forEach(d => actionDispatcher.dispatch(d, opts))
      }
    }
  })
  observer.observe(rootEl.value)
})

onUnmounted(() => observer?.disconnect())
</script>

<template>
  <div ref="rootEl">
    <BlockRenderer v-if="children" :blocks="children" :actions="actions" :components="components" />
  </div>
</template>
