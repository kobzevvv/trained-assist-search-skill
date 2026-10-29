'use strict';
const { spawn } = require('child_process');
const assert = require('node:assert');
const test = require('node:test');

function rpc(child, msg) {
  return new Promise((resolve, reject) => {
    let buf = '';
    const onData = (d) => {
      buf += d.toString();
      const lines = buf.split('\n');
      for (const line of lines) {
        if (!line.trim()) continue;
        try {
          const obj = JSON.parse(line);
          if (obj.id === msg.id) {
            child.stdout.off('data', onData);
            resolve(obj);
            return;
          }
        } catch {}
      }
    };
    child.stdout.on('data', onData);
    child.stdin.write(JSON.stringify(msg) + '\n');
    setTimeout(() => reject(new Error('timeout waiting for response')), 10000);
  });
}

test('MCP initialize + tools/list exposes search_serper and search_serp_free', async () => {
  const child = spawn(process.execPath, ['src/mcp-skills/index.js'], {
    cwd: process.cwd(),
    env: { ...process.env, FREE_SEARCH_BACKEND: 'duckduckgo,searxng,brave' },
    stdio: ['pipe', 'pipe', 'pipe'],
  });
  try {
    const init = await rpc(child, { jsonrpc: '2.0', id: 1, method: 'initialize', params: {} });
    assert.strictEqual(init.result.serverInfo.name, 'search-skills');

    const list = await rpc(child, { jsonrpc: '2.0', id: 2, method: 'tools/list', params: {} });
    const names = list.result.tools.map((t) => t.name).sort();
    assert.deepStrictEqual(names, ['search_serp_free', 'search_serper']);
  } finally {
    child.kill();
  }
});
