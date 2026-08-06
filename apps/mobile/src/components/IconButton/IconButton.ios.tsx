import { useTheme } from '@altersend/components'
import { Button, Host } from '@expo/ui/swift-ui'
import {
  buttonStyle,
  foregroundStyle,
  frame,
  glassEffect,
  imageScale,
  labelStyle
} from '@expo/ui/swift-ui/modifiers'
import { ICON_BUTTON_SIZE, type IconButtonIcon, type IconButtonProps } from './IconButton.types'

const symbols = {
  settings: 'gear'
} as const satisfies Record<IconButtonIcon, string>

export function IconButton({ icon, label, onPress, size = ICON_BUTTON_SIZE }: IconButtonProps) {
  const { theme } = useTheme()

  return (
    <Host style={{ width: size, height: size }}>
      <Button
        label={label}
        systemImage={symbols[icon]}
        modifiers={[
          labelStyle('iconOnly'),
          buttonStyle('plain'),
          imageScale(size >= ICON_BUTTON_SIZE ? 'large' : 'medium'),
          frame({ width: size, height: size }),
          glassEffect({ glass: { variant: 'regular', interactive: true }, shape: 'circle' }),
          foregroundStyle(theme.colors.colorTextPrimary)
        ]}
        onPress={onPress}
      />
    </Host>
  )
}
