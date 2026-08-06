import { useCallback, useEffect } from 'react'
import { Platform, View } from 'react-native'
import { Button, useTheme } from '@altersend/components'
import { clearSenderFlow, getSendPageCopy, getSendStep, useTransferStore } from '@altersend/domain'
import { useTranslation } from '@altersend/locales'
import { Layout } from '@/src/components'
import { IconButton } from '@/src/components/IconButton'
import { ShareView } from '@/src/transfer/send'
import { useNavigation } from 'expo-router'

export default function SendShareScreen() {
  const { t } = useTranslation(['send', 'common'])
  const { theme } = useTheme()
  const draftPhase = useTransferStore((s) => s.draftPhase)
  const connectionState = useTransferStore((s) => s.connectionState)
  const step = getSendStep({ draftPhase, isPeerConnected: connectionState === 'peer-connected' })
  const copy = getSendPageCopy(t, step)
  const description = step === 'receiver_connected' ? t('send:hints.keepOpen') : copy.description
  const navigation = useNavigation()

  const handleBack = useCallback(() => {
    clearSenderFlow()
  }, [])

  useEffect(() => {
    navigation.setOptions({
      headerBackVisible: false,
      headerLeft: () => (
        <IconButton icon='back' label={t('common:actions.back')} onPress={handleBack} />
      )
    })
  }, [navigation, handleBack, t, theme.colors.colorTextPrimary])

  return (
    <Layout
      title={copy.title}
      description={description}
      hasNativeHeader
      noScroll
      footer={
        <View style={{ marginBottom: Platform.OS === 'android' ? 20 : 0 }}>
          <Button onClick={clearSenderFlow} size='lg' variant='secondary' width='full'>
            {t('common:actions.endSession')}
          </Button>
        </View>
      }
    >
      <ShareView />
    </Layout>
  )
}
