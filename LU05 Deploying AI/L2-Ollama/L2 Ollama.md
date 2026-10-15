# Install Ollama

**Use the Running AI Locally assignment.**

## Cleaning Up Tip

Don't need to show this to class just a script *I* made to delete all the Ollama models in one go.
To remove all Ollama models:

```bash
ollama list | awk 'NR>1 {print $1}' | xargs -I {} ollama rm {}
```
