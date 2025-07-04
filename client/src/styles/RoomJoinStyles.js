import styled from 'styled-components';

export const RoomJoinContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background: linear-gradient(135deg, #f0f4f8, #d9e2ec);
    font-family: 'Poppins', sans-serif;
`;

export const JoinBox = styled.div`
    background: #ffffff;
    padding: 40px 50px;
    border-radius: 15px;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
    text-align: center;
`;

export const Title = styled.h1`
    color: #333;
    margin-bottom: 25px;
    font-size: 2.5em;
    font-weight: 700;
`;

export const Input = styled.input`
    width: 100%;
    padding: 15px;
    margin-bottom: 25px;
    border: 2px solid #e0e6ed;
    border-radius: 8px;
    font-size: 1.2em;
    text-align: center;
    text-transform: uppercase;
    &:focus {
        outline: none;
        border-color: #007bff;
        box-shadow: 0 0 0 3px rgba(0, 123, 255, 0.2);
    }
`;

export const Button = styled.button`
    background: #007bff;
    color: white;
    padding: 15px 30px;
    border: none;
    border-radius: 8px;
    font-size: 1.2em;
    cursor: pointer;
    transition: background 0.3s ease, transform 0.2s ease;
    &:hover {
        background: #0056b3;
        transform: translateY(-2px);
    }
    &:active {
        transform: translateY(0);
    }
`;

export const ErrorText = styled.p`
    color: #dc3545;
    margin-top: 10px;
    font-size: 0.9em;
`;