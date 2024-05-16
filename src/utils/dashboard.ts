import { TIERS } from '@/constants/dashboard'

export const getCurrentTier = (point: number) => {
  for (let i = TIERS.length - 1; i >= 0; i--) {
    if (point >= TIERS[i].point) {
      return TIERS[i]
    }
  }
  return TIERS[0]
}
