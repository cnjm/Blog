### nest.js 拦截器

[其实官网文档真的很详细](https://docs.nestjs.cn/8/interceptors)

### 拦截器的作用

从文档可以看到拦截器具有一系列有用的功能，这些功能受面向切面编程（AOP）技术的启发：

1. 在函数执行之前/之后绑定额外的逻辑
2. 转换从函数返回的结果
3. 转换从函数抛出的异常
4. 扩展基本函数行为
5. 根据所选条件完全重写函数 (例如, 缓存目的)

### 拦截器示例

common/modify.interceptor.ts

可以理解为 next.handle() 前后就是响应程序处理之前、之后

示例中 handle() 返回一个 Observable。包含从路由处理程序返回的值，以此文 user.service.ts 中 getlist 为例则是查询数据库之后的数据，一个 json 数组

我们通过 map()运算符可以得到程序要响应出去的值，我们可以在此拼装最终给到前端的数据样式，例如统一的成功状态码，message，甚至每条响应生成随机的 id 以便排查

这可以避免无谓的多余的代码

```js
import {
  Injectable,
  NestInterceptor,
  CallHandler,
  ExecutionContext,
} from "@nestjs/common";
import { map } from "rxjs/operators";
import { Observable } from "rxjs";
interface Response<T> {
  result: T;
}
@Injectable()
export class ModifyInterceptor<T> implements NestInterceptor<T, Response<T>> {
  intercept(
    context: ExecutionContext,
    next: CallHandler<T>
  ): Observable<Response<T>> {
    return next.handle().pipe(
      map((result) => {
        return {
          result,
          code: 20000,
          message: "响应成功",
        };
      })
    );
  }
}
```

### 使用拦截器

与守卫一样, 拦截器可以是控制器范围内的, 方法范围内的或者全局范围内的。

1. main.ts 中直接全局引用

```js
const app = await NestFactory.create(AppModule);

// 全局拦截器
app.useGlobalInterceptors(new ModifyInterceptor());
```

2. user.controller.ts UserController 中使用

这里注意，我们传递的是 `ModifyInterceptor` 类型而不是实例，让框架承担实例化责任并启用依赖注入

```js
@Controller('user')
@UseInterceptors(ModifyInterceptor)
export class UserController {
```

3. user.controller.ts 具体给到 UserController 中的 getList 方法使用

```js
 @Get()
  @UseInterceptors(ModifyInterceptor)
  async getList() {
```

此时访问http://localhost:3000/api/user
![示例](https://img-blog.csdnimg.cn/8610056127f7420581f4d58153f84487.jpg?x-oss-process=image/watermark,type_ZHJvaWRzYW5zZmFsbGJhY2s,shadow_50,text_Q1NETiBA6aG16Z2i5LuU6YO95LiN5aaC,size_12,color_FFFFFF,t_70,g_se,x_16#pic_center)

### 我们将使用拦截器做什么

通过上述例子可以看到，基本上所有在响应程序之前以及之后的处理我们都可以依托拦截器来帮助我们完成

日志记录：同样的，前文中中间件中记录的请求日志，甚至响应日志，都可以在此记录

响应映射：例如对全局响应结果做统一处理

异常映射：利用 `catchError()` 操作符来覆盖抛出的异常

缓存拦截: 因性能问题，需要从缓存获取时

。。。

### 总结

可见，nest.js 中使用拦截器，只需要简单的声明一个拦截器，同时使用 nest 提供的操作符/运算符，我们可以很好地配合业务完成功能开发。
