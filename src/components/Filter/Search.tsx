import { Input } from '@components/Input'
import React from 'react'
import { Search } from 'lucide-react'

const FilterSearch: React.FC = () => {
  /*
  TODO: Implement search functionality
    - Add state to store search query
    - Implement throttle/debounce for search
  * */

  return <Input type='text' placeholder='Title, Author, ISBN' icon={Search} />
}

export default FilterSearch
