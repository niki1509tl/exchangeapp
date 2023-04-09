import { existsSync, writeFileSync, appendFile } from 'fs';
import { getProjectPath } from 'src/utils/paths.utils';

export class Logger {
    private defaultLogName: string = 'error'

    constructor() {
        const file = this.getCurrentLogFile()
        if (!existsSync(file)) {
            writeFileSync(file, '');
        }
    }

    public logError(error: Error) {
        const now = new Date();
        const newLogFile = this.getCurrentLogFile()
        if (!existsSync(newLogFile)) {
            writeFileSync(newLogFile, '');
        }
        const logMessage = `[${now.toISOString()}] ${error.message || JSON.stringify(error)}\n`;
        appendFile(newLogFile, logMessage, (err) => {
            if (err) {
                console.error(`Error writing to log file: ${err}`);
            }
        });
    }

    private getCurrentLogFile(): string {
        const now = new Date();
        const month = now.toLocaleString('default', { month: 'long' });
        const year = now.getFullYear();
        return `${getProjectPath('src', 'logs')}/${this.defaultLogName}-${month}-${year}.log`;
    }
}

export default new Logger();
