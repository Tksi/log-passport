import { Console } from 'console';
import * as stackTraceParser from 'stacktrace-parser';
const console = new Console({ stdout: process.stdout, stderr: process.stderr });
export const log = (...args) => {
    const latestTrace = stackTraceParser.parse(new Error().stack ?? '')[1];
    console.log(`\u001b[36m${latestTrace.methodName}\u001b[0m`, `${latestTrace.file?.replace('file://', '')}:${latestTrace.lineNumber}:${latestTrace.column}`);
    console.log(...args);
};
export default log;
