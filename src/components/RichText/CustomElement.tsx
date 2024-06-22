import type { RenderElementProps } from 'slate-react'
import type { CustomElement } from '@/types/richText'
import React from 'react'

type ElementProps = RenderElementProps & {
  element: CustomElement
}

const CustomElements: React.FC<ElementProps> = ({
  attributes,
  children,
  element,
}) => {
  switch (element.type) {
    case 'block-quote':
      return (
        <blockquote
          style={{
            textAlign: element.align,
          }}
          {...attributes}
        >
          {children}
        </blockquote>
      )
    case 'bulleted-list':
      return (
        <ul
          style={{
            textAlign: element.align,
          }}
          {...attributes}
        >
          {children}
        </ul>
      )
    case 'heading-one':
      return (
        <h1
          style={{
            textAlign: element.align,
          }}
          {...attributes}
        >
          {children}
        </h1>
      )
    case 'heading-two':
      return (
        <h2
          style={{
            textAlign: element.align,
          }}
          {...attributes}
        >
          {children}
        </h2>
      )
    case 'heading-three':
      return (
        <h3
          style={{
            textAlign: element.align,
          }}
          {...attributes}
        >
          {children}
        </h3>
      )
    case 'list-item':
      return (
        <li
          style={{
            textAlign: element.align,
          }}
          {...attributes}
        >
          {children}
        </li>
      )
    case 'numbered-list':
      return (
        <ol
          style={{
            textAlign: element.align,
          }}
          {...attributes}
        >
          {children}
        </ol>
      )
    default:
      return (
        <p
          style={{
            textAlign: element.align,
          }}
          {...attributes}
        >
          {children}
        </p>
      )
  }
}

export default CustomElements
