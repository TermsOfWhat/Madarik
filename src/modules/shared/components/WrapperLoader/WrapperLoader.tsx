import React from 'react'
import './_WrapperLoader.scss'

type WrapperLoaderProps = {
  children: React.ReactNode
  status: boolean
  size?: number
  color?: string
}

const WrapperLoader: React.FC<WrapperLoaderProps> = ({
  children,
  status,
  size = 24,
  color = '#3887d9',
}) => {
  return (
    <div className="wrapper-loader">
      {status && (
        <div className="loader-overlay">
          <div className="loader-icon" style={{ width: size, height: size, color }}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="icon-spin"
            >
              <path d="M12 22c5.421 0 10-4.579 10-10s-4.579-10-10-10-10 4.579-10 10h2c0-4.411 3.589-8 8-8s8 3.589 8 8-3.589 8-8 8v2z" />
            </svg>
          </div>
        </div>
      )}
      {children}
    </div>
  )
}

export default WrapperLoader
