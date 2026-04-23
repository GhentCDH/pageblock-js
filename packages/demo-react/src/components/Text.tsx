import type { DefaultBlockProps, BlockConfigOf } from '@pageblocks/react'

type TextConfig = { content: string }
export type TextBlockConfig = BlockConfigOf<TextConfig, 'text'>
type TextProps = TextConfig & DefaultBlockProps

export function Text({ content }: TextProps) {
  return <>{content}</>
}
