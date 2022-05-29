interface Props {
  value?: string,
  format?: string
};

export default function Datetime(props: Props) {
  if (!props.value)
    return (
      <span>-</span>
    );

  const date = new Date(props.value);
  const displayDate = date.toLocaleDateString('pt-BR', {
    hour12: false,
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  });
  return (
    <span>{displayDate}</span>
  );
}
