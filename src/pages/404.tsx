import { RootLayout } from '@/layouts/RootLayout';
import { AbsoluteCenter, Text } from '@chakra-ui/react';
import React from 'react';

export default function NotFound() {
  return (
    <RootLayout title=''>
      <AbsoluteCenter>
        <Text fontWeight='bold' fontSize='2xl'>Uh-oh</Text>
        <Text>Page not found</Text>
      </AbsoluteCenter>
    </RootLayout>
  );
}
