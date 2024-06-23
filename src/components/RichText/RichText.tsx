import isHotkey from 'is-hotkey'
import React, { useMemo } from 'react'
import { createEditor, type Descendant } from 'slate'
import { withHistory } from 'slate-history'
import {
  Editable,
  type RenderElementProps,
  type RenderLeafProps,
  Slate,
  withReact,
} from 'slate-react'
import { twMerge } from 'tailwind-merge'
import { toggleMark } from '@/utils/richText'
import ButtonToolbar from './ButtonToolbar'
import CustomElements from './CustomElement'
import CustomLeaf from './CustomLeaf'
import {
  AlignCenter,
  AlignJustify,
  AlignLeft,
  AlignRight,
  Bold,
  Code,
  Heading1,
  Heading2,
  Heading3,
  Italic,
  List,
  ListOrdered,
  Quote,
  Redo,
  Underline,
  Undo,
} from 'lucide-react'

const HOTKEYS = {
  'mod+b': 'bold',
  'mod+i': 'italic',
  'mod+u': 'underline',
  'mod+`': 'code',
}

export interface RichTextProps
  extends Omit<React.HTMLProps<HTMLDivElement>, 'onChange'> {
  id: string
  initialValue?: Descendant[]
  onChange?: (value: Descendant[]) => void
  toolbox?: 'format' | 'minimalist' | 'all'
}

const defaultInitialValue: Descendant[] = [
  {
    type: 'paragraph',
    children: [{ text: '' }],
  },
]

const RichText = React.forwardRef<HTMLDivElement, RichTextProps>(
  (
    {
      id,
      initialValue,
      onChange,
      disabled,
      toolbox = 'all',
      placeholder = 'Enter some rich text…',
      className,
      ...rest
    },
    ref,
  ) => {
    const editor = useMemo(() => withHistory(withReact(createEditor())), [])

    const renderElement = (props: RenderElementProps) => {
      return <CustomElements {...props} />
    }

    const renderLeaf = (props: RenderLeafProps) => {
      return <CustomLeaf {...props} />
    }

    const handleUndo = (event: React.MouseEvent<HTMLButtonElement>) => {
      event.preventDefault()
      editor.undo()
    }

    const handleRedo = (event: React.MouseEvent<HTMLButtonElement>) => {
      event.preventDefault()
      editor.redo()
    }

    const onValueChange = (value: Descendant[]) => {
      onChange?.(value)
    }

    return (
      <div
        ref={ref}
        className={twMerge(
          'w-full rounded-lg border',
          disabled && 'cursor-not-allowed opacity-75',
          className,
        )}
        {...rest}
      >
        <Slate
          editor={editor}
          initialValue={
            initialValue?.length === 0
              ? defaultInitialValue
              : initialValue || defaultInitialValue
          }
          onValueChange={onValueChange}
        >
          <div className='sticky top-[72px] z-30 rounded-t-md bg-muted'>
            <div className='flex items-center justify-between border-b px-3 py-2'>
              <div className='flex flex-wrap items-center gap-1.5'>
                <ButtonToolbar
                  disabled={disabled}
                  icon={Undo}
                  onClick={handleUndo}
                />
                <ButtonToolbar
                  disabled={disabled}
                  icon={Redo}
                  onClick={handleRedo}
                />
                <div className='mx-1 block h-7 w-[1px] bg-border dark:bg-slate-700' />
                <ButtonToolbar
                  disabled={disabled}
                  type='mark'
                  format='bold'
                  icon={Bold}
                />
                <ButtonToolbar
                  disabled={disabled}
                  type='mark'
                  format='italic'
                  icon={Italic}
                />
                <ButtonToolbar
                  disabled={disabled}
                  type='mark'
                  format='underline'
                  icon={Underline}
                />
                {['all', 'minimalist'].includes(toolbox) && (
                  <>
                    {toolbox === 'all' && (
                      <ButtonToolbar
                        disabled={disabled}
                        type='mark'
                        format='code'
                        icon={Code}
                      />
                    )}
                    <div className='mx-1 block h-7 w-[1px] bg-border dark:bg-slate-700' />
                    {toolbox === 'all' && (
                      <>
                        <ButtonToolbar
                          disabled={disabled}
                          type='block'
                          format='heading-one'
                          icon={Heading1}
                        />
                        <ButtonToolbar
                          disabled={disabled}
                          type='block'
                          format='heading-two'
                          icon={Heading2}
                        />
                        <ButtonToolbar
                          disabled={disabled}
                          type='block'
                          format='heading-three'
                          icon={Heading3}
                        />
                        <ButtonToolbar
                          disabled={disabled}
                          type='block'
                          format='block-quote'
                          icon={Quote}
                        />
                      </>
                    )}
                    <ButtonToolbar
                      disabled={disabled}
                      type='block'
                      format='bulleted-list'
                      icon={List}
                    />
                    <ButtonToolbar
                      disabled={disabled}
                      type='block'
                      format='numbered-list'
                      icon={ListOrdered}
                    />
                    <div className='mx-1 block h-7 w-[1px] bg-border dark:bg-slate-700' />
                    <ButtonToolbar
                      disabled={disabled}
                      type='block'
                      format='left'
                      icon={AlignLeft}
                    />
                    <ButtonToolbar
                      disabled={disabled}
                      type='block'
                      format='center'
                      icon={AlignCenter}
                    />
                    <ButtonToolbar
                      disabled={disabled}
                      type='block'
                      format='right'
                      icon={AlignRight}
                    />
                    <ButtonToolbar
                      disabled={disabled}
                      type='block'
                      format='justify'
                      icon={AlignJustify}
                    />
                  </>
                )}
              </div>
            </div>
          </div>
          <div className='prose prose-slate max-w-full rounded-lg bg-background'>
            <Editable
              id={id}
              className='!min-h-[260px] mt-[1px] block w-full rounded-br-lg rounded-bl-lg border-0 bg-background p-4 text-slate-800 text-sm outline-primary-500 focus:border-primary-500 dark:text-white focus:ring-primary-500'
              renderElement={renderElement}
              renderLeaf={renderLeaf}
              placeholder={placeholder}
              spellCheck
              readOnly={disabled}
              renderPlaceholder={({ children, attributes }) => (
                <span className='right-0 left-0 p-4' {...attributes}>
                  {children}
                </span>
              )}
              onKeyDown={(event) => {
                for (const hotkey in HOTKEYS) {
                  if (isHotkey(hotkey, event as any)) {
                    event.preventDefault()
                    const mark = HOTKEYS[hotkey as keyof typeof HOTKEYS]
                    toggleMark(editor, mark)
                  }
                }
              }}
            />
          </div>
        </Slate>
      </div>
    )
  },
)

export default RichText
