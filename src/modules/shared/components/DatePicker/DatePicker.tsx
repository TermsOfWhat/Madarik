import { DatePicker, Space } from 'antd'
import { CloseCircleOutlined } from '@ant-design/icons'
import dayjs from 'dayjs'
type AntDatePickerProps = {
  onChange?: (date: any, dateString: string) => void
  label?: string
  required?: boolean
  picker?: 'week' | 'month' | 'quarter' | 'year' | undefined
  placeholder?: string
  formik?: any
  size?: 'large' | 'middle' | 'small'
  name: string
  disabled?: boolean
  minDate?: dayjs.Dayjs
  maxDate?: dayjs.Dayjs
  suffixIcon?: any
  readOnly?: boolean
  value?: string | dayjs.Dayjs | null | undefined
}

const AntDatePicker = ({
  readOnly,
  onChange,
  picker,
  size = 'large',
  label,
  required,
  formik,
  name,
  disabled,
  minDate,
  maxDate,
  placeholder,
  suffixIcon,
  value,
}: AntDatePickerProps) => {
  const initialValue = formik?.values?.[name]
    ? dayjs(formik.values[name])
    : value
    ? dayjs(value)
    : null
  return (
    <div
      className="date-form"
      style={{
        width: '100%',
      }}
    >
      <label className="label">
        {label}
        {required && <span className="ant-input-required"> *</span>}
      </label>
      <Space
        direction="vertical"
        style={{
          width: '100%',
        }}
      >
        <DatePicker
          suffixIcon={suffixIcon}
          style={{
            width: '100%',
          }}
          {...(minDate ? { minDate } : {})}
          {...(maxDate ? { maxDate } : {})}
          size={size}
          lang="FR-fr"
          format="DD/MM/YYYY"
          placeholder={placeholder}
          disabled={disabled}
          readOnly={readOnly}
          onChange={(date, dateString) => {
            if (onChange) {
              onChange(date, dateString as string)
            } else {
              formik?.setFieldValue(name, dateString as string)
            }
          }}
          picker={picker}
          status={formik?.errors?.[name] && formik?.touched?.[name] ? 'error' : undefined}
          value={initialValue ? initialValue : value ? value : null}
        />
      </Space>
      {formik?.touched?.[name] && formik?.errors?.[name] && (
        <p className="ant-input-error_txt">
          <CloseCircleOutlined />
          {formik.errors?.[name]}
        </p>
      )}
    </div>
  )
}

export default AntDatePicker
