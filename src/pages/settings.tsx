import { RootLayout } from '@/layouts/RootLayout';
import {
  Avatar,
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  HStack,
  Icon,
  Input,
  Stack,
  Text,
  Tooltip,
} from '@chakra-ui/react';
import { Lock } from 'tabler-icons-react';

export default function Settings() {
  return (
    <RootLayout title='Settings'>
      <Stack spacing={4} mx='auto' py={8} maxW='lg' w='full'>
        <Text as='h2' fontSize='lg' fontWeight='semibold'>
          Business information
        </Text>
        <Stack spacing={8}>
          <FormControl>
            <FormLabel>Business name</FormLabel>
            <Input />
          </FormControl>
          <FormControl>
            <FormLabel>Logo</FormLabel>
            <HStack>
              <Avatar bg='sky.300' boxSize={16} />
              <Button variant='outline'>Choose file</Button>
            </HStack>
          </FormControl>
          <FormControl>
            <FormLabel>Website</FormLabel>
            <Input />
          </FormControl>
          <FormControl>
            <FormLabel>Industry</FormLabel>
            <Input />
          </FormControl>
        </Stack>
        <Flex mt={12} justifyContent='space-between' alignItems='center'>
          <Text as='h2' fontSize='lg' fontWeight='semibold'>
            Stock adjustment types
          </Text>
          <Tooltip label='Upgrade to unlock'>
            <Box position='relative'>
              <Icon as={Lock} />
            </Box>
          </Tooltip>
        </Flex>
        <Text mt={-4} color='slate.500' fontSize='sm'>
          These types are used to keep log stock changes. Add or remove types to
          help you keep better track of your products and materials.
        </Text>
        <Stack>
          <AdjustmentType
            title='Audit'
            item='Materials & Products'
            description='Set stock level'
          />
          <AdjustmentType
            title='Damage, Theft, or Loss'
            item='Materials & Products'
            description='Decrease stock level'
          />
          <AdjustmentType
            title='Product Testing'
            item='Materials'
            description='Decrease stock level'
          />
          <AdjustmentType
            title='Production'
            item='Products'
            description='Increase stock level'
          />
          <AdjustmentType
            title='Return/Restock'
            item='Products'
            description='Decrease stock level'
          />
          <AdjustmentType
            title='Sale'
            item='Products'
            description='Decrease stock level'
          />
          <AdjustmentType
            title='Supply Order'
            item='Materials'
            description='Increase stock level'
          />
        </Stack>
      </Stack>
    </RootLayout>
  );
}

interface AdjustmentType {
  title: string;
  item: string;
  description: string;
}
function AdjustmentType({ title, item, description }: AdjustmentType) {
  return (
    <Box>
      <Text fontWeight='semibold'>{title}</Text>
      <Text color='slate.500' fontSize='sm'>
        {item} &bull; {description}
      </Text>
    </Box>
  );
}
