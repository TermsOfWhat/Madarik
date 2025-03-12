import { ReactNode } from 'react'
import retourIcon from '../../../accounting/assets/icons/retour.svg'
import { Link } from 'react-router-dom'

type headerProps = {
  title: string | undefined
  children?: ReactNode[] | ReactNode
  retourUrl?: string
  onBack?: () => void
}

const ViewTitle = ({ title, children, retourUrl = '', onBack }: headerProps) => {
  return (
    <header
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}
    >
      <div className="title">
        {retourUrl && (
          <Link to={retourUrl} onClick={onBack}>
            <img src={retourIcon} alt="return icon" />
          </Link>
        )}
        <h1>{title || ''}</h1>
      </div>
      <div className="actions">{children}</div>
    </header>
  )
}

export default ViewTitle
