import { useState } from 'react';
import { Linking, View } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { useT, type Key } from '../../i18n/useT';
import { useSession } from '../../lib/session';
import { Body, Card, Heading, Meta, Notice, PrimaryButton } from '../../components/ui';
import { Screen } from '../../components/Screen';

type Topic = 'privacy' | 'terms' | 'support' | 'delete-account';
const topics: readonly Topic[] = ['privacy', 'terms', 'support', 'delete-account'];
const supportEmail = 'Petersuns@outlook.com';

const pageCopy: Record<Topic, { title: Key; body: Key[] }> = {
  privacy: {
    title: 'legal.privacy_title',
    body: [
      'legal.privacy_intro', 'legal.privacy_collect', 'legal.privacy_use', 'legal.privacy_share',
      'legal.privacy_location', 'legal.privacy_sensitive', 'legal.privacy_retention', 'legal.privacy_rights',
    ],
  },
  terms: {
    title: 'legal.terms_title',
    body: ['legal.terms_intro', 'legal.terms_safety', 'legal.terms_payments', 'legal.terms_prohibited', 'legal.terms_disputes', 'legal.terms_changes'],
  },
  support: { title: 'legal.support_title', body: ['legal.support_body', 'legal.support_email'] },
  'delete-account': { title: 'legal.deletion_title', body: ['legal.delete_intro', 'legal.delete_records'] },
};

export default function LegalPage() {
  const T = useT();
  const { topic: rawTopic } = useLocalSearchParams<{ topic: string }>();
  const topic = topics.find((item) => item === rawTopic);
  const account = useSession((s) => s.account);
  const [message, setMessage] = useState<string | null>(null);
  const [emailOpened, setEmailOpened] = useState(false);

  if (!topic) {
    return <Screen title={T('legal.not_found')} back><Notice>{T('legal.not_found')}</Notice></Screen>;
  }
  const page = pageCopy[topic];
  const draft = topic === 'privacy' || topic === 'terms';

  async function openEmail(subject: string, body = '') {
    const url = `mailto:${supportEmail}?subject=${encodeURIComponent(subject)}${body ? `&body=${encodeURIComponent(body)}` : ''}`;
    try {
      await Linking.openURL(url);
      setEmailOpened(true);
      setMessage(T(topic === 'delete-account' ? 'legal.delete_draft_opened' : 'legal.support_draft_opened'));
    } catch {
      setEmailOpened(false);
      setMessage(T('legal.email_unavailable'));
    }
  }

  return (
    <Screen title={T(page.title)} back>
      {draft ? <Notice>{T('legal.draft_notice')}</Notice> : null}
      {page.body.map((key) => (
        <Card key={key}>
          <Body>{T(key)}</Body>
        </Card>
      ))}
      {topic === 'support' ? (
        <PrimaryButton label={T('legal.contact_support')} onPress={() => openEmail('Side Qwest support')} />
      ) : null}
      {topic === 'delete-account' ? (
        <>
          <Card>
            <Heading size={17}>{T('legal.support_email')}</Heading>
            <Meta style={{ marginTop: 6 }}>{supportEmail}</Meta>
          </Card>
          <PrimaryButton
            label={T('legal.request_deletion')}
            onPress={() => openEmail(
              'Side Qwest account deletion request',
              `Please process my account deletion request.${account ? `\nAccount ID: ${account.id}` : ''}`,
            )}
          />
          <Body>{T('legal.delete_no_documents')}</Body>
        </>
      ) : null}
      {message ? <Notice tone={emailOpened ? 'ok' : 'warn'}>{message}</Notice> : null}
      {topic === 'delete-account' && !account ? (
        <View><PrimaryButton label={T('legal.sign_in_to_request')} onPress={() => router.push('/sign-in')} /></View>
      ) : null}
    </Screen>
  );
}
