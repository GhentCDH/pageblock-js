import { provide, inject, type InjectionKey } from 'vue'
import type { ActionDescriptor } from '../types/types'

export function createRegistry<T>(map: Record<string, T>) {
  return {
    resolve: (type: string): T | null => map[type] ?? null,
  }
}

// --- action registry ---

export interface ActionContext {
  action: string        // registered action name ("deleteItem")
  eventName: string     // what triggered it ("click", "inview", "outview", …)
  event: unknown        // DOM Event for native events; emitted value for component events; null for observer
  args: unknown[]       // all emitted arguments (always [Event] for native DOM events)
  blockType: string     // block's _type value ("button", "card", …)
  blockKey?: string     // block's _key value
  payload?: unknown     // custom payload from the action descriptor
}

export type ActionHandler = (ctx: ActionContext) => void

export interface ActionRegistry {
  dispatch(
    descriptor: ActionDescriptor,
    opts: Omit<ActionContext, 'action' | 'payload'>,
  ): void
}

export const ACTION_REGISTRY_KEY: InjectionKey<ActionRegistry> = Symbol('actionRegistry')

export function createActionRegistry(map: Record<string, ActionHandler>): ActionRegistry {
  return {
    dispatch(descriptor, opts) {
      const action = typeof descriptor === 'string' ? descriptor : descriptor.action
      const payload = typeof descriptor === 'object' ? descriptor.payload : undefined
      const ctx: ActionContext = { ...opts, action, payload }
      const handler = map[action]
      if (handler) {
        handler(ctx)
      } else if (import.meta.env.DEV) {
        console.warn(`[pageblocks] unknown action: "${action}"`)
      }
    },
  }
}

/** Call inside a component's setup() to make the action registry available to all descendant blocks. */
export function provideActionRegistry(handlers: Record<string, ActionHandler>) {
  provide(ACTION_REGISTRY_KEY, createActionRegistry(handlers))
}

/** Inject the action registry provided by an ancestor. Returns null if none was provided. */
export function useActionRegistry() {
  return inject(ACTION_REGISTRY_KEY, null)
}
