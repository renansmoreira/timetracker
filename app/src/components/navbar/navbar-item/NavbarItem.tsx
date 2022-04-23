import { Link } from 'react-router-dom';

export default function NavbarItem(props: {
  to: string,
  name: string
}) {
  return (
    <Link className="navbar-item" to={props.to}>{props.name}</Link>
  )
}
