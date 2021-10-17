import React, { useEffect } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import { getMessageList, insertMessage, updateTyping } from "../../redux/actions/messageActions";
import { logOut } from '../../redux/actions/userActions';
import ChatList from "./chat_list";
import { io } from "socket.io-client";
import { baseUrl } from "../../utils/api";
const socket = io(baseUrl);

const Chat = ({ logOut, match, getMessageList, profile, insertMessage, updateTyping }) => {

    useEffect(() => {
        getMessageList({
            user_id: match.params._id
        });

    }, [getMessageList, match]);

    useEffect(() => {
        if (profile) {
            socket.emit("connected", profile._id);
            
            socket.on("message", data => {
                insertMessage(data);
            });

            socket.on("isTyping", value => {
                updateTyping(value);
            });
        }

        return () => socket.emit("disconnected", profile._id);
    }, [profile, insertMessage, updateTyping]);

    const addMessage = (data) => {
        socket.emit("send", data);
    };

    const emitTyping = (data) => {
        socket.emit("typing", data);
    };


    return <StyledWrapper>
        <StyledButton type="button" onClick={e => logOut()}>Logout</StyledButton>
        <StyledHeading>Chat</StyledHeading>
        <ChatList addMessage={addMessage} emitTyping={emitTyping} user_id={match.params._id} />
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
        profile: state.Profile.data
    }
};

export default connect(mapStateToProps, { logOut, getMessageList, insertMessage, updateTyping })(Chat);