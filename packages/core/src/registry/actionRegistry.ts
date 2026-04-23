import { type Registry, createRegistry } from "./registry";
import type {ActionHandler} from "../types/actions";

export type ActionRegistry = Registry<ActionHandler>

export const createActionRegistry = createRegistry<ActionHandler>;
