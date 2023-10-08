"use client"

import { useEffect, useCallback ,useState } from 'react';

import Board from './Board';
import IconPicker from './SideMenu';
import ExitMenu from './ExitMenu';
import EndGameMenu from './EndGameMenu';
import { FaFaceSadCry } from "react-icons/fa6";

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
import { IconType } from 'react-icons';


export default function Main() {
  const [isLoading, setIsLoading] = useState(true);

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
const [isAI,setIsAI] = useState(true);
const [isAIStronk,setIsAIStronk] = useState(false);

  function randomizeIcons(){
    let player1:IconType,player2:IconType;
    let i_1 = Math.floor(Math.random() * icons.length);
    let i_2;
    do {
      i_2 = Math.floor(Math.random() * icons.length);
    } while(i_1 === i_2);

    player1 = icons[i_1];
    player2 = icons[i_2!];
    
    const new_playerIcons = {1:player1!,2:player2!,"T":"T"};
    setPlayerIcons(new_playerIcons);
  }

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

  useEffect(
    () => {
      setIsLoading(false);
    },[]);

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
          isLoading && (

            <div id='loader'
            className=
            "h-full w-full fixed bg-slate-700 flex flex-col items-center justify-center z-50 gap-8">
            <div className=" animate-spin-slow duration-100">
                <FaFaceSadCry size="7rem" style={{color:"white"}}/>
            </div>
            <div className='text-white text-5xl flex flex-row pl-5'>
            {
              ["L","O","A","D","I","N","G",".",".","."].map((l,i)=>{
                // return <h1 key={i} className={`animate-[bounce_1s_infinite_${i*0.1}ms]`}>{l}</h1>
                return <h1 key={i} className={`animate-bounce animation-delay-${i}!important`}>{l}</h1>
              })
            }
            </div>
        </div>
          )
        }

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
            isAI={isAI}
            setIsAI={setIsAI}
            isAIStronk={isAIStronk}
            setIsAIStronk={setIsAIStronk}
            randomizeIcons={randomizeIcons}
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
      isAI={isAI}
      />
    </div>
  );
}
