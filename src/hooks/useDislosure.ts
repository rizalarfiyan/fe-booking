import { useState, useCallback, useRef } from 'react'

export interface UseDisclosure {
  isOpen: boolean
  open: (isForce?: boolean) => void
  close: (isForce?: boolean) => void
  toggle: (isForce?: boolean) => void
  setIsOpen: (status: boolean) => void
  enable: () => void
  disable: () => void
}

interface UseDisclosureOptions {
  initial?: boolean
  onOpen?: () => void
  onClose?: () => void
}

export const useDisclosure = ({
  initial = false,
  onOpen,
  onClose,
}: UseDisclosureOptions = {}): UseDisclosure => {
  const [isOpen, setIsOpen] = useState(initial)
  const isEnable = useRef(true)

  const open = useCallback(
    (isForce = false) => {
      if (!isForce && !isEnable.current) return
      setIsOpen(true)
      if (onOpen) {
        onOpen()
      }
    },
    [onOpen],
  )

  const close = useCallback(
    (isForce = false) => {
      if (!isForce && !isEnable.current) return
      setIsOpen(false)
      if (onClose) {
        onClose()
      }
    },
    [onClose],
  )

  const toggle = useCallback(
    (isForce = false) => {
      if (!isForce && !isEnable.current) return
      setIsOpen((state) => {
        const newState = !state
        if (newState && onOpen) {
          onOpen()
        } else if (!newState && onClose) {
          onClose()
        }
        return newState
      })
    },
    [onOpen, onClose],
  )

  const enable = useCallback(() => {
    isEnable.current = true
  }, [])

  const disable = useCallback(() => {
    isEnable.current = false
  }, [])

  return { isOpen, open, close, toggle, setIsOpen, enable, disable }
}
