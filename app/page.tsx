"use client"

import { useEffect, useCallback ,useState } from 'react';

import Board from './components/Board';
import IconPicker from './components/IconPicker';

// ICONS
import { AiOutlineClose } from "react-icons/ai";
import { CiFries } from "react-icons/ci";
import { FaBiohazard, FaCat, FaDog, FaDragon, FaRegCircle } from 'react-icons/fa';
import { GiBalloonDog, GiBarefoot, GiBeard, GiBeaver, GiChainsaw, GiChickenOven, GiDragonfly,GiRobberMask } from 'react-icons/gi';
import { GoLaw } from "react-icons/go";
import { ImEye } from "react-icons/im"
import { LiaDragonSolid } from "react-icons/lia";
import { PiFlyingSaucerThin,PiHandEye } from "react-icons/pi";
import { TbEyeglass2 } from "react-icons/tb";
import ExitMenu from './components/ExitMenu';
import EndGameMenu from './components/EndGameMenu';

export default function Home() {
  const icons = [
    AiOutlineClose,
    FaRegCircle,
    CiFries,
    FaBiohazard,
    FaCat,
    FaDog,
    FaDragon,
    GiBalloonDog,
    GiBarefoot,
    GiBeard,
    GiBeaver,
    GiChainsaw,
    GiChickenOven,
    GiDragonfly,
    GiRobberMask,
    GoLaw,
    ImEye,
    LiaDragonSolid,
    PiFlyingSaucerThin,
    PiHandEye,
    TbEyeglass2,
]
const [playerIcons, setPlayerIcons] = useState({1:icons[0],2:icons[6]});
const [winner,setWinner] = useState<undefined|1|2>(undefined);
const [isPlaying,setIsPlaying] = useState<boolean>(false);
const [tiles,setTiles] =  useState(Array(9).fill(null));
const [points,setPoints] = useState({1:0,2:0,"T":0})

  useEffect(()=>{
    if(!isPlaying){
      setTiles(Array(9).fill(null));
      if(winner){
        const newData = {1:points[1],2:points[2],"T":points["T"]};
        newData[winner] = newData[winner]+1;
        setPoints(newData);
        setWinner(undefined);
      }
    }
  },[isPlaying]);

  return (
    <div className='
    h-full w-full 
    absolute
    bg-slate-700
    flex flex-row
    items-center
    justify-center
    '>

      {
        winner ?  (
          <EndGameMenu
          setIsPlaying={setIsPlaying}
          winner={playerIcons[winner]}
          />
        ) :
        (

          !isPlaying ? (
            <IconPicker 
            icons={icons}
            playerIcons={playerIcons}
            setPlayerIcons = {setPlayerIcons}
            />
            ) : (
              <ExitMenu
              setIsPlaying={setIsPlaying}
              />
          ) 
        )
      }
      <Board
      playerIcons={playerIcons}
      setWinner={setWinner}
      setIsPlaying={setIsPlaying}
      tiles={tiles}
      setTiles={setTiles}
      points={points}
      setPoints={setPoints}
      />
    </div>
  );
}
