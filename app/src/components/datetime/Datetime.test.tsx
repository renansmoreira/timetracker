import { render, screen } from '@testing-library/react';
import Datetime from './Datetime';

test('Datetime', () => {
  render(<Datetime value="random" />);
});
