"use client"

import {Dispatch, SetStateAction,useCallback,useState} from "react";
import { IconType } from "react-icons";

interface EndGameMenuProps {
    setIsPlaying: Dispatch<SetStateAction<boolean>>;
    winner:IconType | "T";
}

const EndGameMenu:React.FC<EndGameMenuProps> = ({setIsPlaying,winner:Winner}) => {
//   const [endGameMenuActive,setEndGameMenuActive] = useState(false);

//   const toggleEndGameMenu = useCallback(()=>{
//     setEndGameMenuActive((value) => !value );
//   },[]);

  return (
    <div    
    className={`
    h-full w-full absolute bg-slate-800/80 z-50
    `}>
        {/* ${endGameMenuActive && "bg-slate-800/80 z-50"} */}
    {
        // endGameMenuActive && ( 
            <div className={`
            fixed z-50           
            xl:h-[30%] xl:w-[40%] xl:top-[35%] xl:left-[30%]
            lg:h-[30%]  lg:w-[50%] lg:top-[35%] lg:left-[25%]
            md:h-[40%]  md:w-[60%] md:top-[30%] md:left-[20%]
            sm:h-[40%]  sm:w-[85%] sm:top-[30%] sm:left-[7.5%]
            bg-slate-500 h-[40%]  w-[85%] top-[30%] left-[7.5%]
            rounded-3xl shadow-lg shadow-slate-950/80
            flex flex-col justify-evenly items-center
            `}
            >
            {Winner !== "T" 
            ? 
                <div className="flex flex-row items-center justify-center">
                    <Winner style={{color:"white"}} size={"7rem"}/>
                    <h3 className=' text-3xl  text-center pl-7 text-white'> WINS!!!</h3>
                </div>
            :    
                <div className="flex flex-row items-center justify-center">
                    <h3 className=' text-3xl  text-center'> It's a Tie</h3>
                </div>
            }
                    <h2 
                    className='cursor-pointer text-3xl border-2 shadow-xl rounded-full p-3 border-black bg-slate-700 text-slate-300 hover:scale-120 hover:border-4 transition-all hover:bg-slate-600'  
                    onClick={()=>{setIsPlaying(false)}}>
                    Next round</h2>
            </div>
        // )
    }      
    </div>
  )
}

export default EndGameMenu;
