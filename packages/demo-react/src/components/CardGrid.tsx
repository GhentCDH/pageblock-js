import { useBlockEvents, type DefaultBlockProps, type BlockConfigOf } from '@pageblocks/react'
import { Card, type CardBlockConfig } from './Card'

type CardGridConfig = {
  children: CardBlockConfig[]
}

export type CardGridBlockConfig = BlockConfigOf<CardGridConfig, 'card-grid'>
type CardGridProps = CardGridConfig & DefaultBlockProps

export function CardGrid({ children, blockType, blockKey, on }: CardGridProps) {
  const eventHandlers = useBlockEvents(on, blockType, blockKey)

  return (
    <div className="card-grid" {...eventHandlers}>
      {children.map((card, i) => (
        <Card
          key={card._key ?? card.id ?? i}
          blockType={card._type}
          blockKey={card._key}
          on={card.on}
          title={card.title}
          body={card.body}
          image={card.image}
          imageAlt={card.imageAlt}
          link={card.link}
          id={card.id}
          class={card.class}
        />
      ))}
    </div>
  )
}
