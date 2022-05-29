import { JsonApiResponse } from '../../responses/json-api/JsonApiResponse';
import { Template } from '../../responses/json-api/Template';
import handleEditorValue from '../utils/handle-editor-values.util';

interface Props<T> {
  template: Template;
  value: JsonApiResponse<T>;
  setStateAction: React.Dispatch<React.SetStateAction<JsonApiResponse<T>>>;
}

const inputTypes: { [key: string]: string } = {
  datetime: 'datetime-local',
  decimal: 'number',
  number: 'number'
};

export default function Textbox<T>({ template, value, setStateAction }: Props<T>) {

  function handleChange(name: string, event: React.ChangeEvent<HTMLInputElement>): void {
    const attributes = Object.assign({}, value.attributes, {
      [name]: event.target.value
    });
    setStateAction(Object.assign({}, value, {
      attributes
    }));
  }

  return (
    <input className="input"
      id={`el_${template.name}`}
      type={inputTypes[template.type] || 'text'}
      placeholder={template.displayName}
      name={template.name}
      step={template.type === 'decimal' ? '.01' : 'any'}
      disabled={template.name === 'id' || !template.editable}
      onChange={(event) => handleChange(template.name, event)}
      value={handleEditorValue(template, value)} />
  )
}
