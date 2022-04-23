import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import Modal from '../../../components/modal/Modal';
import { JsonApiResponse } from '../../../responses/json-api/JsonApiResponse';
import { TimerSchema } from '../TimerSchema';

export default function Timer(props: {
  operation: string
}) {
  const params = useParams();
  const [timer, setTimer] = useState<JsonApiResponse<TimerSchema>>({
    meta: {
      template: []
    },
    attributes: {
      startDate: '',
      endDate: ''
    }
  });

  useEffect(() => {
    async function fetchTimer() {
      const id = props.operation === 'PUT' ? params.id : undefined;
      const response = await fetch(`http://localhost:3100/timers/${id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/vnd.api+json'
        }
      });
      const json = await response.json();
      setTimer(json);
    }

    fetchTimer();
  }, []);

  const handleChange = (name: string, event: React.ChangeEvent<HTMLInputElement>): void => {
    const attributes = Object.assign({}, timer.attributes, {
      [name]: event.target.value
    });
    setTimer(Object.assign({}, timer, {
      attributes
    }));
  };

  const save = async (event: React.SyntheticEvent): Promise<void> => {
    event.preventDefault();

    const response = await fetch('http://localhost:3100/timers', {
      method: props.operation,
      headers: {
        'Content-Type': 'application/vnd.api+json'
      }
    });
    console.log(response);
  };

  const cancel = () => window.history.back();

  return (
    <Modal cancelHandler={cancel}>
      <form onSubmit={save}>
        {timer.meta.template.map((template) => (
          <div key={template.name} className="field">
            <label className="label" htmlFor={`el_${template.name}`}>{template.displayName}</label>
            <div className="control">
              <input className="input"
                id={`el_${template.name}`}
                type={template.type === 'datetime' ? 'date' : 'text'}
                placeholder={template.displayName}
                name={template.name}
                disabled={template.name === 'id'}
                onChange={(event) => handleChange(template.name, event)}
                value={(timer.attributes || {})[template.name]} />
            </div>
          </div>
        ))}
        <button className="button is-primary" type="submit">Save</button>
        <button className="button" type="button" onClick={cancel}>Cancel</button>
      </form>
    </Modal>
  );
}

