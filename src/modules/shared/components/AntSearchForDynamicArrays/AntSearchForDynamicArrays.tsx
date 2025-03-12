import { CloseCircleOutlined } from '@ant-design/icons'
import { Select, SelectProps, Spin } from 'antd'
import debounce from 'lodash/debounce'
import { ReactNode, useMemo, useRef, useState } from 'react'

export interface DebounceSelectProps<ValueType = any>
  extends Omit<SelectProps<ValueType | ValueType[]>, 'options' | 'children'> {
  fetchOptions: (search: string) => Promise<ValueType[]>
  debounceTimeout?: number
  formik?: any
  type?: string
  name: string
  label?: string
  prefix?: ReactNode
  suffix?: ReactNode
  required?: boolean
  placeholder?: string
  disabled?: boolean
  value?: any
  multiple?: boolean
  hideLabel?: boolean
  initOptions?: { label: string; value: string }[]
}

function AntSearchForDynamicArrays<
  ValueType extends {
    key?: string
    label: React.ReactNode
    value: string | number
  } = any,
>({
  formik,
  name,
  label,
  placeholder,
  required,
  disabled,
  fetchOptions,
  debounceTimeout = 800,
  value,
  multiple,
  hideLabel,
  initOptions = [],
  ...props
}: DebounceSelectProps<ValueType>) {
  const [fetching, setFetching] = useState(false)
  const [options, setOptions] = useState<ValueType[]>([])
  const fetchRef = useRef(0)

  const debounceFetcher = useMemo(() => {
    const loadOptions = (value: string) => {
      if (!fetchOptions) return

      fetchRef.current += 1
      const fetchId = fetchRef.current
      setFetching(true)
      fetchOptions(value).then((newOptions) => {
        if (fetchId !== fetchRef.current) {
          return
        }

        setOptions(newOptions)
        setFetching(false)
      })
    }

    return debounce(loadOptions, debounceTimeout)
  }, [fetchOptions, debounceTimeout])

  const getNestedValue = (obj: any, path: string) => {
    const parts = path.split('.')
    let current = obj
    for (const part of parts) {
      if (part.includes('[')) {
        const [arrayName, index] = part.split(/[[\]]/)
        current = current?.[arrayName]?.[parseInt(index)]
      } else {
        current = current?.[part]
      }
      if (current === undefined) break
    }
    return current
  }

  const hasError = useMemo(() => {
    const error = getNestedValue(formik?.errors, name)
    const touched = getNestedValue(formik?.touched, name)
    return error && touched
  }, [formik?.errors, formik?.touched, name])

  const handleBlur = () => {
    const parts = name.split('.')
    let current = formik?.touched
    if (parts.length === 0 || !name.includes('.')) return
    for (let i = 0; i < parts.length - 1; i++) {
      const part = parts[i]
      if (part.includes('[')) {
        const [arrayName, index] = part.split(/[[\]]/)
        current[arrayName] = current[arrayName] || []
        current[arrayName][parseInt(index)] = current[arrayName][parseInt(index)] || {}
        current = current[arrayName][parseInt(index)]
      } else {
        current[part] = current[part] || {}
        current = current[part]
      }
    }
    current[parts[parts.length - 1]] = true
    formik.setTouched(formik.touched)
  }

  return (
    <div className="ant-input-container">
      {!hideLabel && (
        <label htmlFor={name} className="ant-select-label">
          {label}
          {required && <span className="ant-input-required">*</span>}
        </label>
      )}

      <Select
        filterOption={false}
        onSearch={debounceFetcher}
        notFoundContent={fetching ? <Spin size="small" /> : null}
        options={options.length > 0 ? options : initOptions}
        disabled={disabled}
        size="large"
        mode={multiple ? 'multiple' : undefined}
        value={value}
        placeholder={placeholder}
        onBlur={handleBlur}
        status={hasError ? 'error' : undefined}
        {...props}
      />

      {hasError && (
        <p className="ant-input-error_txt">
          <CloseCircleOutlined />
          {getNestedValue(formik?.errors, name)}
        </p>
      )}
    </div>
  )
}

export default AntSearchForDynamicArrays
