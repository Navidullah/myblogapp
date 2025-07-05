import React from "react";
import styles from "./featured.module.css";
import Image from "next/image";
import { Button } from "@/components/ui/button";
const Featured = () => {
  return (
    <div className="wrapper relative ">
      {/* Glowing Effect in Center */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-96 h-96 rounded-full bg-purple-500 opacity-30 dark:opacity-20 blur-[100px]"></div>
      </div>

      <h1 className="text-3xl text-center mt-5 text-primary font-bold">
        Featured Post
      </h1>

      <div className={styles.post}>
        <div className={`${styles.imgContainer} shadow-lg`}>
          <Image src="/thought.jpg" alt="" fill className={styles.image} />
        </div>
        <div className={`${styles.textContainer} font-sans`}>
          <h1 className={styles.postTitle}>
            Lorem ipsum dolor sit amet alim consectetur adipisicing elit.
          </h1>
          <p className={`${styles.postDesc} font-sans`}>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit.
            Cupiditate, quam nisi magni ea laborum inventore voluptatum
            laudantium repellat ducimus unde aspernatur fuga. Quo, accusantium
            quisquam! Harum unde sit culpa debitis.
          </p>
          <Button className={`${styles.button} hover:cursor-pointer`}>
            Read More
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Featured;
