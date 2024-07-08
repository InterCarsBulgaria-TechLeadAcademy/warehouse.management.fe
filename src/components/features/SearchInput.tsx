import { Search, SearchIconWrapper, StyledInputBase } from '@/utils/searchInputStyles'
import SearchIcon from '@mui/icons-material/Search'

interface SearchInputProps {
  value: string
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  placeholder: string
}

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
