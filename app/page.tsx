import Image from 'next/image'
import Board from './components/Board';

export default function Home() {
  return (
    <div className='
    h-full w-full 
    absolute
    bg-black
    flex flex-row
    items-center
    justify-center
    '>
      <Board/>
    </div>
  );
}
