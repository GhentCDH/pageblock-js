<script setup lang="ts">
import type { BlockProps } from '../../types/types'
defineProps<{ content: string } & BlockProps>()
</script>

<template>{{ content }}</template>
