<script setup lang="ts">
defineProps<{ content: string }>()
// id and class fall through to the root <div>
</script>

<template><div v-html="content" /></template>
