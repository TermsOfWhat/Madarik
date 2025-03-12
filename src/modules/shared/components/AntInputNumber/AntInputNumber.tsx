import { CloseCircleOutlined } from '@ant-design/icons'
import { Input, InputNumber } from 'antd'
import './AntInputNumber.scss'
import { ReactNode, KeyboardEvent } from 'react'

interface IAntInputProps {
  formik?: any
  name: string
  label?: string
  placeholder?: string
  required?: boolean
  prefix?: ReactNode
  onChange?: (e: any) => void
  disabled?: boolean
  value?: any
  className?: string
  error?: string | undefined | null
}

const AntInputNumber = ({
  formik,
  name,
  label,
  placeholder,
  required,
  prefix,
  onChange,
  disabled,
  value,
  className,
  error,
}: IAntInputProps) => {
  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    const { key } = event
    if (
      key === '.' ||
      key === 'Backspace' ||
      key === 'Tab' ||
      key === 'ArrowLeft' ||
      key === 'ArrowRight'
    ) {
      return
    }
    if (!/^\d$/.test(key)) {
      event.preventDefault()
    }
  }
  return (
    <div className={`${className} ant-input-container`}>
      <label htmlFor={name} className="3">
        {label}
        {required && <span className="ant-input-required">*</span>}
      </label>

      <InputNumber
        disabled={disabled}
        size="large"
        id={name}
        name={name}
        placeholder={placeholder}
        value={value !== undefined ? value : formik?.values?.[name]}
        onChange={onChange || formik?.handleChange}
        onBlur={formik?.handleBlur}
        status={formik?.errors?.[name] && formik?.touched?.[name] ? 'error' : undefined}
        prefix={prefix}
        className="ant-input-input"
        controls={false}
        width={'100%'}
        onKeyDown={handleKeyDown}
      />

      {(error || (formik?.touched?.[name] && formik?.errors?.[name])) && (
        <p className="ant-input-error_txt">
          <CloseCircleOutlined />
          {error ? error : formik.errors?.[name]}
        </p>
      )}
    </div>
  )
}

type InputDefaultProps = Pick<IAntInputProps, 'formik' | any>

Input.defaultProps = {} as InputDefaultProps

export default AntInputNumber
