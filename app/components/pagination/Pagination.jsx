/*"use client";

import React from "react";
import styles from "./pagination.module.css";
import { useRouter } from "next/navigation";

const Pagination = ({ page, hasPrev, hasNext }) => {
  const router = useRouter();

  return (
    <div className={styles.container}>
      <button
        className={styles.button}
        disabled={!hasPrev}
        onClick={() => router.push(`?page=${page - 1}`)}
      >
        Previous
      </button>
      <button
        disabled={!hasNext}
        className={styles.button}
        onClick={() => router.push(`?page=${page + 1}`)}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;*/

// app/components/pagination/Pagination.jsx
"use client";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import styles from "./pagination.module.css";

const Pagination = ({ page, hasPrev, hasNext }) => {
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();

  const navigateTo = (newPage) => {
    params.set("page", newPage);
    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <div className={styles.container}>
      <button
        disabled={!hasPrev}
        onClick={() => navigateTo(page - 1)}
        className={styles.button}
      >
        Previous
      </button>
      <button
        disabled={!hasNext}
        onClick={() => navigateTo(page + 1)}
        className={styles.button}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
