import React, { useState } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import { loginUser} from "../../redux/actions/userActions";


const Login = ({
    loginUser
}) => {

    const [form, setForm] = useState({
        email: '',
        password: ''
    });

    const handleInput = e => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async e => {
        e.preventDefault();
        loginUser(form)
    }

    return <StyledWrapper>
        <StyledCard onSubmit={handleSubmit}>
            <StyledHeading>loginUser</StyledHeading>
            <StyledInput placeholder="Enter email" name="email" type="email" value={form.email} onChange={e => handleInput(e)} required />
            <StyledInput placeholder="Enter password" name="password" type="password" value={form.password} onChange={e => handleInput(e)} required />
            <StyledButton type="submit">Login</StyledButton>
        </StyledCard>
    </StyledWrapper>
};


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
  cursor:pointer;
  &:hover {
    background-color: #00a8ff;
  }
`;

const StyledWrapper = styled.div`
    width: 100%;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

const StyledCard = styled.form`
    width: 40%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    box-shadow: rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px;
    padding: 36px 24px;
    border-radius: 12px;
    @media (max-width: 992px) {
        width: 90%
      }
`;

const StyledInput = styled.input`
    border: 2px solid #0097e6;
    outline: none; 
    width: 80%;
    font-size: 14px;
    font-weight: 600;
    padding: 6px 12px;
    border-radius: 4px;
    color: #0097e6;
    margin-top: 12px;

    &:hover {
        border: 2px solid #00a8ff;
    }

`;


const mapStateToProps = state => {
    return {

    }
};

export default connect(mapStateToProps, { loginUser })(Login);