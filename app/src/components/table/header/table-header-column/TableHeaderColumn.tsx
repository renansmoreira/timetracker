import { ReactNode } from 'react';

export default function TableHeaderColumn(props: {
  children: ReactNode
}) {
  return (
    <th>{props.children}</th>
  );
}
