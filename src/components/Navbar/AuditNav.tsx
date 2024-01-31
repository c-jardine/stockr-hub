import { ClipboardList } from 'tabler-icons-react';
import { NavLink } from '../NavLink';

export default function AuditNav() {
  return <NavLink label='Audits' href='/audit' icon={ClipboardList} />;
}
