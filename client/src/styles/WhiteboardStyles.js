import styled from 'styled-components';

export const WhiteboardContainer = styled.div`
    position: relative;
    width: 100vw;
    height: 100vh;
    overflow: hidden;
    background-color: #f8f9fa; /* Light background for the whiteboard area */
`;

export const UserCountDisplay = styled.div`
    position: absolute;
    bottom: 20px;
    right: 20px;
    background: rgba(0, 0, 0, 0.7);
    color: white;
    padding: 8px 15px;
    border-radius: 20px;
    font-size: 0.9em;
    z-index: 100;
`;

export const ConnectionStatus = styled.div`
    position: absolute;
    top: 20px;
    left: 20px;
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 0.9em;
    color: #555;
    background: rgba(255, 255, 255, 0.9);
    padding: 8px 15px;
    border-radius: 20px;
    box-shadow: 0 2px 10px rgba(0,0,0,0.05);
    z-index: 100;
`;

export const StatusDot = styled.div`
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background-color: ${(props) => (props.connected ? '#28a745' : '#ffc107')}; /* Green for connected, yellow for reconnecting */
`;

export const StyledCanvas = styled.canvas`
    display: block;
    cursor: crosshair;
    touch-action: none; /* Prevent browser touch gestures */
`;