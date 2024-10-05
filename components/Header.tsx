import { signOutUser } from '@/store/authSlice';
import Link from 'next/link';
import Router from 'next/router';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import { RootState } from '../store';

const HeaderContainer = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  background-color: #f8f9fa;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const StyledLink = styled(Link)`
  font-size: 18px;
  text-decoration: none;
  color: black;

  &:hover {
    text-decoration: underline;
  }
`;

const Logo = styled.span`
  font-size: 24px;
  font-weight: bold;
  color: black;
`;

const LinksContainer = styled.div`
  display: flex;
  gap: 20px; /* Adjust the gap as needed */
`;

const Header: React.FC = () => {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.auth.value);

  const handleLogout = (e: React.MouseEvent) => {
    e.preventDefault();
    dispatch(signOutUser());
    Router.push('/');
  };

  return (
    <HeaderContainer>
      <StyledLink href="/" passHref>
        <Logo>Logo</Logo>
      </StyledLink>
      <LinksContainer>
        {user.data ? (
          <>
            <StyledLink href="/dashboard" passHref>
              <span>Dashboard</span>
            </StyledLink>
            <StyledLink href="#" onClick={handleLogout} passHref>
              <span>Logout</span>
            </StyledLink>
          </>
        ) : (
          <StyledLink href="/login" passHref>
            <span>Login</span>
          </StyledLink>
        )}
      </LinksContainer>
    </HeaderContainer>
  );
};

export default Header;
