"use client"; // ← mandatory
import React from "react";
import { motion } from "framer-motion"; // ← named import only
import Link from "next/link";
import Image from "next/image";
import styles from "./categoryList.module.css";

export default function ClientCategoryList({ data }) {
  return (
    <div className={`${styles.container} wrapper`}>
      <h1 className={styles.title}>Popular Categories</h1>
      <div className={styles.categories}>
        {data.map((item) => (
          <Link
            key={item._id ?? item.slug}
            href={`/blog?cat=${item.slug}`}
            className={`${styles.categoryWrapper} ${
              styles[item.slug]
            } bg-[#F6F0FF] dark:bg-gray-900/20`}
          >
            {/* animated border SVG */}
            <motion.svg
              className={styles.borderSvg}
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
              initial={{ strokeDashoffset: 0 }}
              animate={{ strokeDashoffset: -400 }}
              transition={{
                repeat: Infinity,
                duration: 4,
                ease: "linear",
              }}
            >
              <rect
                x="1.5"
                y="1.5"
                width="97"
                height="97"
                fill="transparent"
                stroke="#DA00FF"
                strokeWidth="1"
                strokeDasharray="100 100"
              />
            </motion.svg>

            <div className={styles.categoryContent}>
              {item.img && (
                <div className="w-8 h-8 rounded-full overflow-hidden">
                  <Image
                    src={item.img}
                    alt={item.title}
                    width={32}
                    height={32}
                    className="object-cover"
                  />
                </div>
              )}
              <span>{item.title}</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
