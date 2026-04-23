<script setup lang="ts">
import { computed } from 'vue'
import { marked } from 'marked'

import type {DefaultBlockProps, BlockConfigOf} from "@pageblocks/vue";

type CustomConfig = { content: string }

export type MarkdownConfig = BlockConfigOf<CustomConfig, 'markdown'>
export type MarkdownProps = CustomConfig & DefaultBlockProps

const props = defineProps<MarkdownProps>()

const html = computed(() => marked(props.content) as string)
</script>

<template><div v-html="html" /></template>
