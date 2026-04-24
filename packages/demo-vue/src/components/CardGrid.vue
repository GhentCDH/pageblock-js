<script setup lang="ts">
import type {DefaultBlockProps, BlockConfigOf} from '@pageblocks/vue'
import { useBlockEvents } from '@pageblocks/vue'

import Card, { type CardConfig } from './Card.vue'

export type CustomConfig = {
  children: CardConfig[]
}

export type CardGridConfig = BlockConfigOf<CustomConfig, 'card-grid'>

type CardGridProps = CustomConfig & DefaultBlockProps
const props = defineProps<CardGridProps>()

const { domHandlers } = useBlockEvents(
  () => ({ on: props.on, blockKey: props.blockKey, blockType: props.blockType ?? 'card-grid' }),
) || {}
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
      :block-type="card._type"
    />
  </div>
</template>
