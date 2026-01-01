# Troubleshooting Guide

## Current Issue: API Connection Timeout

The error you're seeing suggests that the Node.js server cannot connect to the Anthropic API. This could be due to:

### Possible Causes:

1. **Network/Firewall Issues**
   - Corporate firewall blocking outbound HTTPS requests
   - VPN or proxy configuration
   - Network security software

2. **DNS Resolution Problems**
   - Unable to resolve api.anthropic.com

3. **Node.js Environment Issue**
   - Need to configure proxy settings

## Immediate Solutions to Try:

### Solution 1: Check if you can reach the API from your browser

Open your browser's developer console and run:

```javascript
fetch('https://api.anthropic.com/v1/messages', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'x-api-key': 'YOUR_API_KEY_HERE',
    'anthropic-version': '2023-06-01',
  },
  body: JSON.stringify({
    model: 'claude-sonnet-4-5-20250514',
    max_tokens: 100,
    messages: [{role: 'user', content: 'Hello'}]
  })
}).then(r => r.json()).then(console.log)
```

### Solution 2: Restart the Dev Server

**IMPORTANT**: After changing `.env.local`, you MUST restart the dev server:

1. Stop the current dev server (Ctrl+C in terminal)
2. Run: `npm run dev`
3. Refresh your browser

### Solution 3: Check for Proxy Settings

If you're behind a corporate proxy, you may need to set environment variables:

```bash
export HTTP_PROXY=http://your-proxy:port
export HTTPS_PROXY=http://your-proxy:port
npm run dev
```

### Solution 4: Use Alternative Approach

If the network issue persists, we can:
1. Make the API call directly from the browser (client-side) instead of server-side
2. This bypasses Node.js network issues

## Next Steps:

1. **Restart your dev server** - This is the most common fix
2. Check the browser console logs when you submit an analysis
3. Look for detailed error messages we just added
4. Share the specific error message you see

## Current Status:

✅ API keys are correctly configured in `.env.local`
✅ Code has been updated with comprehensive logging
✅ Error handling improved to show actual error messages
⚠️ Network connectivity issue detected from Node.js environment

**Action Required**: Restart the dev server and try again!
