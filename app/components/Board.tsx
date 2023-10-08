"use client"

import React from 'react';
import Tile from './Tile';
import { Dispatch, SetStateAction, useCallback, useEffect,useState } from 'react';
import { IconType } from 'react-icons';


interface BoardProps {
    playerIcons:{1:IconType,2:IconType};
    setWinner:Dispatch<SetStateAction< 1 | 2 | "T" | undefined >>;
    setIsPlaying:Dispatch<SetStateAction< boolean >>;
    tiles:IconType[];
    setTiles:Dispatch<SetStateAction< IconType[] >>;
    points:{1:number,2:number,"T":number};
    setPoints:Dispatch<SetStateAction<{1:number,2:number,"T":number}>>;
}

const Board:React.FC<BoardProps> = ({
    playerIcons,
    setWinner,
    setIsPlaying,
    tiles,
    setTiles,
    points,
    setPoints
}) => {

  const [currentPlayer, setCurrentPlayer] = useState<1|2>(1);


  function calculatWinner(){
        if (tiles[0]?.name && tiles[0]?.name === tiles[3]?.name && tiles[0]?.name === tiles[6]?.name){              //FIRST COLUMN
            console.log('FIRST COLUMN');
            return true;
        }
        if (tiles[1]?.name && tiles[1]?.name === tiles[4]?.name && tiles[1]?.name === tiles[7]?.name){              //SECOND COLUMN
            console.log('SECOND COLUMN');
                return true;
        } 
        if (tiles[2]?.name && tiles[2]?.name === tiles[5]?.name && tiles[2]?.name === tiles[8]?.name){              //THIRD COLUMN
            console.log('THIRD COLUMN');
                return true;
        }
        
        if (tiles[0]?.name && tiles[0]?.name === tiles[1]?.name && tiles[0]?.name === tiles[2]?.name){             //FIRST ROW
            console.log('FIRST ROW');
            return true;
        }
        if (tiles[3]?.name && tiles[3]?.name === tiles[4]?.name && tiles[3]?.name === tiles[5]?.name){             //SECOND ROW
            console.log('SECOND ROW');
            return true;
        }
        if (tiles[6]?.name && tiles[6]?.name === tiles[7]?.name && tiles[6]?.name === tiles[8]?.name){             //THIRD ROW
            console.log('THIRD ROW');
            return true;
        }
        
        if (tiles[0]?.name && tiles[0]?.name === tiles[4]?.name && tiles[0]?.name === tiles[8]?.name) {           //DIAGONALS-1
            console.log('DIAGONALS 1');
            return true;
        }
        if (tiles[2]?.name && tiles[2]?.name === tiles[4]?.name && tiles[2]?.name === tiles[6]?.name){           //DIAGONALS-2
            console.log('DIAGONALS 2');
            return true;
        }
        
        return false; // NO IDENTICAL ROW/COLUMN/DIAGONAL WAS FOUND
  }

  function calculatTie(){
    if(tiles.filter(t=>t !== null).length == tiles.length){
        return true;
    }
    return false;
  }
  
  function setTilesValue(index:number) {
    const newData = tiles.map((val, i)=>{
        if(i === index){
            return playerIcons[currentPlayer];
        }
        return val;
    });
    // setIsPlaying(true);
    setTiles(newData);
    //console.log(tiles);
    // const hasWinner = calculatWinner(index);
    // console.log(hasWinner);
    // if (hasWinner){
    //     setWinner(currentPlayer);
    // } else {
    //     setCurrentPlayer(currentPlayer === 1 ? 2 : 1);
    // }
  }

  useEffect(()=>{
    if(tiles.filter(t => t !== null).length === 0){ //Game was interupted
       const sum = Object.values(points).reduce((acc,v)=>{return acc + v;},0);
       if(sum % 2 === 0){
            setCurrentPlayer(1);
        }
        else {
            setCurrentPlayer(2);
        }
    } 


    if(tiles.filter(t => t !== null).length === 1){ //First round has been played
        setIsPlaying(true);
        // console.log(tiles.filter(t => t !== null).length);
    }
    if (tiles.filter(t => t !== null).length > 0){
        const hasWinner = calculatWinner();
        const itsATie = calculatTie();
        if(hasWinner){
            setWinner(currentPlayer);
        } else if(itsATie){
            setWinner("T");
        } else {
            setCurrentPlayer(currentPlayer === 1 ? 2 : 1);
        }
    }

  },[tiles]);

  
  const PlayerIcon1 = playerIcons[1];
  const PlayerIcon2 = playerIcons[2];

  return (
    <div className='
    l-1/6 t-1/6
    h-2/3 w-2/3
    z-10
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
        <div className={`flex flex-col items-center justify-center grow ${currentPlayer !== 1 && " opacity-50"} `}>
            <div className='flex flex-row items-center justify-center gap-2'>
                <h3 className={`text-white text-3xl ${currentPlayer === 1 && "scale-120 drop-shadow-[0_3px_3px_rgba(0,0,0,0.8)]"}`}>PLAYER</h3>
                <PlayerIcon1 size="1.5rem" style={{color:"white"}}/>
                </div>
            <h3 className='text-white text-5xl pt-2'>{points[1]}</h3>
        </div>
        <div className='flex flex-col items-center justify-center grow opacity-50'>
            <h3 className='text-white text-3xl'>TIE</h3>
            <h3 className='text-white text-5xl pt-2'>{points["T"]}</h3>
        </div>
        <div className={`flex flex-col items-center justify-center grow ${currentPlayer !== 2 && " opacity-50"} `}>
            <div className='flex flex-row items-center justify-center gap-2'>
                <h3 className={`text-white text-3xl ${currentPlayer === 2 && "scale-120 drop-shadow-[0_3px_3px_rgba(0,0,0,0.8)]"}`}>PLAYER</h3>
                <PlayerIcon2 size="1.5rem" style={{color:"white"}}/>
                </div>
            <h3 className='text-white text-5xl pt-2'>{points[2]}</h3>
        </div>
      </div>
    </div>
  );
}




export default Board;
