import { Input } from "@/components/Input";
import { Button, Stack, Text } from "@chakra-ui/react";
import { FormProvider } from "react-hook-form";
import { useSettingsForm } from "../../hooks";
import { SettingsImageUpload } from "../SettingsImageUpload";

export default function SettingsForm() {
  const { form, onSubmit } = useSettingsForm();

  const {
    register,
    handleSubmit,
    formState: { errors, isDirty, isValid },
  } = form;

  return (
    <FormProvider {...form}>
      <SettingsImageUpload />
      <Text as="h2" fontSize="lg" fontWeight="semibold">
        Business information
      </Text>
      <Stack as="form" spacing={8} onSubmit={handleSubmit(onSubmit)}>
        <Input
          label="Business name"
          name="businessName"
          register={register}
          error={errors.businessName}
        />
        <Input
          label="Website"
          name="websiteUrl"
          register={register}
          error={errors.websiteUrl}
        />
        <Input
          label="Industry"
          name="industry"
          register={register}
          error={errors.industry}
        />

        <Button
          type="submit"
          alignSelf="flex-end"
          isDisabled={!isDirty || !isValid}
        >
          Save
        </Button>
      </Stack>
    </FormProvider>
  );
}
