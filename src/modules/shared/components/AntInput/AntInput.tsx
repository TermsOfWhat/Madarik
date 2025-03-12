import { CloseCircleOutlined, EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons'
import { Input, Space } from 'antd'
import { ReactNode, useState } from 'react'
import './AntInput.scss'

interface IAntInputProps {
  formik?: any
  type?: string
  name: string
  label?: string
  placeholder?: string
  required?: boolean
  prefix?: ReactNode
  suffix?: ReactNode
  onChange?: (e: any) => void
  disabled?: boolean
  value?: any
  className?: string
  spaceCompact?: string
  readOnly?: boolean
  onKeyDown?: (e: any) => void
  max?: string
  min?: string
}

const AntInput = ({
  formik,
  type,
  name,
  label,
  placeholder,
  required,
  prefix,
  suffix,
  onChange,
  disabled,
  value,
  className,
  spaceCompact = '',
  readOnly = false,
  onKeyDown,
  max,
  min,
}: IAntInputProps) => {
  const [passwordVisible, setPasswordVisible] = useState(false)

  const field = name?.includes('.') ? name?.split('.')?.[0] : ''
  const subfield = name?.includes('.') ? name?.split('.')?.[1] : ''

  const isError =
    (formik?.errors?.[name] && formik?.touched?.[name]) ||
    (formik?.touched?.[field]?.[subfield] && formik?.errors?.[field]?.[subfield])

  return (
    <div className={`${className} ant-input-container`}>
      <label htmlFor={name} className="3">
        {label}
        {required && <span className="ant-input-required">*</span>}
      </label>
      {spaceCompact ? (
        <Space.Compact className="input-space-compact">
          <Input
            style={{ width: '3.5rem', minWidth: '3.5rem' }}
            defaultValue={spaceCompact}
            disabled={true}
          />
          <Input
            max={max}
            min={min}
            disabled={disabled}
            size="large"
            id={name}
            onKeyDown={onKeyDown}
            name={name}
            readOnly={readOnly}
            type={type !== 'password' ? type : passwordVisible ? 'text' : 'password'}
            placeholder={placeholder}
            value={value ? value : formik?.values?.[name]}
            onChange={onChange || formik?.handleChange}
            onBlur={formik?.handleBlur}
            status={isError ? 'error' : undefined}
            prefix={prefix}
            className="ant-input-input"
            suffix={
              suffix
                ? suffix
                : type === 'password' &&
                  (passwordVisible ? (
                    <EyeTwoTone onClick={() => setPasswordVisible(!passwordVisible)} />
                  ) : (
                    <EyeInvisibleOutlined onClick={() => setPasswordVisible(!passwordVisible)} />
                  ))
            }
          />
        </Space.Compact>
      ) : (
        <Input
          max={max}
          disabled={disabled}
          size="large"
          id={name}
          readOnly={readOnly}
          onKeyDown={onKeyDown}
          name={name}
          type={type !== 'password' ? type : passwordVisible ? 'text' : 'password'}
          placeholder={placeholder}
          value={value ? value : formik?.values?.[name]}
          onChange={onChange || formik?.handleChange}
          onBlur={formik?.handleBlur}
          status={isError ? 'error' : undefined}
          prefix={prefix}
          className="ant-input-input"
          suffix={
            suffix
              ? suffix
              : type === 'password' &&
                (passwordVisible ? (
                  <EyeTwoTone onClick={() => setPasswordVisible(!passwordVisible)} />
                ) : (
                  <EyeInvisibleOutlined onClick={() => setPasswordVisible(!passwordVisible)} />
                ))
          }
        />
      )}

      {formik?.touched?.[name] && formik?.errors?.[name] && (
        <p className="ant-input-error_txt">
          <CloseCircleOutlined />
          {formik.errors?.[name]}
        </p>
      )}
      {name?.includes('.') &&
        formik?.touched?.[field]?.[subfield] &&
        formik?.errors?.[field]?.[subfield] && (
          <p className="ant-input-error_txt">
            <CloseCircleOutlined />
            {formik?.errors[field][subfield]}
          </p>
        )}
    </div>
  )
}

type InputDefaultProps = Pick<IAntInputProps, 'formik' | any>

Input.defaultProps = {
  field: {
    type: 'text',
  },
} as InputDefaultProps

export default AntInput
