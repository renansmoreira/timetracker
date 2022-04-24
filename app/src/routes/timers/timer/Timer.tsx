import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { Link } from 'react-router-dom';
import Modal from '../../../components/modal/Modal';
import { JsonApiResponse } from '../../../responses/json-api/JsonApiResponse';
import { Template } from '../../../responses/json-api/Template';
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

  const handleChange = (name: string, event: React.ChangeEvent<HTMLInputElement>): void => {
    const attributes = Object.assign({}, timer.attributes, {
      [name]: event.target.value
    });
    setTimer(Object.assign({}, timer, {
      attributes
    }));
  };

  const getBody = () => {
    if (props.operation === 'POST')
      return '';

    const body = {
      id: timer.id
    };
    return JSON.stringify(body);
  }

  const save = async (event: React.SyntheticEvent): Promise<void> => {
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

  const handleValue = (template: Template, modelValue: JsonApiResponse<TimerSchema>) => {
    if (template.name === 'id')
      return modelValue.id;

    const value = (timer.attributes || {})[template.name];

    if (template.type === 'datetime') {
      if (!value)
        return '';

      const date = new Date(value);
      const timezoneOffset = (new Date()).getTimezoneOffset() * 60000;
      date.setMilliseconds(date.getMilliseconds() - timezoneOffset);

      return date.toISOString().replace(/\.\d\d\dZ/, "");
    }


    return value;
  }

  const submitLabel = props.operation === 'POST' ? 'Start' : 'Stop';

  return (
    <Modal cancelHandler={close}>
      <form onSubmit={save}>
        {timer.meta.template[props.operation]
          .map((template) => (
            <div key={template.name} className="field">
              <label className="label" htmlFor={`el_${template.name}`}>{template.displayName}</label>
              <div className="control">
                <input className="input"
                  id={`el_${template.name}`}
                  type={template.type === 'datetime' ? 'datetime-local' : 'text'}
                  placeholder={template.displayName}
                  name={template.name}
                  disabled={template.name === 'id' || !template.editable}
                  onChange={(event) => handleChange(template.name, event)}
                  value={handleValue(template, timer)} />
              </div>
            </div>
          ))}
        <button className="button is-primary" type="submit">{submitLabel}</button>
        <button className="button" type="button" onClick={close}>Cancel</button>
      </form>
    </Modal>
  );
}
