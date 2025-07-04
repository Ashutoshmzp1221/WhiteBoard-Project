import React, { useRef, useEffect, useState } from 'react';
import { StyledCanvas } from '../styles/WhiteboardStyles';

function DrawingCanvas({ canvasRef, socket, strokeColor, strokeWidth, drawingContextRef }) {
    const isDrawing = useRef(false);
    const lastPoint = useRef({ x: 0, y: 0 });
    const currentStrokePoints = useRef([]);

    const getMousePos = (canvas, evt) => {
        const rect = canvas.getBoundingClientRect();
        return {
            x: evt.clientX - rect.left,
            y: evt.clientY - rect.top,
        };
    };

    const startDrawing = (e) => {
        const canvas = canvasRef.current;
        const ctx = drawingContextRef.current;
        if (!canvas || !ctx) return;

        isDrawing.current = true;
        const pos = getMousePos(canvas, e.touches ? e.touches[0] : e);
        lastPoint.current = pos;
        currentStrokePoints.current = [pos];

        ctx.beginPath();
        ctx.moveTo(pos.x, pos.y);
        ctx.strokeStyle = strokeColor;
        ctx.lineWidth = strokeWidth;
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';

        if (socket) {
            socket.emit('draw-start', { x: pos.x, y: pos.y, color: strokeColor, width: strokeWidth });
        }
    };

    const draw = (e) => {
        if (!isDrawing.current) return;

        const canvas = canvasRef.current;
        const ctx = drawingContextRef.current;
        if (!canvas || !ctx) return;

        const pos = getMousePos(canvas, e.touches ? e.touches[0] : e);

        ctx.lineTo(pos.x, pos.y);
        ctx.stroke();

        currentStrokePoints.current.push(pos); 
        if (socket) {
            socket.emit('draw-move', { x: pos.x, y: pos.y });
        }
        lastPoint.current = pos;
    };

    const endDrawing = () => {
        if (!isDrawing.current) return;

        const ctx = drawingContextRef.current;
        if (ctx) {
            ctx.closePath();
        }

        if (socket) {
            socket.emit('draw-end', {
                drawingCommand: {
                    type: 'stroke',
                    data: {
                        path: [...currentStrokePoints.current], 
                        color: strokeColor,
                        width: strokeWidth
                    },
                    timestamp: new Date()
                }
            });
        }
        isDrawing.current = false;
        currentStrokePoints.current = []; 
    };

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        canvas.addEventListener('mousedown', startDrawing);
        canvas.addEventListener('mousemove', draw);
        canvas.addEventListener('mouseup', endDrawing);
        canvas.addEventListener('mouseleave', endDrawing);

        canvas.addEventListener('touchstart', startDrawing);
        canvas.addEventListener('touchmove', draw);
        canvas.addEventListener('touchend', endDrawing);
        canvas.addEventListener('touchcancel', endDrawing);

        return () => {
            canvas.removeEventListener('mousedown', startDrawing);
            canvas.removeEventListener('mousemove', draw);
            canvas.removeEventListener('mouseup', endDrawing);
            canvas.removeEventListener('mouseleave', endDrawing);
            canvas.removeEventListener('touchstart', startDrawing);
            canvas.removeEventListener('touchmove', draw);
            canvas.removeEventListener('touchend', endDrawing);
            canvas.removeEventListener('touchcancel', endDrawing);
        };
    }, [strokeColor, strokeWidth, socket, drawingContextRef]);

    return <StyledCanvas ref={canvasRef} />;
}

export default DrawingCanvas;