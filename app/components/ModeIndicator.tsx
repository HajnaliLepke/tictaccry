import { BsFillPeopleFill,BsFillPersonFill } from 'react-icons/bs';
import { AiFillRobot } from 'react-icons/ai';

interface ModeIndicatorProps {
    isAI:boolean;
    isAIStronk:boolean;    
}

const ModeIndicator:React.FC<ModeIndicatorProps> = ({isAI,isAIStronk}) => {
  return (
    <div className={`fixed z-20 top-1 ${ isAI ? "left-[calc(50%-6rem)]" : "left-[calc(50%-2rem)]" } flex flex-col items-center justify-center`}>
      {
        !isAI ? (

            <BsFillPeopleFill size="4rem" style={{color:"white"}}/>
            )
            : (
            isAIStronk ? (
                <div className='flex flex-row items-center justify-center gap-5'>
                <BsFillPersonFill size="4rem" style={{color:"white"}}/>
                <h1 className='text-white text-3xl'>VS</h1>
                <AiFillRobot size={"4rem"} style={{color: "#b91c1c"}}/>
                <div className='bg-black w-[10px] h-[2px] rotate-45 absolute top-[0.75rem] right-[calc(1rem+17.5px)]'></div>
                <div className='bg-black w-[10px] h-[2px] rotate-[-45deg] absolute top-[0.75rem] right-[calc(1rem+5px)]'></div>
                </div>
                )
                : (
                <div className='flex flex-row items-center justify-center gap-5'>
                <BsFillPersonFill size="4rem" style={{color:"white"}}/>
                <h1 className='text-white text-3xl'>VS</h1>
                <AiFillRobot size="4rem" style={{color:"white"}}/>
                </div>
            )
        )
      }
    </div>
  )
}

export default ModeIndicator
