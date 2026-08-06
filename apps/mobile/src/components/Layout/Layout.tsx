import { useTheme } from '@altersend/components'
import { useTranslation } from '@altersend/locales'
import { PropsWithChildren } from 'react'
import { View, StyleSheet, ScrollView, Platform } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { IconButton } from '@/src/components/IconButton'
import { Text } from '@/src/components/ThemedText'

interface LayoutProps {
  title?: string
  description?: string
  badge?: React.ReactElement
  footer?: React.ReactElement
  hasNativeHeader?: boolean
  compactHeader?: boolean
  noScroll?: boolean
  onMenuPress?: () => void
}

export const Layout = ({
  title,
  description,
  badge,
  footer,
  children,
  hasNativeHeader,
  compactHeader,
  noScroll,
  onMenuPress
}: PropsWithChildren<LayoutProps>) => {
  const { t } = useTranslation(['common'])
  const { theme } = useTheme()
  const insets = useSafeAreaInsets()

  const showHeader = Boolean(title || description || badge || onMenuPress)
  const nativeHeaderPaddingTop = showHeader ? 8 : 24
  const paddingTop = hasNativeHeader ? nativeHeaderPaddingTop : insets.top + 32
  const paddingBottom = Platform.OS === 'ios' ? insets.bottom + 8 : 28

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: theme.colors.colorBackground,
          paddingTop,
          paddingBottom
        }
      ]}
    >
      {showHeader ? (
        <View style={[styles.header, compactHeader && styles.headerCompact]}>
          {badge ? <View style={styles.badgeSlot}>{badge}</View> : null}
          <View style={styles.titleRow}>
            <Text style={[styles.title, { color: theme.colors.colorTextPrimary }]}>{title}</Text>
            {onMenuPress ? (
              <IconButton
                icon='settings'
                label={t('common:labels.settings')}
                onPress={onMenuPress}
              />
            ) : null}
          </View>
          {description ? (
            <Text style={[styles.description, { color: theme.colors.colorTextSecondary }]}>
              {description}
            </Text>
          ) : null}
        </View>
      ) : null}

      {noScroll ? (
        <View style={styles.scrollView}>{children}</View>
      ) : (
        <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
          {children}
        </ScrollView>
      )}
      {footer ? <View style={styles.footer}>{footer}</View> : null}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8
  },
  header: {
    maxWidth: 720,
    marginBottom: 24
  },
  headerCompact: {
    marginBottom: 4
  },
  badgeSlot: {
    alignSelf: 'flex-start',
    marginBottom: 12
  },
  title: {
    fontSize: 30,
    fontWeight: '700',
    letterSpacing: -0.5,
    flex: 1
  },
  description: {
    fontSize: 15,
    lineHeight: 22
  },
  scrollView: {
    flex: 1
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 8
  },
  footer: {
    gap: 8,
    paddingTop: 12
  }
})
