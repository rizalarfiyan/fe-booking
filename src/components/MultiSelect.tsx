import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { type AlovaMethodHandler, useWatcher } from 'alova'
import type { IBaseResponse } from '@/types/base'
import useDebounce from '@hooks/useDebounce'
import {
  Command,
  CommandEmpty,
  CommandItem,
  CommandList,
} from '@components/Command'
import { cn } from '@utils/classes'
import { Badge } from '@components/Badge'
import { X } from 'lucide-react'
import { Command as CommandPrimitive } from 'cmdk'

export interface Option {
  value: string
  label: string
  disable?: boolean
  fixed?: boolean
  [key: string]: string | boolean | undefined
}

interface MultiSelectProps {
  value?: Option[]
  api: AlovaMethodHandler<
    any,
    unknown,
    IBaseResponse,
    unknown,
    any,
    Response,
    Headers
  >
  loadingIndicator?: React.ReactNode
  emptyIndicator?: React.ReactNode
  onChange?: (options: Option[]) => void
  commandProps?: React.ComponentPropsWithoutRef<typeof Command>
  disabled?: boolean
  className?: string
  badgeClassName?: string
  selectFirstItem?: boolean
  maxSelected?: number
  onMaxSelected?: (maxLimit: number) => void
  hidePlaceholderWhenSelected?: boolean
  placeholder?: string
  inputProps?: Omit<
    React.ComponentPropsWithoutRef<typeof CommandPrimitive.Input>,
    'value' | 'placeholder' | 'disabled'
  >
}

const DefaultLoadingIndicator = () => {
  return (
    <p className='py-6 text-center text-gray-600 text-lg leading-10 dark:text-gray-400'>
      Loading...
    </p>
  )
}

const DefaultEmptyIndicator = () => {
  return (
    <p className='text-center text-gray-600 text-lg leading-10 dark:text-gray-400'>
      Data not found.
    </p>
  )
}

const MultiSelect: React.FC<MultiSelectProps> = ({
  api,
  value,
  onChange,
  commandProps,
  disabled,
  className,
  badgeClassName,
  inputProps,
  loadingIndicator = <DefaultLoadingIndicator />,
  emptyIndicator = <DefaultEmptyIndicator />,
  selectFirstItem,
  maxSelected = Number.MAX_SAFE_INTEGER,
  onMaxSelected,
  hidePlaceholderWhenSelected,
  placeholder,
}) => {
  const inputRef = React.useRef<HTMLInputElement>(null)
  const [open, setOpen] = React.useState(false)
  const [selected, setSelected] = React.useState<Option[]>(value || [])
  const [search, setSearch] = useState<string>('')
  const searchDebounce = useDebounce(search, 500)

  const payload = useMemo(() => {
    return {
      count: 20,
      search: searchDebounce,
    }
  }, [searchDebounce])

  const { data, loading } = useWatcher(() => api(payload), [payload], {
    immediate: true,
    force: true,
    initialData: {
      data: [],
    },
  })

  const options: Option[] = data.data
  const handleUnselect = useCallback(
    (option: Option) => {
      const newOptions = selected.filter((s) => s.value !== option.value)
      setSelected(newOptions)
      onChange?.(newOptions)
    },
    [onChange, selected],
  )

  useEffect(() => {
    if (value) {
      setSelected(value)
    }
  }, [value])

  const EmptyItem = () => {
    if (!emptyIndicator || options.length !== 0) return null
    return <CommandEmpty>{emptyIndicator}</CommandEmpty>
  }

  const handleKeyDown = React.useCallback(
    (e: React.KeyboardEvent<HTMLDivElement>) => {
      const input = inputRef.current
      if (input) {
        if (e.key === 'Delete' || e.key === 'Backspace') {
          if (input.value === '' && selected.length > 0) {
            const lastSelectOption = selected[selected.length - 1]
            if (!lastSelectOption.fixed) {
              handleUnselect(selected[selected.length - 1])
            }
          }
        }
        if (e.key === 'Escape') {
          input.blur()
        }
      }
    },
    [handleUnselect, selected],
  )

  const selectables = React.useMemo<Option[]>(() => {
    return options.filter((option) => {
      return !selected.find((s) => s.value === option.value)
    })
  }, [options, selected])

  return (
    <Command
      {...commandProps}
      onKeyDown={(e) => {
        handleKeyDown(e)
        commandProps?.onKeyDown?.(e)
      }}
      className={cn(
        'h-auto overflow-visible bg-transparent',
        commandProps?.className,
      )}
      shouldFilter={
        commandProps?.shouldFilter !== undefined
          ? commandProps.shouldFilter
          : !loading
      }
      filter={commandProps?.filter}
    >
      {/* biome-ignore lint/a11y/useKeyWithClickEvents: TODO update later */}
      <div
        className={cn(
          'min-h-10 rounded-md border border-input text-sm ring-offset-background focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2',
          {
            'px-3 py-2': selected.length !== 0,
            'cursor-text': !disabled && selected.length !== 0,
          },
          className,
        )}
        onClick={() => {
          if (disabled) return
          inputRef.current?.focus()
        }}
      >
        <div className='flex flex-wrap gap-1'>
          {selected.map((option) => {
            return (
              <Badge
                key={option.value}
                className={cn(
                  'data-[disabled]:bg-muted-foreground data-[disabled]:hover:bg-muted-foreground data-[disabled]:text-muted',
                  'data-[fixed]:bg-muted-foreground data-[fixed]:hover:bg-muted-foreground data-[fixed]:text-muted',
                  badgeClassName,
                )}
                data-fixed={option.fixed}
                data-disabled={disabled || undefined}
              >
                {option.label}
                <button
                  type='button'
                  className={cn(
                    'ml-1 rounded-full outline-none ring-offset-background focus:ring-2 focus:ring-ring focus:ring-offset-2',
                    (disabled || option.fixed) && 'hidden',
                  )}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      handleUnselect(option)
                    }
                  }}
                  onMouseDown={(e) => {
                    e.preventDefault()
                    e.stopPropagation()
                  }}
                  onClick={() => handleUnselect(option)}
                >
                  <X className='h-3 w-3 text-muted-foreground hover:text-foreground' />
                </button>
              </Badge>
            )
          })}
          <CommandPrimitive.Input
            {...inputProps}
            ref={inputRef}
            value={search}
            disabled={disabled}
            onValueChange={(value) => {
              setSearch(value)
              inputProps?.onValueChange?.(value)
            }}
            onBlur={(event) => {
              setOpen(false)
              inputProps?.onBlur?.(event)
            }}
            onFocus={(event) => {
              setOpen(true)
              inputProps?.onFocus?.(event)
            }}
            placeholder={
              hidePlaceholderWhenSelected && selected.length !== 0
                ? ''
                : placeholder
            }
            className={cn(
              'flex-1 bg-transparent outline-none placeholder:text-muted-foreground',
              {
                'w-full': hidePlaceholderWhenSelected,
                'px-3 py-2': selected.length === 0,
                'ml-1': selected.length !== 0,
              },
              inputProps?.className,
            )}
          />
        </div>
      </div>
      <div className='relative'>
        {open && (
          <CommandList className='absolute top-1 z-10 w-full animate-in rounded-md border bg-popover text-popover-foreground shadow-md outline-none'>
            {loading ? (
              <>{loadingIndicator}</>
            ) : (
              <>
                <EmptyItem />
                {!selectFirstItem && (
                  <CommandItem value='-' className='hidden' />
                )}
                {selectables.map((option) => {
                  return (
                    <CommandItem
                      key={option.value}
                      value={option.value}
                      disabled={option.disable}
                      onMouseDown={(e) => {
                        e.preventDefault()
                        e.stopPropagation()
                      }}
                      onSelect={() => {
                        if (selected.length >= maxSelected) {
                          onMaxSelected?.(selected.length)
                          return
                        }
                        const newOptions = [...selected, option]
                        setSelected(newOptions)
                        onChange?.(newOptions)
                      }}
                      className={cn(
                        'cursor-pointer',
                        option.disable &&
                          'cursor-default text-muted-foreground',
                      )}
                    >
                      {option.label}
                    </CommandItem>
                  )
                })}
              </>
            )}
          </CommandList>
        )}
      </div>
    </Command>
  )
}

export default MultiSelect
