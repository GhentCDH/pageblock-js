import type {BlockConfig, EventMap} from "@pageblocks/core";

// allow to extend BlockConfig with custom properties and override the type of _type property
export type BlockConfigOf<TConfig extends object, TType extends string = string> = BlockConfig & TConfig & { _type: TType }

// previous name: defineBlockConfig — renamed to BlockConfigOf for clarity

// export type defineBlockProps<T> = {
//   blockType: string
//   blockKey?: string
//   on?: EventMap
// } & T;

export type DefaultBlockProps = {
  blockType: string
  blockKey?: string
  on?: EventMap
}
