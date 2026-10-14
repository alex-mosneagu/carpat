#!/usr/bin/env node
import { run } from './cli.js';

const code = run(process.argv.slice(2));
process.exit(code);
