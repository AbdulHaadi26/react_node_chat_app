import React, { useEffect } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import { getUserList, logOut } from '../../redux/actions/userActions';
import UserList from './user_list';

const Main = ({ getUserList, logOut }) => {

    useEffect(() => {
        getUserList();
    }, [getUserList])

    return <StyledWrapper>
        <StyledButton type="button" onClick={e => logOut()}>Logout</StyledButton>
        <StyledHeading>User List</StyledHeading>
        <UserList />
    </StyledWrapper>
};



const StyledWrapper = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

const StyledHeading = styled.h1`
font-weight: 600;
color: #0097e6;
`;

const StyledButton = styled.button`
  font-weight: 600;
  color: white;
  background-color: #0097e6;
  padding: 8px 24px;
  margin-top: 30px;
  border: none;
  box-shadow: none;
  outline: none;
  margin-left: auto;
  margin-right: 36px;
  cursor:pointer;
  &:hover {
    background-color: #00a8ff;
  }
`;

const mapStateToProps = state => {
    return {

    }
};

export default connect(mapStateToProps, { getUserList, logOut })(Main);