import { expect } from 'chai';
import { Link } from '../../src/builders/link';

describe('Link', () => {
  it('should be created', () => {
    const expectedName = 'Link name';
    const expectedHref = 'https://aaa.com';

    const newLink = new Link(expectedName, expectedHref);

    expect(newLink.name).to.be.equal(expectedName);
    expect(newLink['_href']).to.be.equal(expectedHref);
  });

  it('should serialize', () => {
    const expectedResult = {
      href: 'https://aaa.com'
    };
    const newLink = new Link('Link name', expectedResult.href);

    const result = newLink.serialize();

    expect(result).to.be.deep.equal(expectedResult);
  });
});
