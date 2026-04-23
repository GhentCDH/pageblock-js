import { useEffect, useRef } from 'react'
import {
  BlockRenderer,
  createActionDispatcher,
  toArray,
  useActionRegistry,
  type BlockConfig,
  type DefaultBlockProps,
  type BlockConfigOf,
  type EventMap,
} from '@pageblocks/react'

type ObserverConfig = {
  on: Pick<EventMap, 'inview' | 'outview'> & EventMap
  children?: BlockConfig[]
  class?: string
}

export type ObserverBlockConfig = BlockConfigOf<ObserverConfig, 'observer'>
type ObserverProps = ObserverConfig & DefaultBlockProps

export function Observer({ on, children: blocks, blockType, blockKey, class: className }: ObserverProps) {
  const rootRef = useRef<HTMLDivElement>(null)
  const actionRegistry = useActionRegistry()

  useEffect(() => {
    if (!rootRef.current) return
    const { inview, outview } = on
    if (!inview && !outview) return

    const actionDispatcher = createActionDispatcher(actionRegistry)
    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting && inview) {
          const opts = { eventName: 'inview', event: null, args: [], blockType, blockKey }
          toArray(inview).forEach(d => actionDispatcher.dispatch(d, opts))
        }
        if (!entry.isIntersecting && outview) {
          const opts = { eventName: 'outview', event: null, args: [], blockType, blockKey }
          toArray(outview).forEach(d => actionDispatcher.dispatch(d, opts))
        }
      }
    })
    observer.observe(rootRef.current)
    return () => observer.disconnect()
  }, [actionRegistry, on, blockType, blockKey])

  return (
    <div ref={rootRef} className={className}>
      {blocks && <BlockRenderer blocks={blocks} />}
    </div>
  )
}
