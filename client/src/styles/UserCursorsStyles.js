import styled from 'styled-components';

export const CursorDot = styled.div`
    position: absolute;
    width: 15px;
    height: 15px;
    border-radius: 50%;
    background-color: ${(props) => props.color || '#007bff'};
    border: 2px solid white;
    opacity: 0.8;
    pointer-events: none; /* Allows clicks to pass through */
    transform: translate(-50%, -50%); /* Center the dot on the cursor coordinates */
    transition: transform 0.05s linear; /* Smooth movement */
    z-index: 99; /* Below toolbar, above canvas */
`;

export const CursorLabel = styled.span`
    position: absolute;
    top: 18px; /* Position label below the cursor dot */
    left: 50%;
    transform: translateX(-50%);
    background-color: rgba(0, 0, 0, 0.7);
    color: white;
    padding: 3px 8px;
    border-radius: 4px;
    font-size: 0.8em;
    white-space: nowrap;
`;