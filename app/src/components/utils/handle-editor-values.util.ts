import { JsonApiResponse } from '../../responses/json-api/JsonApiResponse';
import { Template } from '../../responses/json-api/Template';

export default function handleEditorValue<T>(template: Template, value: JsonApiResponse<T>): string | undefined {
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
