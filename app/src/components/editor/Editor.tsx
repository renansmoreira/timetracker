import { JsonApiResponse } from '../../responses/json-api/JsonApiResponse';
import { Template } from '../../responses/json-api/Template';

interface Props<T> {
  template: Template,
  value: JsonApiResponse<T>,
  setStateAction: React.Dispatch<React.SetStateAction<JsonApiResponse<T>>>
};

export default function Editor<T>({ template, value, setStateAction }: Props<T>) {
  function handleChange(name: string, event: React.ChangeEvent<HTMLInputElement>): void {
    const attributes = Object.assign({}, value.attributes, {
      [name]: event.target.value
    });
    setStateAction(Object.assign({}, value, {
      attributes
    }));
  };

  function handleValue(template: Template): string | undefined {
    if (template.name === 'id')
      return value.id;

    const newValue = (value.attributes || {})[template.name];

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
        ) : (
          <input
            id={`el_${template.name}`}
            type="checkbox"
            name={template.name}
            disabled={template.name === 'id' || !template.editable}
            onChange={(event) => handleChange(template.name, event)}
            value={handleValue(template)} />
        )}

      </div>
    </div>
  );
}
