import { Stack } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { Box, ClipboardList } from 'tabler-icons-react';
import { NavLink } from '../NavLink';

export default function AuditNav() {
  const router = useRouter();

  if (router.asPath !== '/audit') {
    return <NavLink label='Audit' href='/audit' icon={ClipboardList} />;
  }

  return (
    <Stack spacing={0}>
      <NavLink label='Products' href='/products' icon={Box} />
    </Stack>
  );
}
