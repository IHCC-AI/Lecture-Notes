# Local Front End

We got Ollama installed and running, but we don't want to have to use the command line to interact with it. Let's use a simple front end to make it easier to use.
We can also build our own!!

## Open WebUI

Make sure Ollama is running.

```bash
docker exec -it ollama bash
ollama list
```

Install Open WebUI via Docker:

> You might need to remove `/` on windows.

```bash
docker run -d -p 3000:8080 \
  -e OLLAMA_BASE_URL=http://host.docker.internal:11434 \
  -v open-webui:/app/backend/data \
  --name open-webui \
  --restart always \
  ghcr.io/open-webui/open-webui:main
```

```powershell
docker run -d -p 3000:8080 -e OLLAMA_BASE_URL=http://host.docker.internal:11434 -v open-webui:/app/backend/data --name open-webui --restart always ghcr.io/open-webui/open-webui:main
```

Now go to [http://localhost:3000](http://localhost:3000) and create an admin account.
My "Account" is below. The account is just local and doesn't matter.

```
Name: Luke
Email: luke@luke.com
Password: password
```

Output will take a long time.
If it stuck, that is normal just wait for it to finish, or restart the container.

## Desktop Alternative

Instead of running Open WebUI in Docker, you can also download a desktop client.
There are so many but I will use [Alpaca](https://jeffser.com/alpaca/). You don't have to install anything.

## Custom Front End

Download [the HTML file](./AIClient/AIClient.html) from blackboard and open it in your browser.
Edit the Model and Port to match your Ollama settings.
I thought this example together so it's not perfect.
