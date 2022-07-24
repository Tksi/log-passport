import { Console } from 'console';
import * as stackTraceParser from 'stacktrace-parser';
const console = new Console({ stdout: process.stdout, stderr: process.stderr });
const c = {
    red: '\u001b[36m',
    reset: '\u001b[0m',
};
let lastSourceLocation;
export const log = (...args) => {
    const latestTrace = stackTraceParser.parse(new Error().stack ?? '')[1];
    const functionName = latestTrace.methodName;
    const sourceLocation = `${latestTrace.file?.replace('file://', '')}:${latestTrace.lineNumber}:${latestTrace.column}`;
    if (lastSourceLocation !== sourceLocation) {
        console.log(`${c.red}${functionName}${c.reset}`, sourceLocation);
    }
    console.log(...args);
    lastSourceLocation = sourceLocation;
};
export default log;
