import addCircle from '../../assets/icons/sidebar/add-Circle.svg'

type PlusInputProps = {
  text: string
  icon?: string
  to?: string
  onClick?: () => void
}

const AddInput = ({ text, icon = addCircle, onClick }: PlusInputProps) => {
  return (
    <div className="add-input">
      <img className="add-input-icon" src={icon} />
      <span className="add-input-text" onClick={onClick}>
        {text}
      </span>
    </div>
  )
}

export default AddInput
