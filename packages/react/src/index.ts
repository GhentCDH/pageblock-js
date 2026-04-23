// Core types and utilities (excluding ComponentRegistry / ComponentDefinition — overridden below)
export type {
  BlockConfig,
  EventMap,
  ActionDescriptor,
  ActionContext,
  ActionHandler,
  ActionRegistry,
  ActionDispatcher,
  Registry,
} from '@pageblocks/core'
export { createRegistry, createActionRegistry, createActionDispatcher, toArray } from '@pageblocks/core'

// React component registry (overrides core's ComponentRegistry)
export type { ReactComponent, ReactComponentRegistry as ComponentRegistry } from './context/RegistryContext'
export { createComponentRegistry } from './context/RegistryContext'

// Registry context — single provider for both registries
export { RegistryProvider, type RegistryProviderProps } from './context/RegistryContext'
export { useActionRegistry, useComponentRegistry } from './context/RegistryContext'

// Hooks
export { useBlockEvents } from './hooks/useBlockEvents'

// Components
export { BlockRenderer, type BlockRendererProps } from './components/BlockRenderer'
export { HtmlNode, type HtmlNodeConfig, type HtmlNodeProps } from './components/HtmlNode'

// Types
export type { DefaultBlockProps, BlockConfigOf } from './types/props'
