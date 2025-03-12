import { Select } from 'antd'
import { CaretDownOutlined, CloseCircleOutlined } from '@ant-design/icons'
import { ReactElement } from 'react'

type AntSelectProps = {
  options: { label: React.ReactNode; value: string }[]
  onChange?: (x: any) => void
  label?: string
  required?: boolean
  placeholder?: string
  mode?: 'multiple' | 'tags' | undefined
  formik?: any
  name: string
  value?: any
  error?: string
  disabled?: boolean
  size?: 'small' | 'large' | 'middle'
  showSearch?: boolean
  defaultValue?: any
  filterSort?: boolean
  style?: React.CSSProperties
  dropdownRender?: ((menu: ReactElement) => ReactElement) | undefined
  rootClassName?: string
}

const AntSelect = ({
  options,
  onChange,
  label,
  required = false,
  placeholder = 'Select',
  mode,
  formik,
  name,
  value,
  error,
  size = 'large',
  disabled = false,
  showSearch = true,
  defaultValue,
  filterSort = true,
  style,
  rootClassName,
  dropdownRender,
}: AntSelectProps) => {
  const field = name?.includes('.') ? name?.split('.')?.[0] : ''
  const subfield = name?.includes('.') ? name?.split('.')?.[1] : ''

  const isError =
    (formik?.errors?.[name] && formik?.touched?.[name]) ||
    (formik?.touched?.[field]?.[subfield] && formik?.errors?.[field]?.[subfield])
  return (
    <div className={`select-form`} style={{ width: '100%' }}>
      <label className="label">
        {label}
        {required && <span className="ant-input-required"> *</span>}
      </label>
      <div className="error-wrapper">
        <Select
          rootClassName={rootClassName}
          value={value ? value : undefined}
          mode={mode}
          className="ant_select"
          showSearch={showSearch}
          style={{ width: '100%', ...style }}
          defaultValue={defaultValue}
          placeholder={placeholder}
          optionFilterProp="children"
          filterOption={(input, option) =>
            String(option?.label ?? '')
              .toLowerCase()
              .includes(input.toLowerCase())
          }
          filterSort={
            filterSort
              ? (optionA, optionB) =>
                  String(optionA?.label ?? '')
                    .toLowerCase()
                    .localeCompare(String(optionB?.label ?? '').toLowerCase())
              : undefined
          }
          options={options}
          size={size}
          dropdownRender={dropdownRender}
          onChange={onChange}
          suffixIcon={
            <CaretDownOutlined
              style={{
                pointerEvents: 'none',
              }}
            />
          }
          status={isError ? 'error' : undefined}
          disabled={disabled}
        />

        {(error || (formik?.touched?.[name] && formik?.errors?.[name])) && (
          <p className="ant-input-error_txt">
            <CloseCircleOutlined />
            {error ? error : formik.errors?.[name]}
          </p>
        )}

        {formik?.touched?.[field]?.[subfield] && formik?.errors?.[field]?.[subfield] && (
          <p className="ant-input-error_txt">
            <CloseCircleOutlined />
            {formik?.errors[field][subfield]}
          </p>
        )}
      </div>
    </div>
  )
}

export default AntSelect
