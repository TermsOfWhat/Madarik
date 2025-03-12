import React from 'react'
import { FieldProps } from 'formik'
import MinusIcon from '../../assets/icons/NumericInput/minus.svg'
import PlusIcon from '../../assets/icons/NumericInput/plus.svg'
import ResetIcon from '../../assets/icons/NumericInput/reset.svg'

const NumericInput: React.FC<FieldProps> = ({ field, form }) => {
  const handleIncrement = () => {
    form.setFieldValue(field.name, Number(field.value) + 1)
  }

  const handleDecrement = () => {
    if (Number(field.value) === 0) return
    form.setFieldValue(field.name, Number(field.value) - 1)
  }

  const handleReset = () => {
    form.setFieldValue(field.name, 0)
  }

  const onValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.startsWith('0')) {
      const value = e.target.value.replace(/^0+/, '')
      form.setFieldValue(field.name, value)
    } else {
      const value = e.target.value
      form.setFieldValue(field.name, value)
    }
  }

  return (
    <div className="numeric-input-container">
      <img src={ResetIcon} alt="" className="reset" onClick={handleReset} />
      <input type="number" placeholder="0,00" {...field} onChange={onValueChange} />
      <div className="button-container minus" onClick={handleDecrement}>
        <img src={MinusIcon} alt="" />
      </div>
      <div className="button-container plus" onClick={handleIncrement}>
        <img src={PlusIcon} alt="" />
      </div>
    </div>
  )
}

export default NumericInput
