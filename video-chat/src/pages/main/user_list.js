import React from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import styled from "styled-components";

const UserList = ({ user_list }) => {

    let history = useHistory();

    return <StyledWrapper>
        {user_list && user_list.length > 0 && user_list.map((i,k) => {
            return <StyledCard key={k}>
                <StyledName>{i.name}</StyledName>
                <StyledButton type="button" onClick={e => history.push(`/chat/user/${i._id}`)}>Chat</StyledButton>
            </StyledCard>
        })}
    </StyledWrapper>
};

const StyledWrapper = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

const StyledCard = styled.div`
   width: 30%;
   display: flex;
   flex-direction: column;
   align-items: center;
   justify-content: center;
   box-shadow: rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px;
   padding: 36px 24px;
   margin-top: 24px;
   border-radius: 12px;
   @media (max-width: 992px) {
       width: 90%
    }
`;

const StyledName = styled.h6`
  font-weight: 600;
  color: #0097e6;
`;

const StyledButton = styled.button`
  font-weight: 600;
  color: white;
  background-color: #0097e6;
  padding: 8px 24px;
  margin-top: 12px;
  border: none;
  box-shadow: none;
  outline: none;
  cursor:pointer;
  &:hover {
    background-color: #00a8ff;
  }
`;

const mapStateToProps = state => {
    return {
        user_list: state.User.list
    }
};

export default connect(mapStateToProps)(UserList);