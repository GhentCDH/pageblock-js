export type ActionDescriptor = string | { action: string; payload?: unknown }
export type EventMap = Record<string, ActionDescriptor | ActionDescriptor[]>

export type BlockConfig = {
    _type: string
    _key?: string  // logical identifier for action dispatch; never rendered to DOM
    on?: EventMap
}
