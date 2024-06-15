import { useCallback, useState } from 'react'

export interface UseDisclosure {
  isOpen: boolean
  open: () => void
  close: () => void
  toggle: () => void
  setIsOpen: (status: boolean) => void
}

interface UseDisclosureOptions {
  initial?: boolean
  onOpen?: () => void
  onClose?: () => void
}

export const useDisclosure = (props?: UseDisclosureOptions): UseDisclosure => {
  const { initial = false, onOpen, onClose } = props || {}
  const [isOpen, setIsOpen] = useState(initial)

  const open = useCallback(() => {
    setIsOpen(true)
    if (onOpen) {
      onOpen()
    }
  }, [onOpen])

  const close = useCallback(() => {
    setIsOpen(false)
    if (onClose) {
      onClose()
    }
  }, [onClose])

  const toggle = useCallback(() => setIsOpen((state) => !state), [])

  return { isOpen, open, close, toggle, setIsOpen }
}
