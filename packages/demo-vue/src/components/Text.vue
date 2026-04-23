<script setup lang="ts">
import type {DefaultBlockProps, defineBlockConfig} from "@pageblocks/vue";

type CustomConfig = {
  content: string
}

export type TextConfig = defineBlockConfig<CustomConfig, 'text'>
export type TextProps = CustomConfig & DefaultBlockProps

defineProps<TextProps>()
</script>

<template>{{ content }}</template>
