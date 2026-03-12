#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const { spawn } = require('child_process');

const dir = path.resolve(__dirname, '..', 'profiles');
if (!fs.existsSync(dir)) {
  console.error('profiles directory not found:', dir);
  process.exit(1);
}
const files = fs
  .readdirSync(dir)
  .filter((f) => f.endsWith('.cpuprofile'))
  .map((f) => ({ f, t: fs.statSync(path.join(dir, f)).mtime.getTime() }))
  .sort((a, b) => b.t - a.t);

if (!files.length) {
  console.error('no .cpuprofile found in', dir);
  process.exit(1);
}
const latest = path.join(dir, files[0].f);
const speedscopeBin = path.resolve(__dirname, '..', 'node_modules', '.bin', 'speedscope');

const child = spawn(speedscopeBin, [latest], { stdio: 'inherit' });
child.on('exit', (code) => process.exit(code ?? 0));

