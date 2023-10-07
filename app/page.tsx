"use client"

import { useCallback ,useState } from 'react';

import Board from './components/Board';
import IconPicker from './components/IconPicker';

// ICONS
import { AiOutlineClose } from "react-icons/ai";
import { CiFries } from "react-icons/ci";
import { FaCat, FaDog, FaDragon, FaRegCircle, FaUserEdit,FaBiohazard } from 'react-icons/fa';
import { GiBalloonDog, GiBarefoot, GiBeard, GiBeaver, GiChickenOven, GiChainsaw, GiDragonfly } from 'react-icons/gi';
import { GoLaw } from "react-icons/go";
import { LiaDragonSolid } from "react-icons/lia";
import { PiFlyingSaucerThin } from "react-icons/pi";

export default function Home() {
  const icons = [
    AiOutlineClose,
    FaRegCircle,
    FaCat,
    FaDog,
    GiBalloonDog,
    GiBarefoot,
    GiBeaver,
    CiFries,
    GiBeard,
    GiChickenOven,
    GiChainsaw,
    PiFlyingSaucerThin,
    LiaDragonSolid,
    GiDragonfly,
    FaDragon,
    FaBiohazard,
    GoLaw
]
const [playerIcons, setPlayerIcons] = useState({1:icons[0],2:icons[1]});

  return (
    <div className='
    h-full w-full 
    absolute
    bg-slate-700
    flex flex-row
    items-center
    justify-center
    '>
      <IconPicker 
      icons={icons}
      playerIcons={playerIcons}
      setPlayerIcons = {setPlayerIcons}
      />
      <Board/>
    </div>
  );
}
