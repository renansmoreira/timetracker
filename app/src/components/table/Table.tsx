import { ReactNode } from 'react';

export default function Table(props: {
  children: ReactNode
}) {
  return (
    <table className="table is-striped is-hoverable is-fullwidth">{props.children}</table>
  );
}
