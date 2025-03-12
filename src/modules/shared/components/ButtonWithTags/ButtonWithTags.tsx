import CancelIcon from '../../assets/icons/ButtonWithTags/cancel.svg'
import CloseIcon from '../../assets/icons/ButtonWithTags/close.svg'
interface IButtonWithTabsProps {
  icon?: string
  label: string
  onClick?: () => void
  onRemoveTags: () => void
  tags: string[]
  className?: string
  showCancel?: boolean
  onCancel?: (e: any) => void
}
function ButtonWithTags({
  icon,
  label,
  tags,
  onClick,
  onRemoveTags,
  showCancel,
  onCancel,
  className,
  ...props
}: IButtonWithTabsProps) {
  const onClickClose = (e: React.MouseEvent<HTMLImageElement, MouseEvent>) => {
    e.stopPropagation()
    onRemoveTags()
  }
  return (
    <button className={`button-tags ${className}`} {...props} onClick={onClick}>
      {icon && <img src={icon} alt="" />}
      <span>{label}</span>
      {tags.length > 0 && (
        <>
          <div className="tags">
            {tags.map((tag, index) => {
              if (index < 3) {
                return <span className="tag">{tag}</span>
              } else return null
            })}
          </div>
          <img src={CloseIcon} alt="" className="close-icon" onClick={onClickClose} />
        </>
      )}
      {showCancel && <img src={CancelIcon} alt="" className="cancel-icon" onClick={onCancel} />}
    </button>
  )
}

export default ButtonWithTags
