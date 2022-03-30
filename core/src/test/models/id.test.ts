import test, { ExecutionContext } from 'ava';
import { validate } from 'uuid';
import { Id } from '../../models/id';

test('should create with an id', (t: ExecutionContext) => {
  const newId = new Id();

  t.true(validate(newId.value));
});

test('should have a string version', (t: ExecutionContext) => {
  const newId = new Id();

  t.true(validate(newId.toString()));
});

test.todo('should be able to be compared');
