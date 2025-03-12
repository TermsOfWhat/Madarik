import { useEffect } from 'react'
import NProgress from 'accessible-nprogress'
import 'accessible-nprogress/dist/accessible-nprogress.css'

interface ILazyLoadProps {
  showSpinner?: boolean
}

const LazyLoad: React.FC<ILazyLoadProps> = ({ showSpinner = true }) => {
  useEffect(() => {
    NProgress.configure({ showSpinner })
    NProgress.start()

    return () => {
      NProgress.done()
    }
  })

  return null
}

export default LazyLoad
