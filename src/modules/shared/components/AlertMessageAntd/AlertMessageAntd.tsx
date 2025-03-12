import { message } from 'antd'
import error from '../../assets/icons/alert/error.svg'
import success from '../../assets/icons/alert/success.svg'
import close from '../../assets/icons/alert/close.svg'
import closeSuccess from '../../assets/icons/alert/closeSuccess.svg'
import { MessageType } from 'antd/es/message/interface'
import Button from '../Button/Button'

type button = {
  icon: string
  title: string
  onClick?: any
}
type MessageFunc = (
  text: string | string[],
  // duration in seconds
  duration?: number,
  onClose?: () => void,
  button?: button,
) => MessageType

interface CustomMessage {
  success: MessageFunc
  error: MessageFunc
  deleteSuccess: MessageFunc
}
type renderContentProps = {
  text: string | string[]
  iconClose: string
  button?: button
}
const renderContent = ({ text, iconClose, button = undefined }: renderContentProps) => (
  <div className="content">
    {Array.isArray(text) ? (
      <ul>
        {text.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    ) : (
      <span>{text}</span>
    )}
    {button && (
      <Button
        label={button?.title}
        variant="primary"
        outlined
        icon={button?.icon}
        onClick={() => {
          button?.onClick()

          message.destroy()
        }}
        // dir="ltr"
      />
    )}
    <img onClick={() => message.destroy()} src={iconClose} alt="close" />
  </div>
)

const AlertMessageAntd: CustomMessage = {
  success: (text, duration, onClose) => {
    return message.success({
      className: 'custom-alert custom-alert-success',
      content: renderContent({ text, iconClose: closeSuccess }),
      duration,
      onClose,
      icon: <img src={success} />,
    })
  },
  error: (text, duration, onClose) => {
    return message.error({
      className: 'custom-alert custom-alert-error',
      content: renderContent({ text, iconClose: close }),
      duration,
      onClose,
      icon: <img src={error} />,
    })
  },
  deleteSuccess: (text, duration, onClose, button) => {
    return message.success({
      className: 'custom-alert custom-alert-success',
      content: renderContent({
        text,
        iconClose: closeSuccess,
        button: {
          title: button?.title ?? '',
          icon: button?.icon ?? '',
          onClick: button?.onClick ?? undefined,
        },
      }),
      duration,
      onClose,
      icon: <img src={success} />,
    })
  },
}

export default AlertMessageAntd
