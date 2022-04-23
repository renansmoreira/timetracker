import { JsonApiItem } from './json-api-item';
import { LinkSchema } from './schema/LinkSchema';

export class Link implements JsonApiItem<LinkSchema> {
  private _name: string;
  private _href: string;

  constructor(name: string, href: string) {
    this._name = name;
    this._href = href;
  }

  serialize(): LinkSchema {
    return {
      href: this._href
    };
  }

  get name(): string {
    return this._name;
  }
}
