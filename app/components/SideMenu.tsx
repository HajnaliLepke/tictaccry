"use client"

import { Dispatch, SetStateAction, useCallback, useState } from 'react';
import { AiOutlineCloseCircle, AiFillRobot } from 'react-icons/ai';
import { BsFillPeopleFill,BsFillPersonFill } from 'react-icons/bs';
import { BiLeftArrow, BiRightArrow } from "react-icons/bi";
import { FaUserEdit,FaDice } from 'react-icons/fa';
import { IoMdSettings } from "react-icons/io";
import { IconType } from 'react-icons';


interface SideMenuProps {
    playerIcons:{1:IconType,2:IconType,"T":string};
    setPlayerIcons: Dispatch<SetStateAction<{ 1: any; 2: any; "T":string}>>;
    icons:IconType[];
    isAI:boolean;
    setIsAI:Dispatch<SetStateAction<boolean>>;
    isAIStronk:boolean;
    setIsAIStronk:Dispatch<SetStateAction<boolean>>;
    randomizeIcons:() => void;
}

const SideMenu:React.FC<SideMenuProps> = ({
    playerIcons,
    setPlayerIcons,
    icons,
    isAI,
    setIsAI,
    isAIStronk,
    setIsAIStronk,
    randomizeIcons
}) => {
    const [colorPickerActive,setColorPickerActive] = useState(false);
    const [selectedPlayer, setSelectedPlayer] = useState<1|2>(1);
    const [activePage,setActivePage] = useState(0);
    const [settingsActive,setSettingsActive] = useState(false);    

    const toggleColorPicker = useCallback(()=>{
        setColorPickerActive((value) => !value );
    },[]);

    const toggleSettings = useCallback(()=>{
        setSettingsActive((value) => !value );
    },[]);

    function newPlayerIconsValue(index:number,player:1|2|undefined){
        if (!player) {
            var newData = {1:playerIcons[1],2:playerIcons[2],"T":"T"};
            newData[selectedPlayer] = icons[index];
            setPlayerIcons(newData);
        }
    }

    function changeActivePage(change:number) {
        const newActivePage = Math.min(Math.max(0,activePage+change),Math.ceil(icons.length/16)-1)
        
        setActivePage(newActivePage);
    }

  return (
    <div className='h-full w-full absolute'>
    {/* ICONPICKER */}
    <div 
    className={        
        `fixed top-0 left-0 p-5 
        flex flex-col items-center justify-center 
        ${colorPickerActive ?  'opacity-70'  : 'opacity-90'}
        cursor-pointer hover:scale-110 hover:opacity-100 transition-all
        `
    }
    onClick={toggleColorPicker}
    >
      <FaUserEdit size={40} style={{color:"white"}}/>
      <h3 className='text-white text-xl pt-0'>Customize</h3>
    </div>
    
    {/* SETTINGS */}
    <div 
    className={        
        `fixed top-[90px] left-1 p-5
        flex flex-col items-center justify-center
        ${settingsActive ?  'opacity-70'  : 'opacity-90'}
        cursor-pointer hover:scale-110 hover:opacity-100 transition-all
        `
    }
    onClick={toggleSettings}
    >
      <IoMdSettings size={45} style={{color:"white"}}/>
      <h3 className='text-white text-xl pt-0'>Settings</h3>
    </div>
     {
        colorPickerActive && ( 
            <div className={`
            fixed z-20           
            xl:h-[65%] xl:w-[45%] xl:top-[17.5%] xl:left-[27.5%]
            lg:h-[70%]  lg:w-[60%] lg:top-[15%] lg:left-[20%]
            md:h-[80%]  md:w-[80%] md:top-[10%] md:left-[10%]
            sm:h-[85%]  sm:w-[85%] sm:top-[7.5%] sm:left-[7.5%]
            bg-slate-500 h-[90%]  w-[90%] top-[5%] left-[5%]
            rounded-3xl shadow-lg shadow-slate-950/80
            grid grid-cols-4 grid-rows-6
            `}
            >
                <div 
                onClick={toggleColorPicker}
                className='absolute p-3 z-30 cursor-pointer'>
                    <AiOutlineCloseCircle style={{color:"white"}} size="2rem"/>
                </div>
                <div 
                onClick={randomizeIcons}
                className='absolute p-3 z-30 cursor-pointer right-1'>
                    <FaDice style={{color:"white"}} size="2rem"/>
                </div>                
                <div 
                onClick={()=>{setSelectedPlayer(1)}}
                className={`
                flex items-center justify-center col-span-2 
                text-2xl
                cursor-pointer
                ${selectedPlayer === 1 ? "font-bold scale-120 text-red-500 drop-shadow-[0_3px_3px_rgba(0,0,0,0.8)]" : "text-white"}
                `}>
                    PLAYER 1
                </div>
                <div 
                onClick={()=>{setSelectedPlayer(2)}}
                className={`
                flex items-center justify-center col-span-2 
                text-2xl
                cursor-pointer
                ${selectedPlayer === 2 ? "font-bold scale-120 text-green-500 drop-shadow-[0_3px_3px_rgba(0,0,0,0.8)]"  : "text-white"}
                `}>
                    PLAYER 2
                </div>
                {
                    icons.slice(16*(0+activePage),Math.min((16*(1+activePage)),icons.length)).map((Icon,i)=>{
                        var isPlayer:1|2|undefined = undefined;
                        if (Icon === playerIcons[1]){
                            isPlayer = 1;
                        } else if (Icon === playerIcons[2]){
                            isPlayer = 2;
                        }
                        return <div key={i}
                                onClick={()=>{newPlayerIconsValue((activePage*16)+i,isPlayer)}}
                                className='relative w-full h-full flex items-center justify-center cursor-pointer'>
                                    <Icon size="2rem" style={{color:"white"}}/>
                                    { isPlayer && (
                                    <div 
                                        className={`
                                        absolute top-0 right-0
                                        rounded-full border-slate-700/70 border-2
                                        px-3 py-1 m-3
                                        ${isPlayer === 1 ? "bg-red-500" : "bg-green-500"}
                                        `}>
                                        {isPlayer}
                                    </div>
                                    )}
                                </div>
                    })
                }  
                <div 
                onClick={()=>{changeActivePage(-1)}}
                className={`
                flex items-center justify-center 
                col-start-1 col-end-3 col-span-2 row-start-6
                text-white text-2xl
                cursor-pointer
                ${activePage === 0 ? "opacity-25" : "cursor-pointer"}
                `}>
                    <BiLeftArrow size="2rem"/>
                </div>
                <div 
                onClick={()=>{changeActivePage(1)}}
                className={`
                flex items-center justify-center 
                col-start-3 col-end-5  col-span-2 row-start-6
                text-white text-2xl
                cursor-pointer
                ${activePage === Math.ceil(icons.length/16)-1 ? "opacity-25" : "cursor-pointer"}
                `}>
                    <BiRightArrow size="2rem"/>
                </div>

            </div>

        )
    }  
     {
        settingsActive && ( 
            <div className={`
            fixed z-20           
            xl:h-[30%] xl:w-[40%] xl:top-[35%] xl:left-[30%]
            lg:h-[30%]  lg:w-[50%] lg:top-[35%] lg:left-[25%]
            md:h-[40%]  md:w-[60%] md:top-[30%] md:left-[20%]
            sm:h-[40%]  sm:w-[85%] sm:top-[30%] sm:left-[7.5%]
            bg-slate-500 h-[40%]  w-[85%] top-[30%] left-[7.5%]
            rounded-3xl shadow-lg shadow-slate-950/80
            flex flex-row justify-evenly items-center
            `}
            >
              <div 
                onClick={toggleSettings}
                className='absolute p-3 z-30 cursor-pointer top-1 left-1'>
                    <AiOutlineCloseCircle style={{color:"white"}} size="2rem"/>
                </div>     

                {/* 2-PLAYER-POWER */}
                <div className='flex flex-col justify-evenly items-center gap-9 w-1/3'> 
                <div className='relative'>
                   {
                    isAI ? (
                            <BsFillPersonFill size={"6rem"} style={{color:"white"}}/> 
                        ) : (
                            <BsFillPeopleFill size={"6rem"} style={{color:"white"}}/>                      
                    )
                    } 
                </div>    
                <div>
                {/* <!-- Rounded switch --> */}
                <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" value="" className="sr-only peer" onClick={()=>{setIsAI(!isAI)}}/>
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-slate-700 rounded-full peer dark:bg-gray-400 peer-checked:after:translate-x-full peer-checked:after:border-slate-800 after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-slate-800/70 after:border-slate-700 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-slate-700"></div>
                <span className={`ml-3 text-sm font-medium  ${isAI ? " text-gray-900 dark:text-gray-900" : " text-gray-900 dark:text-gray-300" }`}>{isAI ? "1 Player" : "2 Player"}</span>
                </label>   
                </div>    

                </div>  
                {/* 2-PLAYER END */}

                {/* AI-POWER */}
                {
                    isAI ? (
                    <div className='flex flex-col justify-evenly items-center gap-9  w-1/3'> 

                            <div className='relative'>
                        <AiFillRobot size={"6rem"} style={{color: isAIStronk ? "#b91c1c" : "white"}}/>
                        {
                            isAIStronk && (
                                <div className='bg-black w-[10px] h-[2px] rotate-45 absolute top-[1rem] left-[calc(3rem-15px)]'></div>
                            )
                        }
                        {
                            isAIStronk && (
                                <div className='bg-black w-[10px] h-[2px] rotate-[-45deg] absolute top-[1rem] left-[calc(3rem+5px)]'></div>
                                )
                            }
                    </div>    
                    <div>
                    {/* <!-- Rounded switch --> */}
                    <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" value="" className="sr-only peer" onClick={()=>{setIsAIStronk(!isAIStronk)}}/>
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-slate-700 rounded-full peer dark:bg-gray-400 peer-checked:after:translate-x-full peer-checked:after:border-slate-800 after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-slate-800/70 after:border-slate-700 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-red-700"></div>
                    <span className={`ml-3 text-sm font-medium  ${isAIStronk ? " text-red-700 dark:text-red-700" : " text-gray-900 dark:text-gray-300" }`}>Unbeatable AI</span>
                    </label>   
                    </div>    

                    </div> 
                    ) : (<div className='flex flex-col justify-evenly items-center gap-9  w-1/3'>  </div> )
                }
                {/* AI-POWER END */}
            
            </div>

        )
    }      
        </div>
  );
}

export default SideMenu;
