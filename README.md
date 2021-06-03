# Blog

> It's from [github page blog](https://github.com/brianmaierjr/long-haul)

```bash
# 进入容器
docker-compose run --rm blog bash
# 或者
docker run --rm -it  -v $PWD:/blog -w /blog -p 4000:4000 jekyll/jekyll bash

# 容器中

# 编译
jekyll build
# 启动服务，宿主可访问 http://localhost:4000 (TODO: docker-compose 启动时 无法访问，暂时配置不出来)
jekyll serve
```


