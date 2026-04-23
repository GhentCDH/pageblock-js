import {computed} from 'vue'
import {createActionDispatcher, type EventMap} from '@pageblocks/core'
import {toArray} from '@pageblocks/core'
import {useActionRegistry} from './actionRegistry'

export function useBlockEvents(
    getProps: () => { on?: EventMap; blockKey?: string; blockType: string },
) {
    const actionRegistry = useActionRegistry()
    const actionDispatcher = createActionDispatcher(actionRegistry)

    const domHandlers = computed(() => {
        const {on, blockKey, blockType} = getProps()
        if (!on) return {}
        return Object.fromEntries(
            Object.entries(on).map(([eventName, descriptors]) => [
                eventName,
                (...args: unknown[]) => {
                    const opts = {eventName, event: args[0] ?? null, args, blockType, blockKey}
                    toArray(descriptors).forEach(d => actionDispatcher.dispatch(d, opts))
                },
            ])
        )
    })

    return {domHandlers}
}
