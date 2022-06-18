import Time from '../time/Time';

interface Props {
  type?: 'time';
  children: React.ReactNode;
}

export default function Display({ type, children }: Props) {
  if (type === 'time')
    return <Time value={children?.toString()} />;
  return <span>{children}</span>;
}
