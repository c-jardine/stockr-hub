import { useAppStateContext } from "@/contexts/AppStateContext/AppStateContext";
import { CancelMaterialAudit } from "@/features/material";
import { RootLayout } from "@/layouts/RootLayout";
import { api } from "@/utils/api";
import {
  AbsoluteCenter,
  Box,
  Button,
  Flex,
  HStack,
  Icon,
  Image,
  Stack,
  Text,
} from "@chakra-ui/react";
import { format } from "date-fns";
import NextLink from "next/link";
import { ArrowRight, Plus } from "tabler-icons-react";

export default function Audits() {
  const { data } = api.audit.getAllMaterialAudits.useQuery();
  const appState = useAppStateContext();

  if (!data || data.length === 0) {
    return (
      <RootLayout title="Audits">
        <AbsoluteCenter>
          <NewAuditButton />
        </AbsoluteCenter>
        <AbsoluteCenter mt="84px">
          <Image
            src="/images/arrow-illustration.png"
            mt={2}
            transform="rotate(180deg)"
          />
        </AbsoluteCenter>
      </RootLayout>
    );
  }

  return (
    <RootLayout
      title="Audits"
      actionBar={!appState?.auditState.inProgress && <NewAuditButton />}
    >
      <Stack mx="auto" maxW="lg">
        {data?.map((log) => (
          <Flex key={log.id} justifyContent="space-between">
            <Box>
              <Text fontWeight="semibold">
                {log.category === "all" ? "Materials" : log.category} Audit
              </Text>
              <Text color="slate.500" fontSize="sm">
                {log.completedAt
                  ? `Completed on ${format(
                      log.completedAt,
                      "MMM. dd, yyyy 'at' h:mm a"
                    )}`
                  : `Created on ${format(
                      log.createdAt,
                      "MMM. dd, yyyy 'at' h:mm a"
                    )}`}
              </Text>
            </Box>
            <HStack>
              <Button
                as={NextLink}
                href={`/audits/${log.id}`}
                variant={appState?.auditState.inProgress ? "solid" : "outline"}
                rightIcon={<Icon as={ArrowRight} />}
              >
                {appState?.auditState.inProgress ? "Continue" : "View"}
              </Button>
              <CancelMaterialAudit isIcon id={log.id} name={log.category} />
            </HStack>
          </Flex>
        ))}
      </Stack>
    </RootLayout>
  );
}

function NewAuditButton() {
  return (
    <Button
      as={NextLink}
      href={`/audits/new`}
      leftIcon={<Icon as={Plus} strokeWidth={4} />}
    >
      New audit
    </Button>
  );
}
