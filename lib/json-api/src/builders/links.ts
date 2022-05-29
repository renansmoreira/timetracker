import { JsonApiItem } from '../definitions/JsonApiItem';
import { LinksSchema } from '../definitions/LinksSchema';
import { Link } from './link';

export class Links implements JsonApiItem<LinksSchema> {
  private _links: Link[];

  constructor() {
    this._links = [];
  }

  static new(): Links {
    return new Links();
  }

  add(link: Link): Links {
    this._links.push(link);
    return this;
  }

  serialize(): LinksSchema {
    const result: LinksSchema = {};

    for (let link of this._links)
      result[link.name] = link.serialize();

    return result;
  }
}
