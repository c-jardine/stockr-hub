import { useUser } from "@/hooks/user";
import { updateUserSchema } from "@/schemas";
import { type UpdateUserInput } from "@/types/user";
import { api } from "@/utils/api";
import { useToast } from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";

export default function useSettingsForm() {
  const toast = useToast();

  const form = useForm<UpdateUserInput>({
    defaultValues: {
      businessName: "",
      logoUrl: "",
      websiteUrl: "",
      industry: "",
    },
    resolver: zodResolver(updateUserSchema),
    mode: "onChange",
  });

  const { data: userData } = useUser();

  React.useEffect(() => {
    if (userData) {
      form.reset({
        businessName: userData.businessName ?? "",
        logoUrl: userData.logoUrl ?? "",
        websiteUrl: userData.websiteUrl ?? "",
        industry: userData.industry ?? "",
      });
    }
  }, [userData]);

  const utils = api.useUtils();
  const updateQuery = api.user.updateUser.useMutation({
    onSuccess: async () => {
      toast({
        title: "User updated",
        description: "User was successfully updated.",
        status: "success",
      });

      await utils.user.getUser.invalidate();
    },
  });
  function onSubmit(data: UpdateUserInput) {
    updateQuery.mutate({ ...data, businessName: data.businessName.trim() });
  }

  return { form, onSubmit };
}
