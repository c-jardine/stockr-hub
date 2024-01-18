import { Checkbox, type CheckboxProps } from '@chakra-ui/react';
import React from 'react';

export default function IndeterminateCheckbox({
  indeterminate,
  ...rest
}: { indeterminate?: boolean } & CheckboxProps) {
  const ref = React.useRef<HTMLInputElement>(null!);

  React.useEffect(() => {
    if (typeof indeterminate === 'boolean') {
      ref.current.indeterminate = !rest.checked && indeterminate;
    }
  }, [ref, indeterminate]);

  return <Checkbox ref={ref} {...rest} />;
}
