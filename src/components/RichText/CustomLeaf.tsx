import type { RenderLeafProps } from 'slate-react'
import type { CustomText } from '@/types/richText'
import React from 'react'

type LeafProps = RenderLeafProps & {
  leaf: CustomText
}

const CustomLeaf: React.FC<LeafProps> = ({ attributes, children, leaf }) => {
  if (leaf.bold) {
    children = <strong>{children}</strong>
  }

  if (leaf.code) {
    children = <code>{children}</code>
  }

  if (leaf.italic) {
    children = <em>{children}</em>
  }

  if (leaf.underline) {
    children = <u>{children}</u>
  }

  return <span {...attributes}>{children}</span>
}

export default CustomLeaf
