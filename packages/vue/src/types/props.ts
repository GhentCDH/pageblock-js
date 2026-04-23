import type {BlockConfig, EventMap} from "@pageblocks/core";

// allow to extend BlockConfig with custom properties and override the type of _type property
export type defineBlockConfig<TConfig extends object, TType extends string = string> = BlockConfig & TConfig & { _type: TType }

// original version of the above util
// export type defineBlockConfig<T> = T & BlockConfig;

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
