# Blog

> It's from [github page blog](https://github.com/brianmaierjr/long-haul)

```bash
# 进入容器
docker-compose run --service-ports --rm blog bash
# 或者
docker run --rm -it  -v $PWD:/blog -w /blog -p 4000:4000 jekyll/jekyll bash

# 容器中

# 编译
jekyll build
# 启动服务，宿主可访问 http://localhost:4000 
jekyll serve
```


