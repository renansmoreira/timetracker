import { JsonApiResponse } from '../../responses/json-api/JsonApiResponse';
import { Template } from '../../responses/json-api/Template';

interface Props<T> {
  template: Template,
  value: JsonApiResponse<T>,
  setStateAction: React.Dispatch<React.SetStateAction<JsonApiResponse<T>>>
};

export default function Editor<T>(props: Props<T>) {
  const handleChange = (name: string, event: React.ChangeEvent<HTMLInputElement>): void => {
    const attributes = Object.assign({}, props.value.attributes, {
      [name]: event.target.value
    });
    props.setStateAction(Object.assign({}, props.value, {
      attributes
    }));
  };

  const handleValue = (template: Template) => {
    if (template.name === 'id')
      return props.value.id;

    const value = (props.value.attributes || {})[template.name];

    if (template.type === 'datetime') {
      if (!value)
        return '';

      const date = new Date(value);
      const timezoneOffset = (new Date()).getTimezoneOffset() * 60000;
      date.setMilliseconds(date.getMilliseconds() - timezoneOffset);

      return date.toISOString().replace(/\.\d\d\dZ/, "");
    }

    return value;
  };

  return (
    <div className="field">
      <label className="label" htmlFor={`el_${props.template.name}`}>{props.template.displayName}</label>
      <div className="control">
        <input className="input"
          id={`el_${props.template.name}`}
          type={props.template.type === 'datetime' ? 'datetime-local' : 'text'}
          placeholder={props.template.displayName}
          name={props.template.name}
          disabled={props.template.name === 'id' || !props.template.editable}
          onChange={(event) => handleChange(props.template.name, event)}
          value={handleValue(props.template)} />
      </div>
    </div>
  );
}
