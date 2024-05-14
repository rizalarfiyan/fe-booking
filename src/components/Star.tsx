import React, { useState } from 'react'
import { Star } from 'lucide-react'
import { cn } from '@/utils/classes'

const ratingVariants = {
  default: {
    star: 'text-foreground',
    emptyStar: 'text-muted-foreground',
  },
  primary: {
    star: 'text-primary-500',
    emptyStar: 'text-primary-200',
  },
}

interface PartialStarProps {
  fillPercentage: number
  size: number
  className?: string
  Icon: React.ReactElement
}

interface RatingsProps extends React.HTMLAttributes<HTMLDivElement> {
  rating: number
  totalStars?: number
  size?: number
  fill?: boolean
  Icon?: React.ReactElement
  variant?: keyof typeof ratingVariants
  onRatingChange?: (rating: number) => void
  disabled?: boolean
  hasDescription?: boolean
}

const PartialStar = ({
  fillPercentage,
  size,
  className,
  Icon,
}: PartialStarProps) => {
  return (
    <div style={{ position: 'relative', display: 'inline-block' }}>
      {React.cloneElement(Icon, {
        size,
        className: cn('fill-transparent', className),
      })}
      <div
        style={{
          position: 'absolute',
          top: 0,
          overflow: 'hidden',
          width: `${fillPercentage * 100}%`,
        }}
      >
        {React.cloneElement(Icon, {
          size,
          className: cn('fill-current', className),
        })}
      </div>
    </div>
  )
}

const Stars = ({
  rating: initialRating,
  totalStars = 5,
  size = 20,
  fill = true,
  Icon = <Star />,
  variant = 'default',
  onRatingChange,
  disabled = false,
  hasDescription = false,
  ...props
}: RatingsProps) => {
  const [hoverRating, setHoverRating] = useState<number | null>(null)
  const [currentRating, setCurrentRating] = useState(initialRating)

  const handleMouseEnter = (event: React.MouseEvent<HTMLDivElement>) => {
    if (!disabled) {
      const starIndex = Number.parseInt(
        (event.currentTarget as HTMLDivElement).dataset.starIndex || '0',
      )
      setHoverRating(starIndex)
    }
  }

  const handleMouseLeave = () => {
    setHoverRating(null)
  }

  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (!disabled) {
      const starIndex = Number.parseInt(
        (event.currentTarget as HTMLDivElement).dataset.starIndex || '0',
      )
      setCurrentRating(starIndex)
      setHoverRating(null)
      if (onRatingChange) {
        onRatingChange(starIndex)
      }
    }
  }

  const displayRating = disabled ? initialRating : hoverRating ?? currentRating
  const fullStars = Math.floor(displayRating)
  const partialStar =
    displayRating % 1 > 0 ? (
      <PartialStar
        fillPercentage={displayRating % 1}
        size={size}
        className={cn(ratingVariants[variant].star)}
        Icon={Icon}
      />
    ) : null

  return (
    <div
      className={cn('flex w-fit flex-col gap-2', {
        'pointer-events-none': disabled,
      })}
      onMouseLeave={handleMouseLeave}
      {...props}
    >
      <div className='flex items-center' onMouseEnter={handleMouseEnter}>
        {[...Array(fullStars)].map((_, i) =>
          React.cloneElement(Icon, {
            key: i,
            size,
            className: cn(
              fill ? 'fill-current stroke-1' : 'fill-transparent',
              ratingVariants[variant].star,
            ),
            onClick: handleClick,
            onMouseEnter: handleMouseEnter,
            'data-star-index': i + 1,
          }),
        )}
        {partialStar}
        {[
          ...Array(Math.max(0, totalStars - fullStars - (partialStar ? 1 : 0))),
        ].map((_, i) =>
          React.cloneElement(Icon, {
            key: i + fullStars + 1,
            size,
            className: cn('stroke-1', ratingVariants[variant].emptyStar),
            onClick: handleClick,
            onMouseEnter: handleMouseEnter,
            'data-star-index': i + fullStars + 1,
          }),
        )}
      </div>
      {hasDescription && (
        <span className='font-semibold text-muted-foreground text-xs'>
          Current Rating: {`${currentRating}`}
        </span>
      )}
    </div>
  )
}

export { Stars, PartialStar }
