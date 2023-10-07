"use client"

import { useEffect, useCallback ,useState } from 'react';

import Board from './Board';
import IconPicker from './IconPicker';
import ExitMenu from './ExitMenu';
import EndGameMenu from './EndGameMenu';

// ICONS
import { AiOutlineClose } from "react-icons/ai";
import { BiInjection } from "react-icons/bi";
import { CiFries } from "react-icons/ci";
import { FaBaby, FaBiohazard, FaCat, FaDog, FaDragon, FaHorse, FaRegCircle } from 'react-icons/fa';
import { FaComputer, FaFrog} from 'react-icons/fa6';
import { GiBabyBottle, GiBalloonDog, GiBarefoot, GiBeard, GiBeaver, GiChainsaw, GiChickenOven, GiChipsBag, GiDragonfly, GiNoseSide, GiRobberMask, GiSharkJaws, GiSquirrel, GiUnderwearShorts } from 'react-icons/gi';
import { GoLaw } from "react-icons/go";
import { ImEye } from "react-icons/im"
import { LiaBeerSolid, LiaDragonSolid, LiaUserNurseSolid } from "react-icons/lia";
import { MdOutlineBabyChangingStation } from "react-icons/md";
import { PiBabyBold, PiFlyingSaucerThin,PiHandEye } from "react-icons/pi";
import { RiVirusFill } from "react-icons/ri";
import { SiLetsencrypt } from "react-icons/si";
import { TbEyeglass2 } from "react-icons/tb";

export default function Main() {
  const icons = [
    AiOutlineClose,
    FaRegCircle,
    BiInjection,
    CiFries,
    FaBaby,
    FaBiohazard,
    FaCat,
    FaComputer,
    FaDog,
    FaDragon,
    FaFrog,
    FaHorse,
    GiBabyBottle, 
    GiBalloonDog,
    GiBarefoot,
    GiBeard,
    GiBeaver,
    GiChainsaw,
    GiChickenOven,
    GiChipsBag,
    GiDragonfly,
    GiNoseSide,
    GiRobberMask,
    GiSharkJaws,
    GiSquirrel,
    GiUnderwearShorts,
    GoLaw,
    ImEye,
    LiaBeerSolid,
    LiaDragonSolid,
    LiaUserNurseSolid,
    MdOutlineBabyChangingStation,
    PiBabyBold,
    PiFlyingSaucerThin,
    PiHandEye,
    RiVirusFill,
    SiLetsencrypt,
    TbEyeglass2,
]
const [playerIcons, setPlayerIcons] = useState({1:icons[0],2:icons[1],"T":"T"});
const [winner,setWinner] = useState<undefined|1|2|"T">(undefined);
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
