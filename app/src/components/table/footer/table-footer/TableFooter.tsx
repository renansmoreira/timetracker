import { ReactNode } from 'react';

export default function TableFooter(props: {
  children: ReactNode
}) {
  return (
    <tfoot>{props.children}</tfoot>
  );
}
