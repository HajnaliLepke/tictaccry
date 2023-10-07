"use client"
import { Dispatch, SetStateAction, useCallback,useState } from 'react';
import { ImExit } from 'react-icons/im';

interface ExitMenuProps {
    setIsPlaying: Dispatch<SetStateAction<boolean>>;
}

const ExitMenu:React.FC<ExitMenuProps>=({setIsPlaying}) => {
  const [exitMenuActive,setExitMenuActive] = useState(false);

  const toggleExitMenu = useCallback(()=>{
    setExitMenuActive((value) => !value );
  },[]);

  return (
    <div 
    className={`
    h-full w-full absolute 
    ${exitMenuActive && "bg-slate-800/80 z-50"}
    `}>

    <div 
    className={        
        `fixed top-0 left-0 p-5 
        flex flex-col items-center justify-center 
        ${exitMenuActive ?  'opacity-70'  : 'opacity-90'}
        cursor-pointer hover:scale-110 hover:opacity-100 transition-all
        `
    }
    onClick={toggleExitMenu}
    >
      <ImExit size={40} style={{color:"white",transform: 'scaleX(-1)'}}/>
      <h3 className='text-white text-xl pt-0'>End Game</h3>
    </div>
    {
        exitMenuActive && ( 
            <div className={`
            fixed z-20           
            xl:h-[30%] xl:w-[40%] xl:top-[35%] xl:left-[30%]
            lg:h-[30%]  lg:w-[50%] lg:top-[35%] lg:left-[25%]
            md:h-[40%]  md:w-[60%] md:top-[30%] md:left-[20%]
            sm:h-[40%]  sm:w-[85%] sm:top-[30%] sm:left-[7.5%]
            bg-slate-500 h-[40%]  w-[85%] top-[30%] left-[7.5%]
            rounded-3xl shadow-lg shadow-slate-950/80
            flex flex-col justify-evenly items-center
            `}
            >
                <h3 className=' text-3xl  text-center'>Do you really want to exit the round?</h3>
                <div className='flex flex-row items-center justify-center gap-20 text-3xl'>
                    <h2 
                    className='text-red-950/80 drop-shadow-[0_3px_3px_rgba(0,0,0,0.8)] cursor-pointer' 
                    onClick={()=>{setIsPlaying(false)}}>
                    YES</h2>
                    <h2 
                    className='cursor-pointer' 
                    onClick={toggleExitMenu}>
                    NO</h2>

                </div>
            </div>
        )
    }
    </div>
  )
}

export default ExitMenu
