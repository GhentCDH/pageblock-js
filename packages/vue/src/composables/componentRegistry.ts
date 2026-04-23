import { provide, inject, type InjectionKey } from 'vue'
import {type ComponentRegistry, createComponentRegistry} from '@pageblocks/core'

export const COMPONENT_REGISTRY_KEY: InjectionKey<ComponentRegistry> = Symbol('componentRegistry')

/** Call inside a component's setup() to make the component registry available to all descendant blocks. */
export function provideComponentRegistry(registry: ComponentRegistry): void {
  provide(COMPONENT_REGISTRY_KEY, registry)
}

/** Inject the component registry provided by an ancestor. Returns an empty registry if none was provided. */
export function useComponentRegistry(): ComponentRegistry {
  return inject(COMPONENT_REGISTRY_KEY, createComponentRegistry())
}
