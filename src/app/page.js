'use client';

import React from "react";
import Image from "next/image";


export const Box = () => {
  const [isHovered, setIsHovered] = React.useState(false);

  return (
    <div 
      className="w-[742px] h-[223px] relative group cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
    >
      {/* Hover effect component - initially hidden, appears on hover */}
      <div className={`absolute inset-0 transition-opacity duration-500 pointer-events-none z-10 ${
        isHovered ? 'opacity-100' : 'opacity-0'
      }`}>
                 <img
           className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1700px] h-[650px] max-w-none max-h-none -ml-20"
           alt="Vector"
           src="/Vector1.png"
         />
      </div>
      
      {/* Original WAVES component with animation */}
             <div className={`w-[742px] h-[223px] shadow-[0px_4px_4px_#00000040] opacity-50 relative z-20 transition-transform duration-1200 ease-out ${
         isHovered ? 'transform -translate-y-16' : ''
       }`}>
        <div className="relative w-[772px] h-[223px] left-[-15px]">
          <div className="absolute w-[442px] h-[30px] top-[193px] left-[154px]">
            <h1 className="absolute w-[440px] top-0 left-0 [-webkit-text-stroke:0.2px_#e1c37382] [font-family:'Cinzel_Decorative-Bold',Helvetica] font-bold text-[#f8e8bd] text-[28px] text-center tracking-[1.68px] leading-[normal] whitespace-nowrap">
              MASQUERADE OF MAYHEM
            </h1>
          </div>

          <Image
            className="absolute w-[772px] h-[203px] top-0 left-0 aspect-[4.55]"
            alt="Waves final logo"
            src="/Logo.svg"
            width={772}
            height={203}
          />
        </div>
      </div>
    </div>
  );
};

export default function Home() {
  return (
    <div className="w-full h-screen relative overflow-hidden">
      <div className="absolute inset-0 w-full h-full">
        <Image
          src="/Home_Starting.svg"
          alt="Background"
          fill
          className="object-cover w-full h-full"
          priority
          sizes="100vw"
          style={{
            objectFit: 'cover',
            objectPosition: 'center 30%',
          }}
        />
      </div>
      
      {/* Centered Box component positioned like in the masquerade theme */}
      <div className="absolute inset-0 flex items-end justify-center pb-16">
        <Box />
      </div>
    </div>
  );
}