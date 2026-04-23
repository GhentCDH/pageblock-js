<script setup lang="ts">
import type {DefaultBlockProps, BlockConfigOf} from "@pageblocks/vue";

type CustomConfig = {
  content: string
}

export type HtmlConfig = BlockConfigOf<CustomConfig, 'html'>
export type HtmlProps = CustomConfig & DefaultBlockProps

defineProps<HtmlProps>()
</script>

<template><div v-html="content" /></template>
