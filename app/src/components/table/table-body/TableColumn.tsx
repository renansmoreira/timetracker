import { ReactNode } from 'react';

export default function TableColumn(props: {
  children?: ReactNode
}) {
  return (
    <td>
      {props.children}
    </td>
  );
}
