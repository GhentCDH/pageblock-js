<script setup lang="ts">
import type {DefaultBlockProps, BlockConfigOf} from '@pageblocks/vue'
import { useBlockEvents } from '@pageblocks/vue'

type CustomConfig = {
  id?: string
  title: string
  body?: string
  image?: string
  imageAlt?: string
  link?: { href: string; label: string }
  class?: string
}

export type CardConfig = BlockConfigOf<CustomConfig, 'card'>
type CardProps = CustomConfig & DefaultBlockProps

const props = defineProps<CardProps>()

const { domHandlers } = useBlockEvents(
  () => ({ on: props.on, blockKey: props.blockKey, blockType: props.blockType ?? 'card' }),
) || {}
</script>

<template>
  <article class="card" v-on="domHandlers">
    <img v-if="image" :src="image" :alt="imageAlt ?? ''" class="card__image" />
    <div class="card__content">
      <h3 class="card__title">{{ title }}</h3>
      <p v-if="body" class="card__body">{{ body }}</p>
      <a v-if="link" :href="link.href" class="card__link">{{ link.label }}</a>
    </div>
  </article>
</template>
