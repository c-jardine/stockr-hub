import { NewAudit } from '@/features/audit/components';
import { RootLayout } from '@/layouts/RootLayout';
import {
  AbsoluteCenter
} from '@chakra-ui/react';

export default function NewAuditPage() {
  return (
    <RootLayout title='Audits'>
      <AbsoluteCenter maxW='lg' w='full'>
        <NewAudit />
      </AbsoluteCenter>
    </RootLayout>
  );
}
