import { useEffect, useState } from 'react';

const Point = ({ coord, index }) => {
  //! единица трясется(анимация) ,из-за растяжения w h во время hover
  const [isHovered, setIsHovered] = useState(false);
  useEffect(() => {
    console.log(isHovered);
  }, [isHovered]);

  return (
    <>
      <div>
        <span
          className="peer w-4 h-4 p-6 rounded-full bg-red-500 opacity-50 absolute -translate-x-1/2 -translate-y-1/2 z-50"
          style={{
            left: coord.x,
            top: coord.y,
          }}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}></span>
        <div
          className="absolute w-2.5 h-2.5 bg-[#42567A] rounded-full transform -translate-x-1/2 -translate-y-1/2 
               peer-hover:w-[56px] peer-hover:h-[56px] peer-hover:bg-white peer-hover:border-[1px] peer-hover:border-[#42567A] flex justify-center items-center text-black  
               transition-all duration-300"
          style={{
            left: coord.x,
            top: coord.y,
          }}>
          <span className={`hidden ${isHovered ? '!block' : 'hidden'} select-none`}>{index}</span>
        </div>
      </div>
    </>
  );
};
export default Point;
