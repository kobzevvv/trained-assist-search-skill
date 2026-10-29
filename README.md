# trained-assist-search-skill

Standalone MCP server (stdio, JSON-RPC 2.0) exposing web search tools:

- `search_serper` — Google search via Serper (requires `SERPER_API_KEY`).
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
  "command": ["npx", "-y", "github:kobzevvv/trained-assist-search-skill"],
  "environment": {
    "FREE_SEARCH_BACKEND": "duckduckgo,searxng,brave",
    "SERPER_API_KEY": "{file:/path/to/serper-key}"
  },
  "disabled": false
}
```

Or use a local clone:

```json
"command": ["node", "/path/to/trained-assist-search-skill/src/mcp-skills/index.js"]
```
