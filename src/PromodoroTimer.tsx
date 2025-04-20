import * as React from 'react';
import { useState, useEffect, useRef } from 'react';

const PomodoroTimer: React.FC = () => {
    // Here we made a react component
    interface Timestamp {
        pomodoro: number;
        shortBreak: number;
        longBreak: number;
    }
    // Here is the interface

    const timestamps: Timestamp = {
        pomodoro: 25 * 60,
        shortBreak: 5 * 60,
        longBreak: 15 * 60,
    };
    // Here is the timestamp

    type TimerMode = keyof Timestamp;
    // Here is the TimerMode set as the keyof Timestamp

    const [mode, setMode] = useState<TimerMode>('pomodoro');
    // Made a mode state as timermode
    const [timeLeft, setTimeLeft] = useState<number>(timestamps[mode]);
    // made a timeleft as a principle time whicch depends on the mode
    const [timeRunning, setTimeRunning] = useState<boolean>(false);
    // Here we check the time running
    const timerRef = useRef<NodeJS.Timeout | null>(null);
    // here we made a timeout ref
    useEffect(() => {
        setTimeLeft(timestamps[mode]);
        setTimeRunning(false)
        if (timerRef.current) {
            clearInterval(timerRef.current);
        }
    }, [mode]);
    useEffect(() => {
        if (timeRunning) {
            timerRef.current = window.setInterval(() => {
                setTimeLeft((prev) => {
                    if (prev <= 1) {
                        clearInterval(timerRef.current)
                        setTimeRunning(false)
                        return 0
                    }
                    return prev - 1
                });
            }, 1000)
        } else {
            if (timerRef.current) {
                clearInterval(timerRef.current)
            }
        }
        return () => {
            if (timerRef.current) {
                clearInterval(timerRef.current)
            }
        }
    }, [timeRunning]);

    return (
        <div className="container rounded-2xl border-2 border-black h-96 w-96 absolute top-[50%] left-[50%] transform-all translate-x-[-50%] translate-y-[-50%] p-2">
            <div className="timer-content h-full w-full rounded-2xl">
                <div className="timestamps h-1/6 w-full">
                    <ul className="flex h-full justify-between items-center">
                        {Object.keys(timestamps).map((key) => (
                            <li
                                key={key}
                                onClick={() => setMode(key as TimerMode)}
                                className={`${mode === key ? 'bg-sky-800' : 'bg-sky-400'
                                    } active:bg-slate-500 cursor-pointer text-white p-2 rounded-full text-center`}
                            >
                                <button>{key}</button>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="StopWatch h-3/6 w-full flex justify-center items-center">
                    <div className="time text-8xl font-mono">{Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}</div>
                </div>
                <div className="btns h-2/6 flex">
                    <button
                        className={`${timeRunning ? 'bg-red-500' : 'bg-green-500'
                            } text-white text-4xl h-full w-1/2 rounded-tl-2xl rounded-bl-2xl`}
                        onClick={() => setTimeRunning(!timeRunning)}
                    >
                        {timeRunning ? 'Stop' : 'Start'}
                    </button>
                    <button
                        className="bg-gray-500 text-white text-4xl h-full w-1/2 rounded-tr-2xl rounded-br-2xl"
                        onClick={() => {
                            setTimeRunning(false);
                            setTimeLeft(timestamps[mode]);
                            clearInterval(timerRef.current)
                        }}
                    >
                        Reset
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PomodoroTimer;
