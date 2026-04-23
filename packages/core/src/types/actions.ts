export interface ActionContext {
    action: string        // registered action name ("deleteItem")
    eventName: string     // what triggered it ("click", "inview", "outview", …)
    event: unknown        // DOM Event for native events; emitted value for component events; null for observer
    args: unknown[]       // all emitted arguments (always [Event] for native DOM events)
    blockType: string     // block's _type value ("button", "card", …)
    blockKey?: string     // block's _key value
    payload?: unknown     // custom payload from the action descriptor
}

export type ActionHandler = (ctx: ActionContext) => void;