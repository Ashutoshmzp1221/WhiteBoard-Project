import React from 'react';
import { CursorDot, CursorLabel } from '../styles/UserCursorsStyles';

const userColors = [
    '#FF6347', 
    '#4682B4', 
    '#32CD32', 
    '#9370DB', 
    '#FFD700', 
    '#6A5ACD', 
    '#20B2AA', 
    '#DC143C', 
];

function UserCursors({ cursors, currentUserId, currentUsername }) {
    return (
        <>
            {Object.entries(cursors).map(([id, cursor], index) => {
                const label = id === currentUserId ? currentUsername : (cursor.user || `User ${index + 1}`);

                return (
                    <CursorDot
                        key={id}
                        color={userColors[index % userColors.length]}
                        style={{ left: cursor.x, top: cursor.y }}
                    >
                        <CursorLabel>{label}</CursorLabel>
                    </CursorDot>
                );
            })}
        </>
    );
}

export default UserCursors;