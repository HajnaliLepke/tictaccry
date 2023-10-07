import Image from 'next/image'
import Board from './components/Board';
import IconPicker from './components/IconPicker';

export default function Home() {
  return (
    <div className='
    h-full w-full 
    absolute
    bg-slate-700
    flex flex-row
    items-center
    justify-center
    '>
      <IconPicker/>
      <Board/>
    </div>
  );
}
