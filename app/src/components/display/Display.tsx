import BooleanDisplay from '../boolean-display/BooleanDisplay';
import Time from '../time/Time';

interface Props {
  type?: 'time' | 'boolean';
  children: React.ReactNode;
}

export default function Display({ type, children }: Props) {
  if (type === 'time')
    return <Time value={children?.toString()} />;

  if (type === 'boolean')
    return <BooleanDisplay value={children?.toString()}/>

  return <span>{children}</span>;
}
