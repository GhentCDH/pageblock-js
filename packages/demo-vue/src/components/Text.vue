<script setup lang="ts">
import type {DefaultBlockProps, BlockConfigOf} from "@pageblocks/vue";

type CustomConfig = {
  content: string
}

export type TextConfig = BlockConfigOf<CustomConfig, 'text'>
export type TextProps = CustomConfig & DefaultBlockProps

defineProps<TextProps>()
</script>

<template>{{ content }}</template>
