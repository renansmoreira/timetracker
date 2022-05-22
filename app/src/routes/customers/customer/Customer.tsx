import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Editor from '../../../components/editor/Editor';
import Modal from '../../../components/modal/Modal';
import { JsonApiResponse } from '../../../responses/json-api/JsonApiResponse';
import { CustomerSchema } from '../CustomerSchema';

interface Props {
  operation: 'POST' | 'PUT'
}

export default function Customer({ operation }: Props) {
  const params = useParams();
  const navigate = useNavigate();
  const [customer, setCustomer] = useState<JsonApiResponse<CustomerSchema>>({
    meta: {
      template: {
        POST: [
          { name: 'name', type: 'string', displayName: 'Name', editable: true }
        ],
        PUT: [
          { name: 'name', type: 'string', displayName: 'Name', editable: true }
        ]
      }
    },
    attributes: {
      name: ''
    }
  });

  useEffect(() => {
    async function fetchCustomer() {
      if (operation === 'POST')
        return;

      const response = await fetch(`http://localhost:3100/customers/${params.id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/vnd.api+json'
        }
      });
      const json = await response.json();
      setCustomer(json);
    }

    fetchCustomer();
  }, [operation, params.id]);

  const getBody = () => {
    const body = {
      id: customer.id,
      name: customer.attributes?.name
    };
    return JSON.stringify(body);
  }

  const save = async (event: React.SyntheticEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault();
    await fetch(`http://localhost:3100/customers/${params.id || ''}`, {
      method: operation,
      headers: {
        'Content-Type': 'application/json'
      },
      body: getBody()
    });
    close();
  };

  const close = () => navigate(-1);

  return (
    <Modal cancelHandler={close}>
      <form onSubmit={save}>
        {customer.meta.template[operation]
          .map((template) => (
            <Editor key={template.name}
              template={template}
              value={customer}
              setStateAction={setCustomer} />
          ))}
        <button className="button is-primary" type="submit">{'Save'}</button>
        <button className="button" type="button" onClick={close}>Cancel</button>
      </form>
    </Modal>
  );
}
