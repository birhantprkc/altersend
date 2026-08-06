import { useCallback, useEffect } from 'react'
import { useTheme } from '@altersend/components'
import { getSendStep, isShareStep, useTransferStore } from '@altersend/domain'
import { clearSenderFlow } from '@altersend/domain'
import { useTranslation } from '@altersend/locales'
import { Layout } from '@/src/components'
import { IconButton } from '@/src/components/IconButton'
import { PreparingView } from '@/src/transfer/send'
import { useNavigation, useRouter } from 'expo-router'

export default function SendPreparingScreen() {
  const { t } = useTranslation(['send', 'common'])
  const { theme } = useTheme()
  const draftPhase = useTransferStore((s) => s.draftPhase)
  const connectionState = useTransferStore((s) => s.connectionState)
  const step = getSendStep({ draftPhase, isPeerConnected: connectionState === 'peer-connected' })
  const navigation = useNavigation()
  const router = useRouter()

  useEffect(() => {
    if (isShareStep(step)) router.replace('/send/share')
  }, [step, router])

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
    <Layout hasNativeHeader>
      <PreparingView />
    </Layout>
  )
}
