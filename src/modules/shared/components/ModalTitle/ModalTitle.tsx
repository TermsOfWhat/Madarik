type modalTitleProps = {
  title: string
  icon?: string
}

const ModalTitle = ({ title, icon }: modalTitleProps) => {
  return (
    <div className="modal-title">
      {icon && <img src={icon} alt="icon" />}
      <h1>{title}</h1>
    </div>
  )
}

export default ModalTitle
