interface Props {
  children: React.ReactNode;
}

export default function Display({ children }: Props) {
  return (
    <span>{children}</span>
  )
}
