<script setup lang="ts">
import type {DefaultBlockProps, defineBlockConfig} from "@pageblocks/vue";

type CustomConfig = {
  content: string
}

export type HtmlConfig = defineBlockConfig<CustomConfig, 'html'>
export type HtmlProps = CustomConfig & DefaultBlockProps

defineProps<HtmlProps>()
</script>

<template><div v-html="content" /></template>
