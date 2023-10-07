"use client"

import { Dispatch, SetStateAction, useCallback, useState } from 'react';
import { AiOutlineCloseCircle } from 'react-icons/ai';
import { BiLeftArrow, BiRightArrow } from "react-icons/bi";
import { FaUserEdit } from 'react-icons/fa';
import { IconType } from 'react-icons';



interface IconPickerProps {
    playerIcons:{1:IconType,2:IconType};
    setPlayerIcons: Dispatch<SetStateAction<{ 1: any; 2: any; }>>;
    icons:IconType[];
}

const IconPicker:React.FC<IconPickerProps> = ({
    playerIcons,
    setPlayerIcons,
    icons
}) => {
    const [colorPickerActive,setColorPickerActive] = useState(false);
    const [selectedPlayer, setSelectedPlayer] = useState<1|2>(1);
    const [activePage,setActivePage] = useState(0)

    const toggleColorPicker = useCallback(()=>{
        setColorPickerActive((value) => !value );
    },[]);

    function newPlayerIconsValue(index:number,player:1|2|undefined){
        if (!player) {
            var newData = {1:playerIcons[1],2:playerIcons[2]};
            newData[selectedPlayer] = icons[index];
            setPlayerIcons(newData);
        }
    }

    function changeActivePage(change:number) {
        const newActivePage = Math.min(Math.max(0,activePage+change),Math.ceil(icons.length/16)-1)
        
        console.log(newActivePage);
        setActivePage(newActivePage);
    }

  return (
    <div className='h-full w-full absolute'>

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
     {
        colorPickerActive && ( 
            <div className={`
            fixed z-10           
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
                text-white text-2xl
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
                                className='relative w-full h-full flex items-center justify-center'>
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
        </div>
  );
}

export default IconPicker;
