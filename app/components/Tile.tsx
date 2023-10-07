"use client"

import React from 'react';
import { IconType } from "react-icons";


interface TileProps{
    icon?: IconType;
    onClick: (
      //e: React.MouseEvent<HTMLDivElement>
      )=> void;
}

const Tile:React.FC<TileProps> =({
    icon: Icon,
    onClick,
}) => {
  //const iconstyle = { color: "white", size: "8rem" };
  return (
    <div 
    className='w-full h-full bg-slate-700 flex items-center justify-center'
    onClick={Icon ? undefined : onClick} //Can't click if it already has an Icon 
    >
      {
         Icon && (<Icon size="7rem" color='white'/>)
      }
      
    </div>
  );
}

export default Tile;
