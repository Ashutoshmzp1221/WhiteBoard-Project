
import React from 'react';
import { ToolbarContainer, ControlGroup, Label, ColorSwatch, StyledSlider, ClearButton } from '../styles/ToolbarStyles';
import { FaEraser } from 'react-icons/fa'; 

const colors = ['#000000', '#dc3545', '#007bff', '#28a745']; 
function Toolbar({ strokeWidth, setStrokeWidth, strokeColor, setStrokeColor, onClearCanvas }) {
    return (
        <ToolbarContainer>
            <ControlGroup>
                <Label>Pen Size:</Label>
                <StyledSlider
                    type="range"
                    min="1"
                    max="20"
                    value={strokeWidth}
                    onChange={(e) => setStrokeWidth(parseInt(e.target.value))}
                />
            </ControlGroup>
            <ControlGroup>
                <Label>Colors:</Label>
                {colors.map((color) => (
                    <ColorSwatch
                        key={color}
                        color={color}
                        active={strokeColor === color}
                        onClick={() => setStrokeColor(color)}
                    />
                ))}
            </ControlGroup>
            <ClearButton onClick={onClearCanvas}>
                <FaEraser /> Clear Canvas
            </ClearButton>
        </ToolbarContainer>
    );
}

export default Toolbar;