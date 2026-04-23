import { useBlockEvents, type DefaultBlockProps, type BlockConfigOf } from '@pageblocks/react'

type CardConfig = {
  id?: string
  title: string
  body?: string
  image?: string
  imageAlt?: string
  link?: { href: string; label: string }
  class?: string
}

export type CardBlockConfig = BlockConfigOf<CardConfig, 'card'>
type CardProps = CardConfig & DefaultBlockProps

export function Card({ title, body, image, imageAlt, link, class: className, blockType, blockKey, on }: CardProps) {
  const eventHandlers = useBlockEvents(on, blockType, blockKey)

  return (
    <article className={`card ${className ?? ''}`} {...eventHandlers}>
      {image && <img src={image} alt={imageAlt ?? ''} className="card__image" />}
      <div className="card__content">
        <h3 className="card__title">{title}</h3>
        {body && <p className="card__body">{body}</p>}
        {link && <a href={link.href} className="card__link">{link.label}</a>}
      </div>
    </article>
  )
}
