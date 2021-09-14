### nest.js 中间件的使用 log 场景

[文档](https://docs.nestjs.cn/8/middlewares)

### logger middleware

新建 logger 中间件

```shell
 nest g middleware logger middleware
```

### logger 中间件内容

middleware/logger.middleware.ts

```js
import { Injectable, NestMiddleware } from "@nestjs/common";
import { Logger } from "../common/log4js/index";

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: any, res: any, next: () => void) {
    // 拼接需要写入的内容
    const logFormat = `{method: ${req.method}, requestOriginalUrl: ${
      req.originalUrl
    }, query:${JSON.stringify(req.query)}, params:${JSON.stringify(
      req.params
    )}, ip: ${req.ip}, statusCode: ${res.statusCode} }`;
    next();
    Logger.access(JSON.stringify(logFormat));
    //这里就记录所有请求的参数而已，当然，也可以在这里判断 res.statusCode 写入不同类型的日志，看项目需要，只是展示可以这么做
    //如果你希望对不同的路由有不同的处理，可以另写一个，绑定到特定的路由。
  }
}
```

### 使用中间件

1. main.ts 中直接全局引用

```js
import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { HttpExceptionFilter } from "./common/filters/http-exception.filter";
import { LoggerMiddleware } from "./middleware/logger.middleware";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // 全局基础URL，届时所有路由前都会有这个基础的url
  app.setGlobalPrefix(AppModule.bsUrl);

  // 全局注册错误的过滤器
  app.useGlobalFilters(new HttpExceptionFilter());

  // 全局日志中间件
  app.use(new LoggerMiddleware().use);

  await app.listen(AppModule.port, () => {
    console.log(`http://localhost:${AppModule.port}/${AppModule.bsUrl}`);
  });
}
bootstrap();
```

2. app.module.ts 模块中给 UserController 使用

apply 中用逗号隔开可以使用多个中间件

forRoutes 可接受一个字符串、多个字符串、对象、一个控制器类甚至多个控制器类

如下，如果你不想导入太多的 controller，可以使用逗号隔开的路由字符串

consumer.apply(LoggerMiddleware).forRoutes("user");

这是等效的

```js
// other import
import { MiddlewareConsumer, Module } from "@nestjs/common";
import { LoggerMiddleware } from "./middleware/logger.middleware";
import { UserController } from "./logical/user/user.controller";

@Module({
  //other
})
export class AppModule {
  //other
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes(UserController);
  }
}
```

### 排除使用中间件(因为没有使用到，直接搬运了官方例子)

有时我们想从应用中间件中排除某些路由。我们可以使用 exclude() 方法轻松排除某些路由。

此方法可以采用一个字符串，多个字符串或一个 RouteInfo 对象来标识要排除的路由，官方实例：

```js
consumer
  .apply(LoggerMiddleware)
  .exclude(
    { path: "cats", method: RequestMethod.GET },
    { path: "cats", method: RequestMethod.POST },
    "cats/(.*)"
  )
  .forRoutes(CatsController);
```

此外函数式中间件也是类似的，只是函数写法不同，当中间件没有任何依赖关系时，我们可以考虑使用函数式中间件

### 总结

可见，nest.js 中使用中间件，只需要简单的声明一个中间件，可以得到 req, res, next 供使用。此次将请求参数写入了日志

使用时可以直接全局使用，也可以指定给特定的路由使用，以上就是完成了 middleware+logger。
