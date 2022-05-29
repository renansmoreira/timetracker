import { expect } from 'chai';
import { Link } from '../../src/builders/link';
import { Links } from '../../src/builders/links';
import { LinksSchema } from '../../src/definitions/LinksSchema';

describe('Links', () => {
  it('should be created', () => {
    const newLinks = Links.new();

    expect(newLinks['_links']).to.be.empty;
  });

  it('should add a link', () => {
    const link = new Link('Link 1', 'href 1');

    const newLinks = Links.new().add(link);

    expect(newLinks['_links']).to.be.deep.equal([link]);
  });

  it('should add more than one link', () => {
    const link = new Link('Link 1', 'href 1');
    const anotherLink = new Link('Link 2', 'href 2');

    const newLinks = Links.new().add(link).add(anotherLink);

    expect(newLinks['_links']).to.be.deep.equal([link, anotherLink]);
  });

  it('should serialize', () => {
    const link = new Link('Link 1', 'href 1');
    const anotherLink = new Link('Link 2', 'href 2');
    const expectedResult: LinksSchema = {
      [link.name]: link.serialize(),
      [anotherLink.name]: anotherLink.serialize()
    };

    const result = Links.new().add(link).add(anotherLink).serialize();

    expect(result).to.be.deep.equal(expectedResult);
  });
});
