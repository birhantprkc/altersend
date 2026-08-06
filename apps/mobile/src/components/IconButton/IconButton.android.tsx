import { useTheme } from '@altersend/components'
import { Host, Icon, IconButton as ComposeIconButton } from '@expo/ui/jetpack-compose'
import type { ImageSourcePropType } from 'react-native'
import settingsIcon from '@/assets/icons/settings.xml'
import { ICON_BUTTON_SIZE, type IconButtonIcon, type IconButtonProps } from './IconButton.types'

const sources: Record<IconButtonIcon, ImageSourcePropType> = {
  settings: settingsIcon
}

export function IconButton({ icon, onPress, size = ICON_BUTTON_SIZE }: IconButtonProps) {
  const { theme } = useTheme()

  return (
    <Host style={{ width: size, height: size }}>
      <ComposeIconButton onClick={onPress}>
        <Icon source={sources[icon]} tint={theme.colors.colorTextPrimary} />
      </ComposeIconButton>
    </Host>
  )
}
