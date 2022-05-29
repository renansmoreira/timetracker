import { JsonApiResponse } from '../../responses/json-api/JsonApiResponse';
import { Template } from '../../responses/json-api/Template';

interface Props<T> {
  template: Template;
  value: JsonApiResponse<T>;
  setStateAction: React.Dispatch<React.SetStateAction<JsonApiResponse<T>>>;
}

export default function Checkbox<T>({ template, value, setStateAction }: Props<T>) {

  function handleCheckboxChange(name: string, event: React.ChangeEvent<HTMLInputElement>): void {
    const attributes = Object.assign({}, value.attributes, {
      [name]: event.target.checked
    });
    setStateAction(Object.assign({}, value, {
      attributes
    }));
  }

  return (
    <input
      id={`el_${template.name}`}
      type="checkbox"
      name={template.name}
      disabled={template.name === 'id' || !template.editable}
      onChange={(event) => handleCheckboxChange(template.name, event)} />
  )
}
