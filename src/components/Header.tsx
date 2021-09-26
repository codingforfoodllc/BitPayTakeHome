import styled from "styled-components";

const HeaderContent = styled.div`
  height: 9rem;
`;

const Logo = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  margin-top: 1.5rem;
  margin-left: 1.5rem;
`;

const HeaderText = styled.div`
  color: white;
  font-size: 2rem;
  line-height: 2.5rem;
  font-weight: 700;
`;

const HeaderSubText = styled.div`
  color: white;
  font-size: 1.25rem;
  line-height: 1.75rem;
`;

const Header = () => {
  return (
    <HeaderContent>
      <Logo>
        <HeaderText>BitPay</HeaderText>
        <HeaderSubText>Take home Test</HeaderSubText>
      </Logo>
    </HeaderContent>
  );
};

export default Header;
