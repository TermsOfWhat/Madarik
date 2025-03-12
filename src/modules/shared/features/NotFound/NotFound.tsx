import { Button } from 'antd'
import Icon404 from './assets/icons/404.svg'
import { useNavigate } from 'react-router-dom'

const NotFound = () => {
  const navigate = useNavigate()
  const onGoHome = () => {
    return navigate('/')
  }
  return (
    <div className="not-found-page">
      <p className="not-found-title">Désolé, page introuvable !</p>
      <p className="subtitle-not-found">
        Désolé, nous n’avons pas trouvé la page que vous recherchez. Peut-être avez-vous mal saisi
        l'URL ? Être assurez-vous de vérifier votre orthographe.
      </p>
      <img src={Icon404} alt="" />
      <Button onClick={onGoHome} className="go-home-btn">
        Retourner a l'acceuil
      </Button>
    </div>
  )
}

export default NotFound
