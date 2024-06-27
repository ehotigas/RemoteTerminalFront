'use client'
import { useParams } from "next/navigation";
import styles from "./page.module.css";
import { useEffect, useState } from "react";
import { Terminal } from "@/app/types/Terminal";
import { API_URL } from "@/app/types/GlobalVars";
import { TerminalLog } from "@/app/types/TerminalLog";

export default function TerminalListPage() {
    const [terminalData, setTerminalData] = useState<Terminal>();
    const { terminalId } = useParams();

    const getTerminalData = async () => {
        const req = await fetch(`${API_URL}/terminal/${terminalId}`);
        const data = await req.json();
        if (data.id) {
            setTerminalData(data);
        }
    }

    useEffect(() => {
        getTerminalData();
    }, []);
    
    return (
        <div className={styles.mainContainer}>
            <div className={styles.terminalHeader}>
                <div className={styles.headerStatus}>
                    <p className={styles.headerStatusText}>{terminalData?.status}</p>
                </div>
                <p className={styles.terminalTitle}>
                    @{terminalData?.title}
                </p>
                <div className={styles.rightHeaderContainer}>
                    <div className={styles.circle} style={{ backgroundColor: "green" }}/>
                    <div className={styles.circle} style={{ backgroundColor: "yellow" }}/>
                    <div className={styles.circle}/>
                </div>
            </div>
            <div className={styles.terminalContainer}>
                <pre className={styles.bash}>
                    {
                        terminalData?.logs.map((log: TerminalLog, key: number) => <div
                            className={styles.lineDiv}
                            key={key}
                        >
                            {log.message}
                        </div>)
                    }
                </pre>
            </div>
        </div>
    );
}