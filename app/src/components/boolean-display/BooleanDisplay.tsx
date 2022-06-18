interface Props {
  value?: string;
}

export default function BooleanDisplay({ value }: Props) {
  return (<span>{value === '1' ? 'Yes' : 'No'}</span>);
}
