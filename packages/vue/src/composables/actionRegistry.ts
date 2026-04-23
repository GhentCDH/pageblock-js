import { provide, inject, type InjectionKey } from 'vue'
import {type ActionRegistry, createActionRegistry} from '@pageblocks/core'

export const ACTION_REGISTRY_KEY: InjectionKey<ActionRegistry> = Symbol('actionRegistry')

/** Call inside a component's setup() to make the action registry available to all descendant blocks. */
export function provideActionRegistry(registry: ActionRegistry): void {
  provide(ACTION_REGISTRY_KEY, registry)
}

/** Inject the action registry provided by an ancestor. Returns an empty registry if none was provided. */
export function useActionRegistry(): ActionRegistry {
  return inject(ACTION_REGISTRY_KEY, createActionRegistry())
}
