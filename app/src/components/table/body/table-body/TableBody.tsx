import { ReactNode } from 'react';

export default function TableBody(props: {
  children: ReactNode
}) {
  return (
    <tbody>{props.children}</tbody>
  );
}
