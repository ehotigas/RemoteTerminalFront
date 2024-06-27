'use client'
import { API_URL } from "../types/GlobalVars";
import { Terminal } from "../types/Terminal";
import { useEffect, useState } from "react";
import { FaTrash } from "react-icons/fa";
import styles from "./layout.module.css";
import Link from "next/link";
import { useRouter } from "next/navigation";


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [terminalList, setTerminalList] = useState<Terminal[]>([]);
  const [terminalForm, setTerminalForm] = useState<boolean>(false);
  const [title, setTitle] = useState<string>("");
  const [command, setCommand] = useState<string>("");
  const router = useRouter();

  const newTerminalButtonClickHandler = () => {
    if (!terminalForm) {
      setTerminalForm(true);
    }
  }

  const getTerminalList = async () => {
    const req = await fetch(`${API_URL}/terminal`);
    const data: { terminais: Terminal[] } = await req.json();
    if (data?.terminais) {
      setTerminalList(data.terminais);      
    }
  }

  const closeButtonClickHandler = () => {
    setTerminalForm(false);
    console.log(terminalForm)
  }

  const titleChangeEventHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  }
  const cmdChangeEventHandler = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCommand(event.target.value);
  }

  const trashButtonClickHandler = (id: number) => async () => {
    await fetch(
      `${API_URL}/terminal/${id}`,
      { method: "DELETE" }
    );
    getTerminalList();
    router.push("/")
  }

  const createButtonClickHandler = async () => {
    await fetch(
      `${API_URL}/terminal`,
      {
        method: "POST",
        headers: {
          'Content-Type': "application/json"
        },
        body: JSON.stringify({
          command: command,
          title: title,
          createdBy: "portal"
        })
      }
    );
    getTerminalList();
  }

  const noFormsStyle = {
    height: "40px"
  }

  const formsStyle = {
    minHeight: "100px",
    height: "max-content",
    outline: "none"
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
                <div
                  className={styles.trash}
                  onClick={trashButtonClickHandler(terminal.id)}
                >
                  <FaTrash className={styles.trashIcon}/>
                </div>
              </div>
            </Link>
          ))
        }
        <button
          className={styles.newTerminalButton}
          onClick={newTerminalButtonClickHandler}
          style={terminalForm ? formsStyle : noFormsStyle}
        >
          {
            terminalForm ? <>
              <input
                className={styles.titleInput}
                onChange={titleChangeEventHandler}
                placeholder="título"
                type="text"
              />
              <textarea
                className={styles.commandInput}
                onChange={cmdChangeEventHandler}
                placeholder="comando"
              />
              <div className={styles.buttonContainer}>
                <button
                  className={styles.createButton}
                  onClick={createButtonClickHandler}
                >
                  Criar
                </button>
                <button
                  className={styles.cancelButton}
                  onClick={closeButtonClickHandler}
                >
                  x
                </button>
              </div>
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
