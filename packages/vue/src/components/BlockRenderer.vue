<script setup lang="ts">
import type {ActionRegistry, ComponentRegistry, BlockConfig} from '@pageblocks/core'
import {provideActionRegistry, useActionRegistry, useComponentRegistry} from "../composables";
import {provideComponentRegistry} from "../composables";
import { type HtmlNodeProps } from "./HtmlNode.vue";
import HtmlNode from "./HtmlNode.vue";

export type BlockRendererProps = {
  blocks: BlockConfig[]
  components?: ComponentRegistry
  actions?: ActionRegistry
}

const props = defineProps<BlockRendererProps>()

const { blocks } = props

const components = props.components ?? useComponentRegistry()
const actions = props.actions ?? useActionRegistry()

// provide registries to subtree components
provideActionRegistry(actions)
provideComponentRegistry(components)

function customProps(block: BlockConfig): Record<string, unknown> {
  const { _type: _t, _key: _k, ...rest } = block as unknown as Record<string, unknown>
  return rest
}

function asHtmlNodeProps(attr: Record<string, unknown>): HtmlNodeProps {
  return attr as HtmlNodeProps
}
</script>

<template>
  <template v-for="(block, i) in blocks" :key="block._key ?? i">
    <component
      v-if="components.resolve(block._type)"
      :is="components.resolve(block._type)"
      v-bind="customProps(block)"
      :block-key="block._key"
      :block-type="block._type"
    />
    <HtmlNode
      v-else
      v-bind="asHtmlNodeProps(customProps(block))"
      :block-key="block._key"
      :block-type="block._type"
    />
  </template>
</template>
