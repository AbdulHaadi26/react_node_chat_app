import React, { useState } from 'react';
import styled from "styled-components";
import { connect } from 'react-redux';
import { registerMessage } from '../../redux/actions/messageActions';


const ChatList = ({ messages, profile, user_id, registerMessage, addMessage, emitTyping, typing }) => {
    const [message, setMessage] = useState(''), [isTyping, setIsTying] = useState(false);

    return <StyledWrapper>
        {messages && messages.length > 0 && messages.map((i, k) => {
            return <StyledCard key={k} auth={profile._id === i.sender._id}>
                <StyledCommentorName>{i.sender.name}</StyledCommentorName>
                <StyledMessage>{i.text}</StyledMessage>
                <StyledDate>{i.date}</StyledDate>
            </StyledCard>
        })}
        {typing && <StyledTyping>User is Typing</StyledTyping>}
        <StyledInput rows={2} placeholder="Enter message here" value={message}
            onChange={e => {
                setMessage(e.target.value);

                if (isTyping && e.target.value === '') {
                    setIsTying(false);
                    emitTyping({
                        reciever: user_id,
                        value: false
                    });
                }

                if (!isTyping) {
                    setIsTying(true);
                    emitTyping({
                        reciever: user_id,
                        value: true
                    });
                }
            }} onKeyPress={e => {
                if (e.key === 'Enter') {
                    e.preventDefault();

                    let data = {
                        text: message,
                        name: profile.name,
                        user_id
                    }

                    data.text && addMessage({
                        text: message,
                        sender: {
                            _id: profile._id,
                            name: profile.name
                        },
                        reciever: user_id,
                        date: new Date(Date.now())
                    });

                    data.text && registerMessage(data);

                    if (data.text && isTyping) {
                        setIsTying(false);
                        emitTyping({
                            reciever: user_id,
                            value: false
                        });
                    }

                    setMessage('');
                }
            }}
        />
    </StyledWrapper>
};

const StyledWrapper = styled.div`
    width: 30%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    @media (max-width: 992px) {
        width: 90%
     }
`;

const StyledCommentorName = styled.h6`
    font-size: 14px;
    font-weight: 600;
    padding: 0px;
    margin-top: 12px;
    margin-bottom: 0px;
`;

const StyledTyping = styled.h6`
    font-size: 12px;
    font-weight: 600;
    padding: 0px;
    margin-top: 12px;
    margin-bottom: 0px;
    color: #00a8ff;
`;

const StyledDate = styled.h6`
    font-size: 11px;
    margin-left: auto;
    margin-top: 0px;
    margin-bottom: 12px;
    padding: 0px;
`;

const StyledMessage = styled.p`
    font-size: 12px;
`;

const StyledCard = styled.div`
    width: 60%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: 6px 36px;
    margin-bottom: 18px;
    border-radius: 12px;
    margin-left: ${props => props.auth ? "auto" : "0px"};
    background-color: ${props => props.auth ? "#3498db" : "white"};
    color: ${props => props.auth ? "white" : "black"};
    box-shadow: rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px;
`;


const StyledInput = styled.textarea`
    border: 2px solid #0097e6;
    outline: none; 
    width: 100%;
    margin-top: 30px;
    font-size: 14px;
    font-weight: 600;
    padding: 6px 12px;
    border-radius: 4px;
    color: #0097e6;
    margin-top: 12px;
    resize:none;
    &:hover {
        border: 2px solid #00a8ff;
    }

`;

const mapStateToProps = state => {
    return {
        messages: state.Message.list,
        typing: state.Message.typing,
        profile: state.Profile.data
    }
};

export default connect(mapStateToProps, { registerMessage })(ChatList);