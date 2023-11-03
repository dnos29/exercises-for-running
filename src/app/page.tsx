'use client';
import { use, useEffect, useRef, useState } from 'react';
import { convertStringToSecond, formatTimer } from '@/helpers/time.helper';
import IconPlaying from '../../public/icon-playing.svg';
import IconDone from '../../public/icon-done.svg';
import Image from 'next/image';
import { CheckCircleIcon, EllipsisHorizontalIcon } from '@heroicons/react/24/solid';

const enum EStatus {
  ON,
  OFF,
  PAUSE
}

const enum EExerciseStatus {
  INT,
  DONE,
  DOING
}
interface IExercise {
  name?: string,
  time?: string,
  secondTime?: number;
  status?: EExerciseStatus,
}
const opts = [
  {value: 'Hopscotch', label: 'Hopscotch'},
  {value: 'Plank', label: 'Plank'},
  {value: 'Squat', label: 'Squat'},
  {value: 'Run on spot', label: 'Run on spot'},
  {value: 'Lunge', label: 'Lunge'},
];

export default function Home() {
  const [timer, setTimer] = useState(0);
  const [status, setStatus] = useState<EStatus>(EStatus.OFF);
  const [intervalId, setIntervalId] = useState<ReturnType<typeof setTimeout>>();
  const [exercise, setExcercise] = useState<string>(opts[0].value);
  const [exerciseTime, setExerciseTime] = useState<string>('01:00');
  const [exercises, setExercises] = useState<IExercise[]>([]);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [totalTime, setTotalTime] = useState(0);
  // const 

  const onTimerClick = (toStatus: EStatus) => {
    setStatus(toStatus);
    switch (toStatus) {
      case EStatus.ON:
        const interval = setInterval(() => {
          setTimer((timer) => timer + 1);
        }, 1000);
        setIntervalId(interval);
        setTotalTime(exercises.reduce((total, ex) => total + (ex.secondTime || 0), 0));
        break;
      case EStatus.PAUSE:
        clearInterval(intervalId);
        break;
      case EStatus.OFF:
        clearInterval(intervalId);
        setTimer(0);
        break;
      default:
        break;
    }
  }

  const addExercise = () => {
    console.log("exercise:", exercise, ', exerciseTime:', exerciseTime);
    
    if(!exercise || !exerciseTime){
      alert('invalid input');
    }
    setExercises([
      ...exercises, {
        name: exercise,
        time: exerciseTime,
        secondTime: convertStringToSecond(exerciseTime),
        status: EExerciseStatus.INT,
      }
    ]);
    // setExcercise('');
    // setExerciseTime('');
  }

  useEffect(() => {
    if(timer){
      let remain = timer;
      if(timer >= totalTime){
        setCurrentIdx(exercises.length);
        onTimerClick(EStatus.PAUSE);
      }else{
        for (let idx = 0; idx < exercises.length; idx++) {
          const ex = exercises[idx];
          const secondTime =  ex.secondTime || 0;
          if(remain <= secondTime){
            setCurrentIdx(idx);
            break;
          }
          remain -= secondTime;  
        }
      }
    }
  }, [timer, exercises, totalTime, onTimerClick]);

  console.log('idx: ', currentIdx);
  
  return (
    <main className="min-h-screen p-4">
      <div className='my-0 mx-auto w-96'>
        <div>
          <div className='grid place-items-center	p-4 text-bold text-6xl' data-value={timer}>
            {formatTimer(timer)}
          </div>
        </div>
        <div className='flex flex-row	gap-2 justify-center p-4'>
          {
            status === EStatus.OFF && (
              <button
                onClick={() => onTimerClick(EStatus.ON)}
                className={`grid place-items-center bg-teal-600 text-white  w-14 h-14 px-2 py-1 rounded-full border`}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.348a1.125 1.125 0 010 1.971l-11.54 6.347a1.125 1.125 0 01-1.667-.985V5.653z" />
                </svg>
              </button>
            )
          }
          {
            status === EStatus.ON && (
              <>
                <button
                  onClick={() => onTimerClick(EStatus.PAUSE)}
                  className={`grid place-items-center bg-yellow-300 border-slate-300 text-black w-14 h-14 px-2 py-1 rounded-full border`}>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 5.25v13.5m-7.5-13.5v13.5" />
                  </svg>

                </button>
                <button
                  onClick={() => onTimerClick(EStatus.OFF)}
                  className={`grid place-items-center bg-red-600 text-white w-14 h-14 px-2 py-1 rounded-full border`}>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M5.25 7.5A2.25 2.25 0 017.5 5.25h9a2.25 2.25 0 012.25 2.25v9a2.25 2.25 0 01-2.25 2.25h-9a2.25 2.25 0 01-2.25-2.25v-9z" />
                  </svg>
                </button>
              </>
            )
          }
          {
            status === EStatus.PAUSE && (
              <>
                <button
                  onClick={() => onTimerClick(EStatus.ON)}
                  className={`grid place-items-center bg-teal-600 text-white text-white w-14 h-14 px-2 py-1 rounded-full border`}>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.348a1.125 1.125 0 010 1.971l-11.54 6.347a1.125 1.125 0 01-1.667-.985V5.653z" />
                  </svg>
                </button>
                <button
                  onClick={() => onTimerClick(EStatus.OFF)}
                  className={`grid place-items-center bg-red-600 text-white w-14 h-14 px-2 py-1 rounded-full border`}>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M5.25 7.5A2.25 2.25 0 017.5 5.25h9a2.25 2.25 0 012.25 2.25v9a2.25 2.25 0 01-2.25 2.25h-9a2.25 2.25 0 01-2.25-2.25v-9z" />
                  </svg>
                </button>
              </>
            )
          }
        </div>
        <hr></hr>
        <div>
          <p>Exercises</p>
          <div className='flex gap-2'>
            <div className='flex flex-col flex-1'>
              <label className='text-sm'>Exercises</label>
              <select className='border-2' value={exercise} onChange={(e) => setExcercise(e.target.value)}>
                {
                  opts.map(opt => (
                    <option
                      key={opt.value}
                      value={opt.value}
                    >
                      {opt.label}
                    </option>
                  ))
                }
              </select>
            </div>
            <div className='flex flex-col flex-1'>
              <label className='text-sm'>Time</label>
              <input type='time' value={exerciseTime} onChange={(e) => setExerciseTime(e.target.value)} />
            </div>
            <div className='flex flex-col'>
              <label className='text-sm'>&nbsp;</label>
              <button
                className="bg-teal-600 px-4 py-1 text-white rounded"
                onClick={() => addExercise()} disabled={status === EStatus.ON || status === EStatus.PAUSE}>
                  Add
              </button>
            </div>
          </div>
          {exercises.length > 0 && (
            <table className='w-full table-auto mt-2'>
              <thead className='border-b'>
                <tr className='text-left font-medium'>
                  <th className='font-medium'>Exercise</th>
                  <th className='font-medium'>Time</th>
                  <th className='font-medium'>Status</th>
                </tr>
              </thead>
              <tbody>
                {
                  exercises.map((exercise, idx) => (
                    <tr className='border-b' key={idx}>
                      <td>{exercise.name}</td>
                      <td>{exercise.time}</td>
                      <td>
                        {
                          currentIdx > idx && [EStatus.ON, EStatus.PAUSE].includes(status) && (
                            <CheckCircleIcon className='h-6 w-6 text-teal-600' />
                          )
                        }
                        {
                          currentIdx === idx && [EStatus.ON, EStatus.PAUSE].includes(status) && (
                            <EllipsisHorizontalIcon className='h-6 w-6 text-teal-600' />
                          )
                        }
                        {
                          (currentIdx < idx || status === EStatus.OFF) && (
                            <></>
                          )
                        }
                      </td>
                    </tr>
                  ))
                }
              </tbody>
            </table>
          )}
        </div>
      </div>
    </main>
  )
}
