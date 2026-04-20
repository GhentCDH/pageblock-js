<script setup lang="ts">
import type { CardBlock, EventMap } from '../../types/types'
import { useBlockEvents } from '../../lib/useBlockEvents'
import Card from './Card.vue'

const props = defineProps<{
  children: CardBlock[]
  on?: EventMap
  blockKey?: string
  blockType?: string
}>()

const { domHandlers } = useBlockEvents(
  () => ({ on: props.on, blockKey: props.blockKey, blockType: props.blockType ?? 'card-grid' }),
)
</script>

<template>
  <div class="card-grid" v-on="domHandlers">
    <Card
      v-for="(card, i) in children"
      :key="card._key ?? card.id ?? i"
      :title="card.title"
      :body="card.body"
      :image="card.image"
      :image-alt="card.imageAlt"
      :link="card.link"
      :id="card.id"
      :class="card.class"
      :on="card.on"
      :block-key="card._key"
    />
  </div>
</template>
