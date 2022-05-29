import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Editor from '../../../components/editor/Editor';
import Modal from '../../../components/modal/Modal';
import { JsonApiResponse } from '../../../responses/json-api/JsonApiResponse';
import { ProjectSchema } from '../ProjectSchema';

interface Props {
  operation: 'POST' | 'PUT';
}

export default function Project({ operation }: Props) {
  const params = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState<JsonApiResponse<ProjectSchema>>({
    meta: {
      template: {
        POST: [
          { name: 'name', type: 'string', displayName: 'Name', editable: true },
          { name: 'currency', type: 'currencies', displayName: 'Currency', editable: true },
          { name: 'valuePerHour', type: 'decimal', displayName: 'Value per hour', editable: true },
          { name: 'customerId', type: 'customers', displayName: 'Customer', editable: true }
        ],
        PUT: [
          { name: 'name', type: 'string', displayName: 'Name', editable: true },
          { name: 'currency', type: 'currencies', displayName: 'Currency', editable: true },
          { name: 'valuePerHour', type: 'decimal', displayName: 'Value per hour', editable: true },
          { name: 'customerId', type: 'customers', displayName: 'Customer', editable: true }
        ]
      }
    },
    attributes: {
      name: '',
      customerId: '',
      valuePerHour: '',
      currency: ''
    }
  });

  useEffect(() => {
    async function fetchProject() {
      if (operation === 'POST')
        return;

      const response = await fetch(`http://localhost:3100/projects/${params.id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/vnd.api+json'
        }
      });
      const json = await response.json();
      setProject(json);
    }

    fetchProject();
  }, [operation, params.id]);

  const getBody = () => {
    const body = {
      id: project.id,
      name: project.attributes?.name,
      valuePerHour: project.attributes?.valuePerHour,
      currency: project.attributes?.currency,
      customerId: project.attributes?.customerId
    };
    return JSON.stringify(body);
  }

  const save = async (event: React.SyntheticEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault();
    await fetch(`http://localhost:3100/projects/${params.id || ''}`, {
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
        {project.meta.template[operation]
          .map((template) => (
            <Editor key={template.name}
              template={template}
              value={project}
              setStateAction={setProject} />
          ))}
        <button className="button is-primary" type="submit">{'Save'}</button>
        <button className="button" type="button" onClick={close}>Cancel</button>
      </form>
    </Modal>
  );
}
