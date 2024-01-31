import { useAppStateContext } from '@/contexts/AppStateContext/AppStateContext';
import { Alert, Button, HStack, Text } from '@chakra-ui/react';
import NextLink from 'next/link';
import { useRouter } from 'next/router';

export default function AuditAlert() {
  const appState = useAppStateContext();
  const router = useRouter();

  const show =
    router.asPath.startsWith('/materials') ||
    router.asPath.startsWith('/products');

  return (
    <>
      {show && appState?.auditState.inProgress && (
        <Alert colorScheme='sky'>
          <HStack
            spacing={4}
            w='full'
            alignItems='center'
            justifyContent='center'
          >
            <Text fontSize='sm'>
              Updating is disabled because an audit is in progress.
            </Text>
            <Button
              as={NextLink}
              href={`/audits/${appState.auditState.materialAudit?.id}`}
              size='sm'
            >
              Continue audit
            </Button>
            <Button
              size='sm'
              variant='link'
              colorScheme='blackAlpha'
              fontWeight='medium'
            >
              Cancel
            </Button>
          </HStack>
        </Alert>
      )}
    </>
  );
}
