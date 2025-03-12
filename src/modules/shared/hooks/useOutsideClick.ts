import { useEffect } from 'react'

export function useOutsideClick(
  enabled: boolean,
  elementRef: React.MutableRefObject<HTMLElement | null>,
  cb: () => void,
) {
  useEffect(() => {
    if (!enabled) return
    const element = elementRef.current
    if (!element) return

    const handleClickOutside = (event: MouseEvent) => {
      if (element && !element.contains(event.target as Node)) {
        cb()
      }

      console.log('clicked outside')
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [enabled, elementRef, cb])
}
