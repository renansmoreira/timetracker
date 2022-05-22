import { useEffect, useState } from 'react';
import { emptyJsonApiResponse } from '../../responses/json-api/EmptyJsonApiResponse';
import { JsonApiResponse } from '../../responses/json-api/JsonApiResponse';
import { Template } from '../../responses/json-api/Template';
import { ExternalModelSchema } from './ExternalModelSchema';

interface Props<T> {
  template: Template,
  value: JsonApiResponse<T>,
  setStateAction: React.Dispatch<React.SetStateAction<JsonApiResponse<T>>>
};

export default function Editor<T>({ template, value, setStateAction }: Props<T>) {
  const isAnotherModel = ['datetime', 'string', 'boolean'].indexOf(template.type) === -1;
  const [models, setModels] = useState<JsonApiResponse<ExternalModelSchema>>(emptyJsonApiResponse);

  useEffect(() => {
    async function fetchModel() {
      if (isAnotherModel) {
        const response = await fetch(`http://localhost:3100/${template.type}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/vnd.api+json'
          }
        });
        setModels(await response.json());
      }
    }

    fetchModel();
  }, [template.type])

  function handleChange(name: string, event: React.ChangeEvent<HTMLInputElement>): void {
    const attributes = Object.assign({}, value.attributes, {
      [name]: event.target.value
    });
    setStateAction(Object.assign({}, value, {
      attributes
    }));
  }

  function handleCheckboxChange(name: string, event: React.ChangeEvent<HTMLInputElement>): void {
    const attributes = Object.assign({}, value.attributes, {
      [name]: event.target.checked
    });
    setStateAction(Object.assign({}, value, {
      attributes
    }));
  }

  function handleSelectChange(name: string, event: React.ChangeEvent<HTMLSelectElement>): void {
    const attributes = Object.assign({}, value.attributes, {
      [name]: event.target.value
    });
    setStateAction(Object.assign({}, value, {
      attributes
    }));
  }

  function handleValue(template: Template): string | undefined {
    if (template.name === 'id')
      return value.id;

    const newValue = (value.attributes || {})[template.name] as string;

    if (template.type === 'datetime') {
      if (!newValue)
        return '';

      const date = new Date(newValue);
      const timezoneOffset = (new Date()).getTimezoneOffset() * 60000;
      date.setMilliseconds(date.getMilliseconds() - timezoneOffset);

      return date.toISOString().replace(/\.\d\d\dZ/, "");
    }

    return newValue;
  }

  function handleBooleanValue(template: Template): boolean | undefined {
    const newValue = (value.attributes || {})[template.name];
    return newValue === 'true';
  }

  return (
    <div className="field">
      <label className="label" htmlFor={`el_${template.name}`}>{template.displayName}</label>
      <div className="control">
        {['datetime', 'string'].indexOf(template.type) > -1 ? (
          <input className="input"
            id={`el_${template.name}`}
            type={template.type === 'datetime' ? 'datetime-local' : 'text'}
            placeholder={template.displayName}
            name={template.name}
            disabled={template.name === 'id' || !template.editable}
            onChange={(event) => handleChange(template.name, event)}
            value={handleValue(template)} />
        ) : template.type === 'boolean' ? (
          <input
            id={`el_${template.name}`}
            type="checkbox"
            name={template.name}
            disabled={template.name === 'id' || !template.editable}
            onChange={(event) => handleCheckboxChange(template.name, event)} />
        ) : (
          <div className="select">
            <select
              id={`el_${template.name}`}
              name={template.name}
              disabled={template.name === 'id' || !template.editable}
              onChange={(event) => handleSelectChange(template.name, event)}
              value={handleValue(template)}>
              <option value="">Select...</option>
              {models.data?.map((model) => (
                <option key={model.id} value={model.id}>{model.attributes.name}</option>
              ))}
            </select>
          </div>
        )}
      </div>
    </div>
  );
}
