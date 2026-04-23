import { type ReactElement } from 'react'
import type { BlockConfig, ActionRegistry } from '@pageblocks/core'
import {
  RegistryProvider,
  useActionRegistry,
  useComponentRegistry,
  type ReactComponentRegistry,
} from '../context/RegistryContext'
import { HtmlNode, type HtmlNodeProps } from './HtmlNode'

export type BlockRendererProps = {
  blocks: BlockConfig[]
  actions?: ActionRegistry
  components?: ReactComponentRegistry
}

export function BlockRenderer({ blocks, actions, components }: BlockRendererProps): ReactElement {
  const inheritedActions = useActionRegistry()
  const inheritedComponents = useComponentRegistry()

  const actionRegistry = actions ?? inheritedActions
  const componentRegistry = components ?? inheritedComponents

  const rendered = blocks.map((block, i) => {
    const { _type, _key, ...rest } = block as unknown as Record<string, unknown>
    const key = (_key as string | undefined) ?? `${String(_type)}-${i}`
    const Component = componentRegistry.resolve(String(_type))

    if (Component) {
      return (
        <Component
          key={key}
          blockType={_type}
          blockKey={_key}
          {...rest}
        />
      )
    }

    return (
      <HtmlNode
        key={key}
        blockType={String(_type)}
        blockKey={_key as string | undefined}
        {...(rest as Omit<HtmlNodeProps, 'blockType' | 'blockKey'>)}
      />
    )
  })

  // Only introduce a new provider when props override the inherited registries
  if (!actions && !components) return <>{rendered}</>

  return (
    <RegistryProvider actions={actionRegistry} components={componentRegistry}>
      {rendered}
    </RegistryProvider>
  )
}
