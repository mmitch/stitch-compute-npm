import { expect } from 'chai';
import { Foo } from '../src/foo';

describe('Foo demo test', () => {
    it('should return foo', () => {
        const result = Foo();
        expect(result).to.equal('foo');
    })
})