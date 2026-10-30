# trained-assist-search-skill

Standalone MCP server (stdio, JSON-RPC 2.0) exposing web search tools:

- `search_serp_free` — keyless SERP scraping (DuckDuckGo, SearXNG, Brave).

## Run

```bash
node src/mcp-skills/index.js
```

## Test

```bash
npm test
```

## OpenCode config

```json
"search-skills": {
  "type": "local",
  "command": ["node", "/Users/vova/code/trained-assist-search-skill/src/mcp-skills/index.js"],
  "environment": {
    "FREE_SEARCH_BACKEND": "duckduckgo,searxng,brave"
  },
  "disabled": false
}
```
