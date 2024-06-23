import type * as CSS from 'csstype'
import type { BaseEditor, BaseRange, Descendant, Element, Range } from 'slate'
import type { HistoryEditor } from 'slate-history'
import type { ReactEditor } from 'slate-react'

export type BlockQuoteElement = {
  type: 'block-quote'
  align?: CSS.Property.TextAlign
  children: Descendant[]
}

export type BulletedListElement = {
  type: 'bulleted-list'
  align?: CSS.Property.TextAlign
  children: Descendant[]
}

export type HeadingOneElement = {
  type: 'heading-one'
  align?: CSS.Property.TextAlign
  children: Descendant[]
}

export type HeadingTwoElement = {
  type: 'heading-two'
  align?: CSS.Property.TextAlign
  children: Descendant[]
}

export type HeadingThreeElement = {
  type: 'heading-three'
  align?: CSS.Property.TextAlign
  children: Descendant[]
}

export type ListItemElement = {
  type: 'list-item'
  align?: CSS.Property.TextAlign
  children: Descendant[]
}

export type NumberedItemElement = {
  type: 'numbered-list'
  align?: CSS.Property.TextAlign
  children: Descendant[]
}

export type ParagraphElement = {
  type: 'paragraph'
  align?: CSS.Property.TextAlign
  children: Descendant[]
}

export type CustomElement =
  | BlockQuoteElement
  | BulletedListElement
  | HeadingOneElement
  | HeadingTwoElement
  | HeadingThreeElement
  | ListItemElement
  | NumberedItemElement
  | ParagraphElement

export type CustomText = {
  bold?: boolean
  italic?: boolean
  underline?: boolean
  code?: boolean
  text: string
}

export type EmptyText = {
  text: string
}

export type CustomEditor = BaseEditor &
  ReactEditor &
  HistoryEditor & {
    nodeToDecorations?: Map<Element, Range[]>
  }

declare module 'slate' {
  interface CustomTypes {
    Editor: CustomEditor
    Element: CustomElement
    Text: CustomText | EmptyText
    Range: BaseRange & {
      [key: string]: unknown
    }
  }
}
