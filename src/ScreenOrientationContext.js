import React, { createContext, useState, useEffect } from 'react';

const ScreenOrientationContext = createContext();

const ScreenOrientationProvider = ({ children }) => {
    const [orientation, setOrientation] = useState(
        window.matchMedia('(orientation: portrait)').matches
            ? 'portrait'
            : 'landscape'
    );

    const handleOrientationChange = (e) => {
        if (e.matches) {
            setOrientation('portrait');
        } else {
            setOrientation('landscape');
        }
    }

    useEffect(() => {
        window.matchMedia('(orientation: portrait)').addEventListener(
            'change',
            handleOrientationChange
        );
    }, []);

    return (
        <ScreenOrientationContext.Provider value={orientation}>
            {children}
        </ScreenOrientationContext.Provider>
    );
};

export { ScreenOrientationProvider, ScreenOrientationContext };
