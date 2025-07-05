"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import React from "react";
import { Typewriter } from "react-simple-typewriter";

const HearoPage = () => {
  return (
    <section className="relative bg-[#F6F0FF] py-40  dark:bg-zinc-900 overflow-hidden">
      {/* Glowing Effect in Center */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-96 h-96 rounded-full bg-purple-500 opacity-30 dark:opacity-20 blur-[100px]"></div>
      </div>

      <div className="wrapper">
        <h1 className="text-6xl font-bold text-primary mb-10">
          Hi! Naveed dev here. Discover my stories and creative ideas.
        </h1>
      </div>

      <div className="wrapper flex gap-8 flex-col xl:flex-row items-center relative z-10">
        {/* Text Section */}
        <div>
          <h1 className="text-3xl font-semibold mb-5">
            Hi! Naveed dev here. Discover my stories and creative ideas.
          </h1>
          <p className="text-lg text-gray-700 dark:text-gray-300 max-w-md leading-[1.8] mb-5">
            <Typewriter
              words={[
                "Stay updated with the latest trends, tutorials, and insights from the world of web development and design.",
              ]}
              loop="infinite"
              cursor
              cursorStyle="|"
              typeSpeed={40}
              deleteSpeed={0}
              delaySpeed={4500}
            />
          </p>
          <Button>Read more</Button>
        </div>

        {/* Image Section */}
        <div className="relative w-full h-70 md:h-96 xl:h-[500px]">
          <Image
            src="/person.png"
            alt="Featured cover"
            fill
            className="object-contain"
            priority
          />
        </div>
      </div>
    </section>
  );
};

export default HearoPage;
