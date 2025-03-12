import { Button } from 'antd'
import Icon404 from './assets/icons/403.svg'
import { useNavigate } from 'react-router-dom'

const Forbidden = () => {
  const navigate = useNavigate()
  const onGoHome = () => {
    return navigate('/entreprise')
  }
  return (
    <div className="not-permission-page">
      <p className="not-permission-title">Autorisation refusée</p>
      <p className="subtitle-not-permission">Vous n'êtes pas autorisé à accéder à cette page</p>
      <img src={Icon404} alt="" />
      <Button onClick={onGoHome} className="go-back-btn">
        Retourner
      </Button>
    </div>
  )
}

export default Forbidden
