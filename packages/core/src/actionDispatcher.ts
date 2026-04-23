import type {ActionContext, ActionDescriptor} from './types'
import type {ActionRegistry} from "./registry";

export interface ActionDispatcher {
  dispatch(
    descriptor: ActionDescriptor,
    opts: Omit<ActionContext, 'action' | 'payload'>,
  ): void
}

export function createActionDispatcher(registry: ActionRegistry): ActionDispatcher {
  return {
    dispatch(descriptor, opts) {
      const action = typeof descriptor === 'string' ? descriptor : descriptor.action
      const payload = typeof descriptor === 'object' ? descriptor.payload : undefined
      const ctx: ActionContext = { ...opts, action, payload }
      const handler = registry.resolve(action)
      if (handler) {
        handler(ctx)
      } else if (typeof process !== 'undefined' && process.env['NODE_ENV'] !== 'production') {
        console.warn(`[pageblocks] unknown action: "${action}"`)
      }
    },
  }
}
