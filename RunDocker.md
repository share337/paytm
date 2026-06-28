## To run the dockerfile, run the following commands

- To build

```
docker build ./ -t mongodb
```

- To run

```
docker run --name mongodb_repleset -p 27017:27017 -d mongodb
```
