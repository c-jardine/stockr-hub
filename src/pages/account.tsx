import { RootLayout } from '@/layouts/RootLayout';
import {
  Avatar,
  Button,
  FormControl,
  FormLabel,
  HStack,
  Icon,
  Input,
  InputGroup,
  InputLeftAddon,
  Stack,
  Text
} from '@chakra-ui/react';
import { Lock } from 'tabler-icons-react';

export default function Account() {
  return (
    <RootLayout title='Account'>
      <Stack spacing={4} mx='auto' py={8} maxW='lg' w='full'>
        <Text as='h2' fontSize='lg' fontWeight='semibold'>
          Account settings
        </Text>
        <Stack spacing={8}>
          <FormControl>
            <FormLabel>Profile picture</FormLabel>
            <HStack>
              <Avatar bg='sky.300' boxSize={16} />
              <Button variant='outline'>Choose file</Button>
            </HStack>
          </FormControl>
          <FormControl>
            <FormLabel>Name</FormLabel>
            <Input />
          </FormControl>
          <FormControl>
            <FormLabel>Email</FormLabel>
            <Input />
          </FormControl>
          <FormControl>
            <FormLabel>Password</FormLabel>
            <InputGroup>
              <InputLeftAddon>
                <Icon as={Lock} />
              </InputLeftAddon>
              <Input />
            </InputGroup>
          </FormControl>
          <FormControl>
            <FormLabel>Confirm passwork</FormLabel>
            <InputGroup>
              <InputLeftAddon>
                <Icon as={Lock} />
              </InputLeftAddon>
              <Input />
            </InputGroup>
          </FormControl>
        </Stack>
      </Stack>
    </RootLayout>
  );
}
