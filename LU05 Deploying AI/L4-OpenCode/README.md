# AI Agent Harness

What is an AI Agent Harness?
[YT Short](https://www.youtube.com/shorts/IVdJj_aNwhE).

The Harness doesn't run the model, it the environment that allows the model to call tools.

Harnesses I think have done more to make AI useful than raw AI improvements.

There are a lot of harnesses:

- Claude Code
- CodeX
- OpenCode

We will be using [OpenCode](https://opencode.ai/) as our harness. It is open source and easy to self host.

## Install OpenCode

You can install it Locally or via Node.
I have not tested this on Windows yet.

```bash
curl -fsSL https://opencode.ai/install | bash
```

Close and reopen your terminal, then run:

```bash
opencode
```

Run a prompt and see it work.
Then lets try to get it to work with local Ollama.

## Configure OpenCode to use Ollama

Create or update the configuration file on your host machine at `~/.config/opencode/opencode.json`:

```bash
nano ~/.config/opencode/opencode.json
```

```json
{
    "$schema": "https://opencode.ai/config.json",
    "provider": {
        "ollama": {
            "npm": "@ai-sdk/openai-compatible",
            "name": "Ollama",
            "options": {
                "baseURL": "http://127.0.0.1:11434/v1",
                "apiKey": "ollama"
            },
            "models": {
                "qwen3.5:2b": {
                    "name": "qwen3.5:2b"
                }
            }
        }
    }
}
```

## Run OpenCode with Ollama

**MAKE SURE YOU OPEN IN A NEW EMPTY FOLDER**
OpenCode can change any files in the current folder.

```bash
opencode --model ollama/qwen3.5:2b
```


## Delete OpenCode

```bash
opencode uninstall
```