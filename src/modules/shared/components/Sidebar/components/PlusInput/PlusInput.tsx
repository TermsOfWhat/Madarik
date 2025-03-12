import { Dispatch, SetStateAction } from 'react'
import arrowRight from '../../../../assets/icons/sidebar/arrow-right.svg'

type PlusInputPros = { open: boolean; setOpen: Dispatch<SetStateAction<boolean>> }
const PlusInput = ({ open, setOpen }: PlusInputPros) => {
  return (
    <div
      onClick={() => {
        setOpen(!open)
      }}
      className={`plus-input ${open ? 'active' : ''}`}
    >
      <span className="menu-journal">Plus</span>
      <img src={arrowRight} alt="" />
    </div>
  )
}

export default PlusInput
