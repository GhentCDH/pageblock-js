<script setup lang="ts">
import { defineAsyncComponent } from 'vue'
import {type BlockConfig} from '@pageblocks/core'
import { useBlockEvents } from '../composables'
import type {DefaultBlockProps, BlockConfigOf} from "../types/props";

const BlockRenderer = defineAsyncComponent(() => import('./BlockRenderer.vue'))

type CustomConfig = {
  text?: string
  children?: BlockConfig[]
} & { [key: string]: string | number | boolean | null }

export type HtmlNodeConfig = BlockConfigOf<CustomConfig, keyof HTMLElementTagNameMap>
export type HtmlNodeProps = CustomConfig & DefaultBlockProps

const props = defineProps<HtmlNodeProps>()

const { domHandlers } = useBlockEvents(
  () => ({ on: props.on, blockKey: props.blockKey, blockType: props.blockType ?? ''}),
)
</script>

<template>
  <component :is="props.blockType" v-on="domHandlers">
    <BlockRenderer v-if="props.children" :blocks="props.children" />
    <template v-else-if="props.text">{{ props.text }}</template>
  </component>
</template>
