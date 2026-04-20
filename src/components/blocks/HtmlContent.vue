<script setup lang="ts">
import type { BlockProps } from '../../types/types'
defineProps<{ content: string } & BlockProps>()
// id and class fall through to the root <div>
</script>

<template><div v-html="content" /></template>
