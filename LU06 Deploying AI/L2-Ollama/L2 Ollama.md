# Install Ollama 

You have two options local or docker. 
I highly recommend docker. 

**Use the Running AI Locally assignment.**

[//]: # (TODO update yml file to dl a model)

### Locally

[Just follow this link](https://ollama.com/download/mac)

### Docker

First make sure docker is installed 

```bash
docker --version
```

Now run the following command to install docker though Ollama.
Explain the students that if they have different hardware they will want to run it differently. 
[Link for commands for different hardware](https://hub.docker.com/r/ollama/ollama)

```bash
docker run -d -v ollama:/root/.ollama -p 11434:11434 --name ollama ollama/ollama
```

Check if Ollama is running 

```bash
docker ps -a
```

## Downloading a Model

Now get into Ollama docker container pull our first model.
Pick a very small model to start out with.
I recommend something less with 1gb.

```bash
docker exec -it ollama bash
ollama run qwen3:0.6b
```

You should be booted into a terminal with the AI chatbot. 
Let's see who's PC got the juice to run this small  model. 

```bash
I love the book Dharma Bums recommend 10 other books like it.
```

After it finishes (or it is takes too long) lets exit the prompt.

```bash
/bye # leave the model prompt
exit # leave the docker container (do this for practice)
```

## Ollama UI

Have students delete Ollama docker container
And then download the `docker-compose.yml` file
And run it. 
**MAKE SURE YOU ARE IN THE SAME FOLDER AS THE FILE WHEN RUNNING THE COMMAND**
Repeat this point at least 3x.

```bash
docker compose up -d
```

If it worked now go look at your web `UI`.

```
http://localhost:3000/
```

> Make sure you download a model in your new Ollama container.





