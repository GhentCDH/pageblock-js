import { createContext, useContext, type ComponentType, type ReactElement, type ReactNode } from 'react'
import { createRegistry, type Registry, type ActionRegistry, createActionRegistry } from '@pageblocks/core'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type ReactComponent = ComponentType<any>
export type ReactComponentRegistry = Registry<ReactComponent>

export function createComponentRegistry(init?: Record<string, ReactComponent>): ReactComponentRegistry {
  return createRegistry<ReactComponent>(init)
}

type RegistryContextValue = {
  actions: ActionRegistry
  components: ReactComponentRegistry
}

const RegistryContext = createContext<RegistryContextValue>({
  actions: createActionRegistry(),
  components: createComponentRegistry(),
})

export type RegistryProviderProps = {
  actions: ActionRegistry
  components: ReactComponentRegistry
  children: ReactNode
}

export function RegistryProvider({ actions, components, children }: RegistryProviderProps): ReactElement {
  return (
    <RegistryContext.Provider value={{ actions, components }}>
      {children}
    </RegistryContext.Provider>
  )
}

export function useActionRegistry(): ActionRegistry {
  return useContext(RegistryContext).actions
}

export function useComponentRegistry(): ReactComponentRegistry {
  return useContext(RegistryContext).components
}
