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
}

const AntInputForDynamicArray = ({
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
}: IAntInputProps) => {
  const [passwordVisible, setPasswordVisible] = useState(false)

  const isArrayField = name.includes('[') && name.includes(']')
  const fieldParts = isArrayField ? name.match(/([^[]+)\[(\d+)\]\.(.+)/) : name.split('.')
  const field = fieldParts?.[1] ?? ''
  const index = isArrayField ? parseInt(fieldParts?.[2] ?? '') : null
  const subfield = isArrayField ? fieldParts?.[3] : fieldParts?.[1] ?? ''

  const isError =
    isArrayField && typeof index === 'number' && field && subfield
      ? formik?.touched?.[field]?.[index]?.[subfield] &&
        formik?.errors?.[field]?.[index]?.[subfield]
      : (formik?.errors?.[name] && formik?.touched?.[name]) ||
        (field &&
          subfield &&
          formik?.touched?.[field]?.[subfield] &&
          formik?.errors?.[field]?.[subfield])

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
            disabled={disabled}
            size="large"
            id={name}
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
          disabled={disabled}
          size="large"
          id={name}
          readOnly={readOnly}
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

      {isArrayField &&
        typeof index === 'number' &&
        field &&
        subfield &&
        formik?.touched?.[field]?.[index]?.[subfield] &&
        formik?.errors?.[field]?.[index]?.[subfield] && (
          <p className="ant-input-error_txt">
            <CloseCircleOutlined />
            {formik.errors[field]?.[index]?.[subfield]}
          </p>
        )}
      {!isArrayField && formik?.touched?.[name] && formik?.errors?.[name] && (
        <p className="ant-input-error_txt">
          <CloseCircleOutlined />
          {formik.errors?.[name]}
        </p>
      )}
      {!isArrayField &&
        name?.includes('.') &&
        field &&
        subfield &&
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

export default AntInputForDynamicArray
