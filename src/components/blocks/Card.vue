<script setup lang="ts">
import type { EventMap } from '../../types/types'
import { useBlockEvents } from '../../lib/useBlockEvents'

const props = defineProps<{
  title: string
  body?: string
  image?: string
  imageAlt?: string
  link?: { href: string; label: string }
  on?: EventMap
  blockKey?: string
  blockType?: string
}>()

const { domHandlers } = useBlockEvents(
  () => ({ on: props.on, blockKey: props.blockKey, blockType: props.blockType ?? 'card' }),
)
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
