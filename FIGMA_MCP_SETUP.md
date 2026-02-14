# Figma MCP Setup Guide

This guide explains how to configure the Figma Model Context Protocol (MCP) server for use with Cursor IDE and the Flight CLI workflow.

## Overview

The Figma MCP server allows Cursor's AI to directly extract design tokens, typography, colors, and component structures from Figma files. This enables seamless design-to-code workflows.

## Prerequisites

- Cursor IDE with CLI installed
- Figma account with access to design files
- Node.js 18+ installed

## Step 1: Get Figma Personal Access Token

1. Go to [Figma Account Settings](https://www.figma.com/settings)
2. Scroll to **Personal Access Tokens**
3. Click **Generate new token**
4. Give it a name (e.g., "Cursor MCP")
5. Copy the token (starts with `figd_...`)

⚠️ **Important:** Save this token securely - you won't be able to see it again!

## Step 2: Configure MCP in Cursor

### Option A: Global Configuration (Recommended)

Create or edit `~/.cursor/mcp.json`:

```json
{
  "mcpServers": {
    "figma": {
      "command": "npx",
      "args": [
        "-y",
        "@modelcontextprotocol/server-figma"
      ],
      "env": {
        "FIGMA_PERSONAL_ACCESS_TOKEN": "figd_your_token_here"
      }
    }
  }
}
```

### Option B: Project-Specific Configuration

Create `.cursor/mcp.json` in your project root:

```json
{
  "mcpServers": {
    "figma": {
      "command": "npx",
      "args": [
        "-y",
        "@modelcontextprotocol/server-figma"
      ],
      "env": {
        "FIGMA_PERSONAL_ACCESS_TOKEN": "${FIGMA_TOKEN}"
      }
    }
  }
}
```

Then set the environment variable:

```bash
# Add to ~/.zshrc or ~/.bashrc
export FIGMA_TOKEN="figd_your_token_here"
```

## Step 3: Verify Setup

```bash
# List all configured MCP servers
cursor agent mcp list

# Check Figma MCP tools
cursor agent mcp list-tools figma

# Should show tools like:
# - get_file_design_tokens
# - get_component_details
# - get_styles
```

## Step 4: Test in Cursor

Open any project and try:

```
Cmd+L (or Cmd+K): "Extract typography from https://figma.com/file/abc123"
```

Cursor should use the Figma MCP to fetch design data.

## Available Figma MCP Tools

Once configured, these tools are available to the AI:

- **get_file_design_tokens** - Extract colors, typography, spacing
- **get_component_details** - Get component structure and properties  
- **get_styles** - Retrieve text styles, color styles, effects
- **get_file_images** - Export images and assets
- **get_comments** - Read design comments and annotations

## Usage with Flight CLI

When you run `flight init` or `flight config`, the AI guidelines (AGENTS.md) automatically reference Figma MCP for design token extraction.

### Example Workflow

1. Designer shares Figma file URL
2. Developer runs: `flight init my-project`
3. In Cursor, say: "Create Hero block from https://figma.com/file/xyz"
4. AI uses Figma MCP to extract design tokens
5. Code is generated with correct typography classes and color variables

## Troubleshooting

### "Figma MCP not found"

- Ensure `mcp.json` is in the right location
- Restart Cursor IDE
- Check token is valid: `cursor agent mcp list`

### "Authentication failed"

- Verify your Figma token is correct
- Token might have expired - generate a new one
- Ensure token has file access permissions

### "Tools not showing up"

```bash
# Manually enable Figma MCP
cursor agent mcp enable figma

# Check status
cursor agent mcp list
```

### "Rate limit errors"

Figma API has rate limits. If you hit them:
- Wait a few minutes
- Use fewer API calls
- Consider caching design tokens locally

## Security Best Practices

1. **Never commit tokens to git**
   - Add `.cursor/mcp.json` to `.gitignore` if it contains tokens
   - Use environment variables for team projects

2. **Use environment variables**
   ```json
   "env": {
     "FIGMA_PERSONAL_ACCESS_TOKEN": "${FIGMA_TOKEN}"
   }
   ```

3. **Rotate tokens regularly**
   - Generate new tokens every few months
   - Revoke old tokens in Figma settings

4. **Team setup**
   - Each developer should have their own token
   - Document the setup process for new team members
   - Consider using a shared Figma account for read-only access

## Resources

- [Cursor MCP Documentation](https://cursor.com/docs/context/mcp)
- [Figma MCP Server](https://github.com/modelcontextprotocol/servers/tree/main/src/figma)
- [Figma API Documentation](https://www.figma.com/developers/api)
- [Model Context Protocol Specification](https://modelcontextprotocol.io)

## Related

- [AGENTS.md](./AGENTS.md) - Main AI guidelines with Figma token usage
- [mcp.json.example](./mcp.json.example) - Example MCP configuration
- [Block Creation Guide](./.flight/block-creation-guide.md) - Using extracted tokens in blocks
