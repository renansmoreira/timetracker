import { ReactNode } from 'react';

export default function TableHeader(props: {
  children: ReactNode
}) {
  return (
    <thead>{props.children}</thead>
  );
}
