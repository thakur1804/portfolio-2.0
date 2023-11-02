# Setup with docker

## Step-1: Build Docker Image
docker build -t <NAME_OF_THE_IMAGE> .

## Step-2: Run Image
```for powershell```
docker run -e CHOKIDAR_USEPOLLING=true -v ${pwd}\src:/app/src -d -p 3000:3000 --name <NAME> <NAME_OF_THE_IMAGE>  

```for command prompt```
docker run -e CHOKIDAR_USEPOLLING=true -v %cd%\src:/app/src -d -p 3000:3000 --name <NAME> <NAME_OF_THE_IMAGE>  

```for read only bind mounts```
docker run -e CHOKIDAR_USEPOLLING=true -v %cd%\src:/app/src:ro -d -p 3000:3000 --name <NAME> <NAME_OF_THE_IMAGE>  

```with environment variables file```
docker run --env-file ./.env -v %cd%\src:/app/src:ro -d -p 3000:3000 --name <NAME> <NAME_OF_THE_IMAGE>

### To kill a running image
docker rm  <NAME/CONTAINER ID> -f
