import React, { useMemo, useState } from 'react'
import { parseSlate, truncate } from '@utils/string'
import Parser from 'html-react-parser'

interface BookDescriptionProps {
  description: string
}

const BookDescription: React.FC<BookDescriptionProps> = ({ description }) => {
  const [isExpanded, setIsExpanded] = useState(false)
  const toggleDescription = () => {
    setIsExpanded((prev) => !prev)
  }

  const contents = useMemo(() => {
    const content = parseSlate(JSON.parse(description))
    return {
      full: content,
      hide: truncate(content, 500),
    }
  }, [description])

  return (
    <div className='prose mx-auto mb-8 max-w-full'>
      {isExpanded ? Parser(contents.full) : Parser(contents.hide)}
      <button
        type='button'
        onClick={toggleDescription}
        className='font-semibold text-primary-600 dark:text-primary-500'
      >
        {isExpanded ? 'Show less' : 'Read more'}
      </button>
    </div>
  )
}

export default BookDescription
