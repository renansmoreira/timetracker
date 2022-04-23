import { ReactNode } from 'react';

export default function TableLine(props: {
  isSelected?: boolean,
  children: ReactNode
}) {
  return (
    <tr className={props.isSelected ? 'is-selected' : ''}>
      {props.children}
    </tr>
  );
}
