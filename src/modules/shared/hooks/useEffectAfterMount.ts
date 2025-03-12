import { EffectCallback } from 'react'

import { useRef } from 'react'

import { useEffect } from 'react'

export default function useEffectAfterMount(fn: EffectCallback, deps: any[] = []) {
  const isMounted = useRef(false)

  useEffect(() => {
    if (!isMounted.current) {
      isMounted.current = true
      return
    }
    fn()
  }, deps)
}
