<script setup lang="ts">
import { computed } from 'vue'
import { marked } from 'marked'

import type { BlockProps } from '../../types/types'
const props = defineProps<{ content: string } & BlockProps>()
// id and class fall through to the root <div>

const html = computed(() => marked(props.content) as string)
</script>

<template><div v-html="html" /></template>
