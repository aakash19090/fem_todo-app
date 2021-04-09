import React from 'react'
import useSound from 'use-sound';
import disableSound from '../sounds/disable-sound.mp3';

const Mute = ({soundState,setMute}) => {

    const [muteSound] = useSound(disableSound,{
        // `interrupt` ensures that if the sound starts again before it's
        // ended, it will truncate it. Otherwise, the sound can overlap.
        interrupt: true,
    });

    const playSound = (e) => {
        muteSound(); // ? Play sound
        setMute(e)
    }

    return (
        <svg
            className={`sound_svg mute_svg ${soundState ? 'active': ''}`} 
            xmlns="http://www.w3.org/2000/svg"
            width={24}
            height={24}
            viewBox="0 0 448.075 448.075"
            onClick={(e) => playSound(e)}
            >
            <path
                d="M352.021 16.075c0-6.08-3.52-11.84-8.96-14.4-5.76-2.88-12.16-1.92-16.96 1.92l-141.76 112.96 167.68 167.68V16.075zm91.328 404.672l-416-416c-6.24-6.24-16.384-6.24-22.624 0s-6.24 16.384 0 22.624l100.672 100.704h-9.376c-9.92 0-18.56 4.48-24.32 11.52-4.8 5.44-7.68 12.8-7.68 20.48v128c0 17.6 14.4 32 32 32h74.24l155.84 124.48c2.88 2.24 6.4 3.52 9.92 3.52 2.24 0 4.8-.64 7.04-1.6 5.44-2.56 8.96-8.32 8.96-14.4v-57.376l68.672 68.672a15.97 15.97 0 0011.328 4.704 16.07 16.07 0 0011.328-4.672c6.24-6.272 6.24-16.384 0-22.656z"
                fill="#fff"
            />
        </svg>
    )
}

export default Mute
