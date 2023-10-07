"use client"

import React from 'react';
import Tile from './Tile';
import { useCallback,useState } from 'react';

import { AiOutlineClose } from "react-icons/ai";
import { BsCircle } from "react-icons/bs";
import { FaTimes, FaRegCircle } from "react-icons/fa";

function Board() {
  const [playerIcons, setPlayerIcons] = useState({1:AiOutlineClose,2:FaRegCircle});
  const [tiles,setTiles] =  useState(Array(9).fill(null));
  const [currentPlayer, setCurrentPlayer] = useState<1|2>(1);


  function setTilesValue(index:number) {
    const newData = tiles.map((val, i)=>{
        if(i === index){
            return playerIcons[currentPlayer];
        }
        return val;
    });
    console.log("What we want: " + newData);
    setTiles(newData);
    setCurrentPlayer(currentPlayer === 1 ? 2 : 1);
  }

  
  const PlayerIcon1 = playerIcons[1];
  const PlayerIcon2 = playerIcons[2];

  return (
    <div className='
    l-1/6 t-1/6
    h-2/3 w-2/3
    '>
      <div className='
      grid grid-cols-3 grid-rows-3 gap-2 
      w-full h-full
     bg-white
      '>
        {
            tiles.map((_tile,i)=>{
                return <Tile 
                onClick={()=>{setTilesValue(i)}} 
                key={i} icon={_tile}/>;
            })
        }

      </div>
      <div className='flex flex-row items-stretch w-full pt-3 mt-3'>
        <div className='flex flex-col items-center justify-center grow'>
            <div className='flex flex-row items-center justify-center gap-2'>
                <h3 className='text-white text-3xl'>PLAYER</h3>
                <PlayerIcon1 size="1.5rem" style={{color:"white"}}/>
                </div>
            <h3 className='text-white text-5xl pt-2'>0</h3>
        </div>
        <div className='flex flex-col items-center justify-center grow'>
            <h3 className='text-white text-3xl'>TIE</h3>
            <h3 className='text-white text-5xl pt-2'>0</h3>
        </div>
        <div className='flex flex-col items-center justify-center grow'>
            <div className='flex flex-row items-center justify-center gap-2'>
                <h3 className='text-white text-3xl'>PLAYER</h3>
                <PlayerIcon2 size="1.5rem" style={{color:"white"}}/>
                </div>
            <h3 className='text-white text-5xl pt-2'>0</h3>
        </div>
      </div>
    </div>
  );
}




export default Board;
