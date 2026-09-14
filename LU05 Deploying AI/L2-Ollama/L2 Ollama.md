# Install Ollama

**Use the Running AI Locally assignment.**

## Cleaning Up Tip

To remove all Ollama models:

```bash
ollama list | awk 'NR>1 {print $1}' | xargs -I {} ollama rm {}
```
