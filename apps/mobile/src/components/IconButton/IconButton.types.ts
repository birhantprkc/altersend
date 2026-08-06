export type IconButtonIcon = 'settings'

export interface IconButtonProps {
  icon: IconButtonIcon
  label: string
  onPress: () => void
  size?: number
}

export const ICON_BUTTON_SIZE = 44
