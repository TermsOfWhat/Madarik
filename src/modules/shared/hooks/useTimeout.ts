import { useCallback, useEffect, useRef } from 'react'

// eslint-disable-next-line @typescript-eslint/ban-types
export default function useTimeout(callback: Function, delay: number) {
  const callbackRef = useRef(callback)
  const timeoutRef = useRef() as React.MutableRefObject<ReturnType<typeof setTimeout>>

  useEffect(() => {
    callbackRef.current = callback
  }, [callback])

  const set = useCallback(() => {
    timeoutRef.current = setTimeout(() => callbackRef.current(), delay)
  }, [delay])

  const clear = useCallback(() => {
    timeoutRef.current && clearTimeout(timeoutRef.current)
  }, [])

  useEffect(() => {
    set()
    return clear
  }, [delay, set, clear])

  const reset = useCallback(() => {
    clear()
    set()
  }, [clear, set])

  return { reset, clear }
}
