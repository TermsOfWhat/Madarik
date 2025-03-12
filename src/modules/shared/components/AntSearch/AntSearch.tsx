import { CloseCircleOutlined } from '@ant-design/icons'
import { Empty, Select, SelectProps, Spin } from 'antd'
import { LabelInValueType } from 'rc-select/lib/Select'
import debounce from 'lodash/debounce'
import { ReactNode, useMemo, useRef, useState, useEffect, useCallback, forwardRef } from 'react'
import NewIcon from '../../assets/icons/AntSearch/new.svg'
import useDebounce from '../../hooks/useDebounce'
import _ from 'lodash'

export interface DebounceSelectProps<ValueType = any>
  extends Omit<SelectProps<ValueType | ValueType[]>, 'options' | 'children'> {
  fetchOptions?: (search: string) => Promise<ValueType[]>
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
  renderSelectedValue?: (option: ValueType) => React.ReactNode
  labelRender?: (label: LabelInValueType) => React.ReactNode
  showAddNew?: boolean
  onAddNew?: (searchText: string) => void
}

const AntSearch = forwardRef<any, DebounceSelectProps>(
  <
    ValueType extends {
      key?: string
      label: React.ReactNode
      value: string | number
    } = any,
  >(
    {
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
      labelRender,
      showAddNew,
      onAddNew,
      ...props
    }: DebounceSelectProps<ValueType>,
    ref: any,
  ) => {
    const [fetching, setFetching] = useState(false)
    const [options, setOptions] = useState<ValueType[] | undefined>(undefined)
    const fetchRef = useRef(0)
    const [searchText, setSearchText] = useState<string>('')

    const loadOptions = useCallback(
      async (value: string) => {
        if (!fetchOptions) return
        fetchRef.current += 1
        const fetchId = fetchRef.current
        setFetching(true)

        try {
          const newOptions = await fetchOptions(value)
          if (fetchId !== fetchRef.current) return
          setOptions(newOptions)
        } finally {
          setFetching(false)
        }
      },
      [fetchOptions],
    )

    const debounceFetcher = useMemo(
      () => debounce(loadOptions, debounceTimeout),
      [debounceTimeout, loadOptions],
    )

    useEffect(() => {
      return () => {
        debounceFetcher.cancel()
      }
    }, [debounceFetcher])

    useDebounce(
      () => {
        if (!_.isEqual(options, initOptions)) setOptions(initOptions as ValueType[])
      },
      500,
      [initOptions],
    )

    return (
      <div className="ant-input-container">
        {!hideLabel && (
          <label htmlFor={name} className="ant-select-label">
            {label}
            {required && <span className="ant-input-required">*</span>}
          </label>
        )}

        <Select
          ref={ref}
          filterOption={false}
          onSearch={(value) => {
            setSearchText(value)
            debounceFetcher(value)
          }}
          notFoundContent={
            fetching ? (
              <Spin size="small" />
            ) : (
              <>
                {showAddNew ? (
                  <div className="new-item" onClick={() => onAddNew && onAddNew(searchText)}>
                    <img src={NewIcon} alt="new" />
                    <span>Lier ce compte au journal</span>
                  </div>
                ) : (
                  <Empty description="Aucun résultat trouvé " />
                )}
              </>
            )
          }
          options={options === undefined ? initOptions : options}
          disabled={disabled}
          size="large"
          mode={multiple ? 'multiple' : undefined}
          value={value}
          placeholder={placeholder}
          onBlur={formik?.handleBlur}
          status={formik?.errors?.[name] && formik?.touched?.[name] ? 'error' : undefined}
          optionLabelProp="label"
          optionFilterProp="label"
          {...props}
          labelRender={labelRender}
        />

        {formik?.touched?.[name] && formik?.errors?.[name] && (
          <p className="ant-input-error_txt">
            <CloseCircleOutlined />
            {formik.errors?.[name]}
          </p>
        )}
      </div>
    )
  },
)

AntSearch.displayName = 'AntSearch'

export default AntSearch
