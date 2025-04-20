import React, { useState, useEffect, useRef } from 'react';

const Stopwatch: React.FC = () => {
    const [time, setTime] = useState(0); // milliseconds
    // the time in millisecond
    const [isRunning, setIsRunning] = useState(false);
    // boolean value to check fi running
    const intervalRef = useRef<number | null>(null);
    // a ref to calculate time and dont let it re render

    useEffect(() => {
        if (isRunning) {
            // If time running
            intervalRef.current = window.setInterval(() => {
                // intervalRef.current set as the interval
                setTime(prev => prev + 10);
                // setTime is set as the prev vlaue + 1
            }, 10);
            // the setInterval takes place after every millisecond
        } else {
            // If time is not running
            if (intervalRef.current) clearInterval(intervalRef.current);
            // and if intervalRef.curretn is available
            // then it will clear the interval of intervaleRef
        }

        return () => {
            if (intervalRef.current) clearInterval(intervalRef.current);
            // and if intervalRef.curretn is available
            // then it will clear the interval of intervaleRef
        };
    }, [isRunning]);
    // if ssomethign changes in isRunning
    // note: react runs useEffect for once

    const formatTime = (ms: number) => {
        // Here we take the time as millisecond from the state time
        const minutes = Math.floor(ms / 60000);
        // Here we calculate the time as millisecond/60000
        const seconds = Math.floor((ms % 60000) / 1000);
        const centiseconds = Math.floor((ms % 1000) / 10);

        return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}:${String(centiseconds).padStart(2, '0')}`;
    };

    const handleStart = () => setIsRunning(true);
    const handlePause = () => setIsRunning(false);
    const handleReset = () => {
        setIsRunning(false);
        setTime(0);
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <h1 className="text-4xl font-bold mb-6">⏱ Stopwatch</h1>
            <div className="text-5xl font-mono mb-8">{formatTime(time)}</div>
            <div className="flex gap-4">
                <button
                    onClick={handleStart}
                    disabled={isRunning}
                    className="bg-green-500 text-white px-4 py-2 rounded disabled:opacity-50"
                >
                    Start
                </button>
                <button
                    onClick={handlePause}
                    disabled={!isRunning}
                    className="bg-yellow-500 text-white px-4 py-2 rounded disabled:opacity-50"
                >
                    Pause
                </button>
                <button
                    onClick={handleReset}
                    className="bg-red-500 text-white px-4 py-2 rounded"
                >
                    Reset
                </button>
            </div>
        </div>
    );
};

export default Stopwatch;
