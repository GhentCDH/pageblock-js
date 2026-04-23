import { marked } from 'marked'
import type { DefaultBlockProps, BlockConfigOf } from '@pageblocks/react'

type MarkdownConfig = { content: string }
export type MarkdownBlockConfig = BlockConfigOf<MarkdownConfig, 'markdown'>
type MarkdownProps = MarkdownConfig & DefaultBlockProps

export function Markdown({ content }: MarkdownProps) {
  const html = String(marked.parse(content))
  return <div dangerouslySetInnerHTML={{ __html: html }} />
}
