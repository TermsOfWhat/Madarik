import { HTMLAttributes, ReactNode } from 'react'
import { ForwardRefExoticComponent } from 'react'
import { AntdIconProps } from '@ant-design/icons/lib/components/AntdIcon'
import close from '../../assets/x.svg'
interface IButtonProps extends HTMLAttributes<HTMLButtonElement> {
  IconComponent?: ForwardRefExoticComponent<AntdIconProps & React.RefAttributes<HTMLSpanElement>>
  icon?: string
  prefix?: string
  label?: string
  variant?: 'primary' | 'info' | 'success' | 'danger' | 'warning' | 'dark' | 'secondary' | 'light'
  size?: 'sm' | 'md' | 'lg' | 'xl'
  outlined?: boolean
  rounded?: boolean
  disabled?: boolean
  loading?: boolean
  type?: 'button' | 'submit' | 'reset'
  children?: ReactNode
  form?: string
  nestedComponent?: ReactNode
  color?: string
  value?: string
  closeFn?: () => void
  showLabel?: boolean
}

const Button: React.FC<IButtonProps> = ({
  IconComponent,
  icon = '',
  label = 'Button',
  variant = 'primary',
  size = 'md',
  outlined = false,
  rounded = false,
  disabled = false,
  children,
  loading,
  form,
  nestedComponent,
  prefix,
  color,
  value,
  closeFn,
  showLabel = false,
  ...props
}) => {
  return (
    <button
      style={{
        color,
      }}
      form={form}
      className={[
        'btn',
        `btn-${size}`,
        `${outlined ? 'btn-outlined' : 'btn'}-${variant}`,
        `${rounded ? 'btn-rounded' : ''}`,
        `${disabled ? 'btn-disabled' : ''}`,
        `${!label ? 'btn-no-label' : ''}`,
      ].join(' ')}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? (
        'loading...'
      ) : children ? (
        children
      ) : (
        <>
          {IconComponent && <IconComponent className="button-icon" />}
          {icon && <img src={icon} alt="icon" className="icon icon-button" />}
          {value ? <div className="btn-value">{value}</div> : label}
          {value ? <img src={close} onClick={closeFn} alt="close" className="icon" /> : null}
          {nestedComponent && <div>{nestedComponent}</div>}
          {prefix && <img src={prefix} alt="icon" className="icon prefix-icon" />}
        </>
      )}
    </button>
  )
}
export default Button
