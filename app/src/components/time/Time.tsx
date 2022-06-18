interface Props {
  value: undefined | number | string;
};

function padLeft(value: number) {
  return value.toString().padStart(2, '0');
}

export default function Time({ value }: Props) {
  if (!value)
    return <span>-</span>;

  const valueInSeconds = parseInt((value || '').toString()) / 1000;
  const hours = valueInSeconds / 3600;
  const minutes = (60 * (hours % 1)) / 100;
  const seconds = (60 * (minutes % 1)) / 100;
  const displayValue = `${padLeft(hours - hours % 1)}:${minutes.toString().substring(2, 4)}:${seconds.toString().substring(2, 4)}`;

  return (
    <span>{displayValue}</span>
  )
}
