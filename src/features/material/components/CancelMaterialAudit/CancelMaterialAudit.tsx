import { CancelAudit } from '@/components/CancelAudit';
import { api } from '@/utils/api';
import { useRouter } from 'next/router';

export default function CancelMaterialAudit({
  id,
  isIcon = false,
  name,
}: {
  id: string;
  isIcon?: boolean;
  name: string;
}) {
  const router = useRouter();
  const utils = api.useUtils();
  const query = api.audit.cancelMaterialAudit.useMutation({
    onSuccess: async () => {
      await utils.audit.getAllMaterialAudits.invalidate();
      await utils.appState.getAppState.invalidate();
      await router.push('/audits');
    },
  });
  function onDelete() {
    query.mutate({ id });
  }

  return <CancelAudit name={name} isIcon={isIcon} onDelete={onDelete} />;
}
