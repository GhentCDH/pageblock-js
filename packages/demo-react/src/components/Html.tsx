import type { DefaultBlockProps, BlockConfigOf } from '@pageblocks/react'

type HtmlConfig = { content: string }
export type HtmlBlockConfig = BlockConfigOf<HtmlConfig, 'html'>
type HtmlProps = HtmlConfig & DefaultBlockProps

export function Html({ content }: HtmlProps) {
  return <div dangerouslySetInnerHTML={{ __html: content }} />
}
