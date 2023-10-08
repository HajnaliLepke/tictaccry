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
    isAI:boolean;
    isAIStronk:boolean;
}

const Board:React.FC<BoardProps> = ({
    playerIcons,
    setWinner,
    setIsPlaying,
    tiles,
    setTiles,
    points,
    setPoints,
    isAI,
    isAIStronk
}) => {

  const [currentPlayer, setCurrentPlayer] = useState<1|2>(1);

  function takeARandomGuess(new_tiles:IconType[]){
    const empties:any = new_tiles.map((t,i)=>{return t===null && i});
    const guess = empties[Math.floor(Math.random()*empties.length)];
    return guess;
  }    

  function worldDominationNextLevel200IQApocalypseRobotMoveCalulator(new_tiles:IconType[]|null, player:1|2){
    const max_player = 2;
    const min_player = 1;
    let best_move:{"position":number|null,"score":number} = {"position":null,"score":player === max_player ? Infinity : -Infinity};
    if (!new_tiles){
        new_tiles = tiles;
    }
    if (new_tiles.filter(t=>t===null).length > 7){ //First move, doesn't matter
        let didntfindityet = true;
        let move = Math.random()*9
        while (didntfindityet){
            move = Math.random()*9
            if (tiles[move] === null){
                didntfindityet = false
            }
        }
        best_move["position"] = move;
        return best_move;
        
    }
    const possible_moves_length = new_tiles.filter(t=>t===null).length;
    const isWinner = calculatWinner()
    if (isWinner !== -1){
        best_move["score"] = (isWinner === max_player ? 1 : -1) * (1 + possible_moves_length);
        return best_move;
    } else if (possible_moves_length === 0){
        best_move["score"] = 0;
        return best_move;
    }
    for (let i = 0; i< new_tiles.length;i++){
        if (new_tiles[i] === null){
            const new_new_tiles = new_tiles.map((_t,index)=>{return index === i ? playerIcons[player] : _t });
            let sim_score = worldDominationNextLevel200IQApocalypseRobotMoveCalulator(new_new_tiles,player === max_player ? min_player : max_player );
            sim_score["position"] = i;
            
            if(player === max_player){ //MAX_PLAYER
                if(sim_score!["score"] > best_move["score"]){
                    best_move = sim_score!
                }
            } else {
                if(sim_score!["score"] < best_move["score"]){
                    best_move = sim_score!
                }
            }
        }

    }
    return best_move

  }


  function calculatWinner(){
        if (tiles[0]?.name && tiles[0]?.name === tiles[3]?.name && tiles[0]?.name === tiles[6]?.name){              //FIRST COLUMN
            console.log('FIRST COLUMN');
            return tiles[0]?.name === playerIcons[1].name ? 1 : 2;
        }
        if (tiles[1]?.name && tiles[1]?.name === tiles[4]?.name && tiles[1]?.name === tiles[7]?.name){              //SECOND COLUMN
            console.log('SECOND COLUMN');
                return tiles[1]?.name === playerIcons[1].name ? 1 : 2;
        } 
        if (tiles[2]?.name && tiles[2]?.name === tiles[5]?.name && tiles[2]?.name === tiles[8]?.name){              //THIRD COLUMN
            console.log('THIRD COLUMN');
                return tiles[2]?.name === playerIcons[1].name ? 1 : 2;
        }
        
        if (tiles[0]?.name && tiles[0]?.name === tiles[1]?.name && tiles[0]?.name === tiles[2]?.name){             //FIRST ROW
            console.log('FIRST ROW');
            return tiles[0]?.name === playerIcons[1].name ? 1 : 2;
        }
        if (tiles[3]?.name && tiles[3]?.name === tiles[4]?.name && tiles[3]?.name === tiles[5]?.name){             //SECOND ROW
            console.log('SECOND ROW');
            return tiles[3]?.name === playerIcons[1].name ? 1 : 2;
        }
        if (tiles[6]?.name && tiles[6]?.name === tiles[7]?.name && tiles[6]?.name === tiles[8]?.name){             //THIRD ROW
            console.log('THIRD ROW');
            return tiles[6]?.name === playerIcons[1].name ? 1 : 2;
        }
        
        if (tiles[0]?.name && tiles[0]?.name === tiles[4]?.name && tiles[0]?.name === tiles[8]?.name) {           //DIAGONALS-1
            console.log('DIAGONALS 1');
            return tiles[0]?.name === playerIcons[1].name ? 1 : 2;
        }
        if (tiles[2]?.name && tiles[2]?.name === tiles[4]?.name && tiles[2]?.name === tiles[6]?.name){           //DIAGONALS-2
            console.log('DIAGONALS 2');
            return tiles[2]?.name === playerIcons[1].name ? 1 : 2;
        }
        
        return -1; // NO IDENTICAL ROW/COLUMN/DIAGONAL WAS FOUND
  }

  function calculatTie(){
    if(tiles.filter(t=>t !== null).length == tiles.length){
        return true;
    }
    return false;
  }
  
  function setTilesValue(index:number,currentPlayer:1|2) {
    const newData = tiles.map((val, i)=>{
        if(i === index){
            return playerIcons[currentPlayer];
        }
        return val;
    });
    setTiles(newData);
    // console.log(newData);
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
        if(hasWinner !== -1){
            setWinner(currentPlayer);
        } else if(itsATie){
            setWinner("T");
        } else {
            // console.log(isAI + ": " + currentPlayer)
            // if(isAI && currentPlayer === 1){
            //     const move = worldDominationNextLevel200IQApocalypseRobotMoveCalulator(tiles,2);
            //     console.log(move)
            //     setTilesValue(move["position"]!,2) ;
            // }
            setCurrentPlayer(currentPlayer === 1 ? 2 : 1);
        }
    }

  },[tiles]);

//   useEffect(()=>{
//     if(currentPlayer === 2 && isAI){
//         let move:number;
//         // if (isAIStronk){
//         //     move = worldDominationNextLevel200IQApocalypseRobotMoveCalulator(tiles,currentPlayer)["position"]!;
//         // } else {
//             move = takeARandomGuess(tiles);
//         // }
//         const newData = tiles.map((val, i)=>{
//             if(i === move){
//                 return playerIcons[currentPlayer];
//             }
//             return val;
//         });
//         setTiles(newData);
//         setCurrentPlayer(1);
//     }
//   },[currentPlayer]);

  
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
                onClick={()=>{setTilesValue(i,currentPlayer)}} 
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
