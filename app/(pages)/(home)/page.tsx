"use client"; // this is a client component

import { AuthModal } from "@/app/components/authModal/authModal";
// Import styles
import styles from "./styles.module.css";

// Main react component
export default function Home() {
  return (
    <main className={styles.main}>
      <AuthModal visible={true} />
    </main>
  );
}
