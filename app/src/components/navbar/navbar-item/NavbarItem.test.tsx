import { render, screen } from '@testing-library/react';
import NavbarItem from './NavbarItem';

test('Navbar item', () => {
  render(<NavbarItem to="random" name="random" />);
});
