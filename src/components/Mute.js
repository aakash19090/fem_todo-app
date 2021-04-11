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
            d="M278.944 17.577c-5.568-2.656-12.128-1.952-16.928 1.92L106.368 144.009H32c-17.632 0-32 14.368-32 32v128c0 17.664 14.368 32 32 32h74.368l155.616 124.512A16.16 16.16 0 00272 464.009c2.368 0 4.736-.544 6.944-1.6a15.97 15.97 0 009.056-14.4v-416a16.05 16.05 0 00-9.056-14.432zm90.048 109.28c-6.304-6.208-16.416-6.112-22.624.128-6.208 6.304-6.144 16.416.128 22.656C370.688 173.513 384 205.609 384 240.009s-13.312 66.496-37.504 90.368c-6.272 6.176-6.336 16.32-.128 22.624a15.943 15.943 0 0011.36 4.736c4.064 0 8.128-1.536 11.264-4.64C399.328 323.241 416 283.049 416 240.009s-16.672-83.232-47.008-113.152zm45.152-45.088c-6.304-6.24-16.416-6.176-22.656.096-6.208 6.272-6.144 16.416.096 22.624C427.968 140.553 448 188.681 448 240.009s-20.032 99.424-56.416 135.488c-6.24 6.24-6.304 16.384-.096 22.656 3.168 3.136 7.264 4.704 11.36 4.704 4.064 0 8.16-1.536 11.296-4.64C456.64 356.137 480 299.945 480 240.009s-23.36-116.128-65.856-158.24z"
            fill="#fff"
            />
            
        </svg>
    )
}

export default Mute
