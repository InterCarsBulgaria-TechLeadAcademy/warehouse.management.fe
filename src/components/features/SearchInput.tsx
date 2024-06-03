import { SearchInputProps } from '@/interfaces/searchInput'
import { Search, SearchIconWrapper, StyledInputBase } from '@/utils/searchInputStyles'
import SearchIcon from '@mui/icons-material/Search'

export default function SearchInput({ value, onChange, placeholder }: SearchInputProps) {
  return (
    <Search>
      <SearchIconWrapper>
        <SearchIcon />
      </SearchIconWrapper>
      <StyledInputBase
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        inputProps={{ 'aria-label': 'search' }}
      />
    </Search>
  )
}
