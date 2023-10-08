import { LiaSadCrySolid } from "react-icons/lia";

export default function Loading(){
    return (
        <div 
        className=
        "h-full w-full absolute bg-slate-700 flex flex-col items-center justify-center z-50">
            <div className=" animate-spin">
                <LiaSadCrySolid size="7rem"/>
            </div>
        </div>
    );
}