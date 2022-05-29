import { useEffect, useState } from 'react';
import { emptyJsonApiResponse } from '../../responses/json-api/EmptyJsonApiResponse';
import { JsonApiResponse } from '../../responses/json-api/JsonApiResponse';
import { Template } from '../../responses/json-api/Template';
import Checkbox from '../checkbox/Checkbox';
import Select from '../select/Select';
import Textbox from '../textbox/Textbox';
import handleEditorValue from '../utils/handle-editor-values.util';
import { ExternalModelSchema } from './ExternalModelSchema';

interface Props<T> {
  template: Template,
  value: JsonApiResponse<T>,
  setStateAction: React.Dispatch<React.SetStateAction<JsonApiResponse<T>>>
};

export default function Editor<T>({ template, value, setStateAction }: Props<T>) {
  const isAnotherModel = ['datetime', 'string', 'boolean', 'decimal'].indexOf(template.type) === -1;
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

  return (
    <div className="field">
      <label className="label" htmlFor={`el_${template.name}`}>{template.displayName}</label>
      <div className="control">
        <>
          {template.type === 'boolean' && (
            <Checkbox template={template} value={value} setStateAction={setStateAction} />
          )}

          {['datetime', 'string', 'decimal'].indexOf(template.type) > -1 && (
            <Textbox template={template} value={value} setStateAction={setStateAction} />
          )}

          {['datetime', 'string', 'boolean', 'decimal'].indexOf(template.type) === -1 && (
            <Select template={template} value={value} models={models} setStateAction={setStateAction} />
          )}
        </>
      </div>
    </div>
  );
}
