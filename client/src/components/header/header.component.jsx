import React from 'react';

import logo from '../../assets/logo.png'

import { HeaderContainer, LogoContainer, OptionsContainer, OptionLink } from './header.styles';

const Header = () => (
  <HeaderContainer>
    <LogoContainer to='/'>
      <img width='50px' height='50px' src={logo} alt="Logo" />
    </LogoContainer>
    <OptionsContainer>
      <OptionLink to='/shop'>SHOP</OptionLink>
      <OptionLink to='/shop'>CONTACT</OptionLink>
      <OptionLink to='/signin'>SIGN IN</OptionLink>
    </OptionsContainer>
  </HeaderContainer>
);

export default Header;