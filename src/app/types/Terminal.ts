import { TerminalStatus } from "./TerminalStatus";
import { TerminalLog } from "./TerminalLog";

export interface Terminal {
    id: number;
    logs: TerminalLog[];
    title: string;
    status: TerminalStatus;
    command: string;
    createdAt: Date;
    createdBy: string;
}
