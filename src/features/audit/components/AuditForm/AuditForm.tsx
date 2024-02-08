import { type UpdateMaterialAuditInput } from "@/types";
import { api, type RouterOutputs } from "@/utils/api";
import {
  Input,
  InputGroup,
  InputRightAddon,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  useToast,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useFieldArray, useFormContext } from "react-hook-form";

export default function AuditForm({
  data,
}: {
  data: RouterOutputs["audit"]["getMaterialAuditById"];
}) {
  const router = useRouter();

  const { register, control, handleSubmit } =
    useFormContext<UpdateMaterialAuditInput>();
  const { fields } = useFieldArray({
    control,
    name: "items",
  });

  const toast = useToast();

  const utils = api.useUtils();
  const query = api.audit.completeAudit.useMutation({
    onSuccess: async () => {
      toast({
        title: "Audit completed",
        description: "Successfully completed an audit.",
        status: "success",
      });
      await utils.appState.getAppState.invalidate();
      await utils.audit.getAllMaterialAudits.invalidate();
      await router.push("/audits");
    },
  });
  function onComplete(data: UpdateMaterialAuditInput) {
    query.mutate(data);
  }

  return (
    <TableContainer
      as="form"
      id="complete-audit-form"
      onSubmit={handleSubmit(onComplete)}
    >
      <Table size="sm">
        <Thead>
          <Tr>
            <Th>Name</Th>
            <Th>Expected</Th>
            <Th>Actual</Th>
            <Th>Notes</Th>
          </Tr>
        </Thead>
        <Tbody>
          {fields.map((item, index) => (
            <Tr key={item.id}>
              <Td fontWeight="semibold">{item.name}</Td>
              <Td>
                {Number(item.expectedStock)} {item.stockUnit}.
              </Td>
              <Td maxW={64}>
                <InputGroup>
                  <Input
                    {...register(`items.${index}.actualStock`, {
                      valueAsNumber: true,
                    })}
                    isDisabled={data?.completedAt !== null}
                  />
                  <InputRightAddon fontSize="sm">
                    {item.stockUnit}.
                  </InputRightAddon>
                </InputGroup>
              </Td>
              <Td maxW={64}>
                <Input
                  {...register(`items.${index}.notes`)}
                  isDisabled={data?.completedAt !== null}
                />
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
}
