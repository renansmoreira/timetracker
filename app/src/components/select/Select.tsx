import { JsonApiResponse } from '../../responses/json-api/JsonApiResponse';
import { Template } from '../../responses/json-api/Template';
import { ExternalModelSchema } from '../editor/ExternalModelSchema';
import handleEditorValue from '../utils/handle-editor-values.util';

interface Props<T> {
  template: Template;
  value: JsonApiResponse<T>;
  models: JsonApiResponse<ExternalModelSchema>;
  setStateAction: React.Dispatch<React.SetStateAction<JsonApiResponse<T>>>;
}

export default function Select<T>({ template, value, models, setStateAction }: Props<T>) {

  function handleSelectChange(name: string, event: React.ChangeEvent<HTMLSelectElement>): void {
    const attributes = Object.assign({}, value.attributes, {
      [name]: event.target.value
    });
    setStateAction(Object.assign({}, value, {
      attributes
    }));
  }

  return (
    <div className="select">
      <select
        id={`el_${template.name}`}
        name={template.name}
        disabled={template.name === 'id' || !template.editable}
        onChange={(event) => handleSelectChange(template.name, event)}
        value={handleEditorValue(template, value)}>
        <option value="">Select...</option>
        {models.data?.map((model) => (
          <option key={model.id} value={model.id}>{model.attributes.name}</option>
        ))}
      </select>
    </div>
  )
}
