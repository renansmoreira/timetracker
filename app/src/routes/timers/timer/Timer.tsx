import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import Editor from '../../../components/editor/Editor';
import Modal from '../../../components/modal/Modal';
import { JsonApiResponse } from '../../../responses/json-api/JsonApiResponse';
import { TimerSchema } from '../TimerSchema';

interface Props {
  operation: 'POST' | 'PUT'
}

export default function Timer(props: Props) {
  const params = useParams();
  const navigate = useNavigate();
  const [timer, setTimer] = useState<JsonApiResponse<TimerSchema>>({
    meta: {
      template: {
        POST: [],
        PUT: []
      }
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

  const getBody = () => {
    if (props.operation === 'POST')
      return '';

    const body = {
      id: timer.id
    };
    return JSON.stringify(body);
  }

  const save = async (event: React.SyntheticEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault();
    await fetch('http://localhost:3100/timers', {
      method: props.operation,
      headers: {
        'Content-Type': 'application/vnd.api+json'
      },
      body: getBody()
    });
    close();
  };

  const close = () => navigate(-1);
  const submitLabel = props.operation === 'POST' ? 'Start' : 'Stop';

  return (
    <Modal cancelHandler={close}>
      <form onSubmit={save}>
        {timer.meta.template[props.operation]
          .map((template) => (
            <Editor key={template.name}
              template={template}
              value={timer}
              setStateAction={setTimer} />
          ))}
        <button className="button is-primary" type="submit">{submitLabel}</button>
        <button className="button" type="button" onClick={close}>Cancel</button>
      </form>
    </Modal>
  );
}
