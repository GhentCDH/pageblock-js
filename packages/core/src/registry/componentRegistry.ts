import {type Registry, createRegistry} from "./registry";

export type ComponentDefinition = Record<string, unknown>
export type ComponentRegistry = Registry<ComponentDefinition>;

export const createComponentRegistry = createRegistry<ComponentDefinition>;