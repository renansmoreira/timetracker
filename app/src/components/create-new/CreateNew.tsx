import { Link } from 'react-router-dom';

interface Props {
  allowedMethods: string[];
  addRoute: string;
}

export default function CreateNew({ allowedMethods, addRoute }: Props) {
  return (
    <>
      {allowedMethods.indexOf('POST') > -1 ? (
        <Link className="button is-link" to={addRoute}>Create new</Link>
      ) : ''}
    </>
  )
}
