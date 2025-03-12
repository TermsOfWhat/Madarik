import { Checkbox, CheckboxProps } from 'antd'
import classNames from 'classnames'

interface AntCheckboxProps extends CheckboxProps {
  className?: string
}

function AntCheckbox({ className, ...props }: AntCheckboxProps) {
  return <Checkbox className={classNames('shared-ant-checkbox', className)} {...props} />
}

export default AntCheckbox
