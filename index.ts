import { Console } from 'console';
import path from 'path';
import url from 'url';
import * as stackTraceParser from 'stacktrace-parser';

const __dirname = path.dirname(url.fileURLToPath(import.meta.url));
const console = new Console({ stdout: process.stdout, stderr: process.stderr });
const c = {
  red: '\u001b[36m',
  reset: '\u001b[0m',
};
let lastSourceLocation: string;

export const log = (...args: any[]) => {
  const latestTrace = stackTraceParser.parse(new Error().stack ?? '')[1];

  const functionName = latestTrace.methodName;
  const sourceLocation = `${latestTrace.file
    ?.replace('file://', '')
    .replace(`${__dirname}/`, '')}:${latestTrace.lineNumber}:${
    latestTrace.column
  }`;

  if (lastSourceLocation !== sourceLocation) {
    console.log(`${c.red}${functionName}${c.reset}`, sourceLocation);
  }

  console.log(...args);

  lastSourceLocation = sourceLocation;
};

export default log;
