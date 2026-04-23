import type { BlockConfig, EventMap } from '@pageblocks/core'

export type BlockConfigOf<TConfig extends object, TType extends string = string> = BlockConfig & TConfig & { _type: TType }

export type DefaultBlockProps = {
  blockType: string
  blockKey?: string
  on?: EventMap
}
