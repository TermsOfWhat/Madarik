import { ChangeEventHandler } from 'react'
import SearchIcon from '../../assets/icons/Search/search.svg'

interface ISearchProps {
  placeholder: string
  onChange?: ChangeEventHandler<HTMLInputElement>
}

function Search({ placeholder, onChange }: ISearchProps) {
  return (
    <div className="search-permission-custom">
      <img src={SearchIcon} alt="" />
      <input type="text" placeholder={placeholder} onChange={onChange} />
    </div>
  )
}

export default Search
