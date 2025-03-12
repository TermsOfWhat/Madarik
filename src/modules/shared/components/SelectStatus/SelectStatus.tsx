import { Button, Popover, Space } from 'antd'

import whiteArrowDown from '../../assets/whiteArrowDown.svg'
import Diskette from '../../assets/Diskette.svg'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch } from '../../store'
import { closeModal } from '../../store/slices/modal/modalSlice'

function SelectStatus() {
  //const [activeStatus, setActiveStatus] = useState<string>('brouillon')

  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  const handleCancel = () => {
    navigate('/accounting/financial-statements')
    dispatch(closeModal('modal-bilan-description'))
  }

  const PopoverContent = () => {
    return (
      <div className="sauvegarder-select">
        {options.map((option) => (
          <div onClick={handleCancel} className="select-type">
            <p>Sauvegarder</p>
            <p className={`type type-${option.value}`}>{option.label}</p>
          </div>
        ))}
      </div>
    )
  }

  return (
    <Space.Compact className="select-status">
      <Button
        style={{
          background: '#3887D9',
        }}
        size="large"
        type="primary"
      >
        <img src={Diskette} alt="" />
        Sauvegarder et quitter
      </Button>
      <Popover placement="bottomRight" content={PopoverContent}>
        <Button
          style={{
            background: '#3887D9',
          }}
          size="large"
          type="primary"
        >
          <img src={whiteArrowDown} alt="" />
        </Button>
      </Popover>
    </Space.Compact>
  )
}

export default SelectStatus

const options = [
  { label: 'Brouillon', value: 'brouillon' },
  { label: 'Validé', value: 'validé' },
]
