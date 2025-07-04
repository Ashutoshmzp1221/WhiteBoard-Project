import styled from 'styled-components';

export const ToolbarContainer = styled.div`
    position: absolute;
    top: 20px;
    left: 50%;
    transform: translateX(-50%);
    background: rgba(255, 255, 255, 0.95);
    padding: 15px 25px;
    border-radius: 12px;
    box-shadow: 0 5px 20px rgba(0, 0, 0, 0.1);
    display: flex;
    gap: 20px;
    align-items: center;
    z-index: 100; /* Ensure it's above the canvas */
`;

export const ControlGroup = styled.div`
    display: flex;
    align-items: center;
    gap: 10px;
`;

export const Label = styled.label`
    font-size: 0.9em;
    color: #555;
    font-weight: 500;
`;

export const ColorSwatch = styled.div`
    width: 30px;
    height: 30px;
    border-radius: 50%;
    background-color: ${(props) => props.color};
    border: 2px solid ${(props) => (props.active ? '#007bff' : 'transparent')};
    cursor: pointer;
    transition: transform 0.2s ease, border-color 0.2s ease;
    &:hover {
        transform: scale(1.1);
    }
`;

export const StyledSlider = styled.input`
    -webkit-appearance: none;
    width: 100px;
    height: 8px;
    border-radius: 5px;
    background: #d3d3d3;
    outline: none;
    opacity: 0.7;
    transition: opacity 0.2s;
    &:hover {
        opacity: 1;
    }
    &::-webkit-slider-thumb {
        -webkit-appearance: none;
        appearance: none;
        width: 20px;
        height: 20px;
        border-radius: 50%;
        background: #007bff;
        cursor: pointer;
        box-shadow: 0 0 0 3px rgba(0, 123, 255, 0.2);
    }
`;

export const ClearButton = styled.button`
    background: #dc3545;
    color: white;
    border: none;
    border-radius: 8px;
    padding: 10px 15px;
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 1em;
    cursor: pointer;
    transition: background 0.3s ease;
    &:hover {
        background: #c82333;
    }
`;