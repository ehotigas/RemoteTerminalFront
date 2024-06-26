'use client'
import { useEffect, useState } from "react";
import styles from "./layout.module.css";
import { Terminal } from "../types/Terminal";
import { API_URL } from "../types/GlobalVars";
import Link from "next/link";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [terminalList, setTerminalList] = useState<Terminal[]>([]);
  const [terminalForm, setTerminalForm] = useState<boolean>(false);

  const newTerminalButtonClickHandler = () => {
    setTerminalForm(true);
  }

  const getTerminalList = async () => {
    const req = await fetch(`${API_URL}/terminal`);
    const data: { terminais: Terminal[] } = await req.json();
    if (data?.terminais) {
      setTerminalList(data.terminais);      
    }
  }

  useEffect(() => {
    getTerminalList();
  }, []);
  return (
    <>
      <div className={styles.rightBar}>
        <div className={styles.header}>
          Terminais
        </div>
        {
          terminalList.map((terminal: Terminal, key: number) => (
            <Link
              href={`/${terminal.id}`}
              key={key}
            >
              <div className={styles.terminalCard}>
                <div className={styles.statusContainer}>
                  {terminal.status}
                </div>
                <div className={styles.titleContainer}>
                  {terminal.title}
                </div>
              </div>
            </Link>
          ))
        }
        <button
          className={styles.newTerminalButton}
          onClick={newTerminalButtonClickHandler}
          style={{
            height: terminalForm ? "100px" : "40px"
          }}
        >
          {
            terminalForm ? <>
              <input
                className={styles.titleInput}
                placeholder="título"
              >
              
              </input>
            </> : <>
              <p>+</p>
              <span>
                NovoTerminal
              </span>
            </>
          }
        </button>
      </div>
      {children}
    </>
  );
}
