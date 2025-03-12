import { useCallback, useEffect } from 'react'

interface UseKeyPressOptions {
  key: string
  callback: () => void
  conditions?: boolean[]
}

export const useKeyPress = ({ key, callback, conditions = [] }: UseKeyPressOptions) => {
  const handleKeyPress = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === key && conditions.every(Boolean)) {
        callback()
      }
    },
    [key, callback, conditions],
  )

  useEffect(() => {
    document.addEventListener('keydown', handleKeyPress)
    return () => {
      document.removeEventListener('keydown', handleKeyPress)
    }
  }, [handleKeyPress])
}
