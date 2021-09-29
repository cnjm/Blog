### 日志记录

[log4js](https://www.npmjs.com/package/log4js)
[stacktrace-js](https://www.npmjs.com/package/stacktrace-js)

```shell
yarn add log4js
yarn add stacktrace-js
```

### 配置 log4js 日志设置

[log4js 文档](https://log4js-node.github.io/log4js-node/index.html)
[log4js 示例](https://github.com/log4js-node/log4js-example/blob/master/config/log4js.json)

/src/config/logConfig.ts

```js
import * as path from "path";
const baseLogPath = path.resolve(__dirname, "../../logs"); // 日志根目录，视情况而定，这里将于项目同级

// development 时控制台打印
const appenders =
  process.env.NODE_ENV === "development"
    ? ["console", "app", "errors"]
    : ["app", "errors"];

const log4jsConfig = {
  appenders: {
    console: {
      type: "console",
    },
    access: {
      type: "dateFile", // 写入按日期分类文件
      filename: `${baseLogPath}/access/access.log`, // 日志名称，会加上pattern格式的日期
      alwaysIncludePattern: true,
      pattern: "yyyy-MM-dd",
      daysToKeep: 7, //保存天数
      numBackups: 3, // 日志文件
      category: "http", //category 类型
      keepFileExt: true, // 文件后缀
      compress: true, // 压缩
    },
    app: {
      type: "dateFile",
      filename: `${baseLogPath}/apps/app.log`,
      alwaysIncludePattern: true,
      layout: {
        type: "pattern",
        pattern:
          '{"date":"%d","level":"%p","category":"%c","host":"%h","pid":"%z","data":\'%m\'}',
      },
      maxLogSize: 10485760,
      pattern: "yyyy-MM-dd",
      daysToKeep: 7,
      numBackups: 3,
      keepFileExt: true,
    },
    errorFile: {
      type: "dateFile",
      filename: `${baseLogPath}/errors/error.log`,
      alwaysIncludePattern: true,
      layout: {
        type: "pattern",
        pattern:
          '{"date":"%d","level":"%p","category":"%c","host":"%h","pid":"%z","data":\'%m\'}',
      },
      pattern: "yyyy-MM-dd",
      daysToKeep: 7,
      numBackups: 3,
      keepFileExt: true,
    },
    errors: {
      type: "logLevelFilter",
      level: "ERROR",
      appender: "errorFile",
    },
  },
  categories: {
    default: {
      appenders,
      level: "DEBUG",
    },
    info: { appenders, level: "info" },
    access: { appenders, level: "info" },
    http: { appenders: ["access"], level: "DEBUG" },
  },
  pm2: true, //届时会Linux pm2 jenkins部署
  pm2InstanceVar: "INSTANCE_ID",
};

export default log4jsConfig;
```

### 定义 log4js

/src/common/log4js/index.ts

此处因需求而定，比如生成日志的格式，以及你需要展示的内容

```js
import * as Path from 'path';
import * as Log4js from 'log4js';
import * as Util from 'util';
import { format } from '../../utils/moment';
import * as StackTrace from 'stacktrace-js';
import Chalk from 'chalk';
import log4jsConfig from '../../config/logConfig';

export enum LoggerLevel {
  ALL = 'ALL',
  MARK = 'MARK',
  TRACE = 'TRACE',
  DEBUG = 'DEBUG',
  INFO = 'INFO',
  WARN = 'WARN',
  ERROR = 'ERROR',
  FATAL = 'FATAL',
  OFF = 'OFF',
}

export class ContextTrace {
  constructor(
    public readonly context: string,
    public readonly path?: string,
    public readonly lineNumber?: number,
    public readonly columnNumber?: number,
  ) {}
}
// 添加自定义的布局函数
Log4js.addLayout('Awesome-nest', (logConfig: any) => {
  return (logEvent: Log4js.LoggingEvent): string => {
    let moduleName = '';
    let position = '';

    // 日志组装
    const messageList: string[] = [];
    logEvent.data.forEach((value: any) => {
      if (value instanceof ContextTrace) {
        moduleName = value.context;
        // 显示触发日志的坐标（行，列）
        if (value.lineNumber && value.columnNumber) {
          position = `${value.lineNumber}, ${value.columnNumber}`;
        }
        return;
      }

      if (typeof value !== 'string') {
        value = Util.inspect(value, false, 3, true);
      }

      messageList.push(value);
    });

    // 日志组成部分
    const messageOutput: string = messageList.join(' ');
    const positionOutput: string = position ? ` [${position}]` : '';
    const typeOutput = `[${logConfig.type}] ${logEvent.pid.toString()}   - `;
    const dateOutput = `${format(
      logEvent.startTime,
      'YYYY-MM-D:HH:mm:ss',
      false,
    )}`;
    const moduleOutput: string = moduleName
      ? `[${moduleName}] `
      : '[LoggerService] ';
    let levelOutput = `[${logEvent.level}] ${messageOutput}`;

    // 根据日志级别，用不同颜色区分
    switch (logEvent.level.toString()) {
      case LoggerLevel.DEBUG:
        levelOutput = Chalk.green(levelOutput);
        break;
      case LoggerLevel.INFO:
        levelOutput = Chalk.cyan(levelOutput);
        break;
      case LoggerLevel.WARN:
        levelOutput = Chalk.yellow(levelOutput);
        break;
      case LoggerLevel.ERROR:
        levelOutput = Chalk.red(levelOutput);
        break;
      case LoggerLevel.FATAL:
        levelOutput = Chalk.hex('#DD4C35')(levelOutput);
        break;
      default:
        levelOutput = Chalk.grey(levelOutput);
        break;
    }

    return `${Chalk.green(typeOutput)}${dateOutput}  ${Chalk.yellow(
      moduleOutput,
    )}${levelOutput}${positionOutput}`;
  };
});

// 注入配置
Log4js.configure(log4jsConfig);

// 实例化
const logger = Log4js.getLogger();
logger.level = LoggerLevel.TRACE;

export class Logger {
  static trace(...args: any[]) {
    logger.trace(Logger.getStackTrace(), ...args);
  }

  static debug(...args: any[]) {
    logger.debug(Logger.getStackTrace(), ...args);
  }

  static log(...args: any[]) {
    logger.info(Logger.getStackTrace(), ...args);
  }

  static info(...args: any[]) {
    logger.info(Logger.getStackTrace(), ...args);
  }

  static warn(...args: any[]) {
    logger.warn(Logger.getStackTrace(), ...args);
  }

  static warning(...args: any[]) {
    logger.warn(Logger.getStackTrace(), ...args);
  }

  static error(...args: any[]) {
    logger.error(Logger.getStackTrace(), ...args);
  }

  static fatal(...args: any[]) {
    logger.fatal(Logger.getStackTrace(), ...args);
  }

  static access(...args: any[]) {
    const loggerCustom = Log4js.getLogger('http');
    loggerCustom.info(Logger.getStackTrace(), ...args);
  }

  // StackTrace追溯日志发生在哪个文件，行列 user.service.ts(line: 17, column: 12)
  static getStackTrace(deep = 2): string {
    const stackList: StackTrace.StackFrame[] = StackTrace.getSync();
    const stackInfo: StackTrace.StackFrame = stackList[deep];

    const lineNumber: number = stackInfo.lineNumber;
    const columnNumber: number = stackInfo.columnNumber;
    const fileName: string = stackInfo.fileName;
    const basename: string = Path.basename(fileName);
    return `${basename}(line: ${lineNumber}, column: ${columnNumber}): \n`;
  }
}

```

以上 format 格式化时间没有因此引入[moment](https://www.npmjs.com/package/moment)，[cnjm-practical](https://www.npmjs.com/package/cnjm-practical) 是本人正打算维护自己常用的函数、方法等的，目前不完善(就是还很垃)。

这里就不引入别的了，直接 utils 中实现一下

/utils/\_initernal/isType.ts

```js
const isType = function(o) {
  let s = Object.prototype.toString.call(o);
  return s.match(/\[object (.*?)\]/)[1].toLowerCase();
};

export const isPrimitive = (o) => {
  let name = isType(o);
  return (
    name === "string" ||
    name === "number" ||
    name === "symbol" ||
    name === "boolean"
  );
};
export const isDate = (o) => {
  return isType(o) === "date";
};
export const isNumber = (o) => {
  return isType(o) === "number";
};
export const isString = (o) => {
  return isType(o) === "string";
};
export const isObject = (o) => {
  return isType(o) === "object";
};
export const isArray = (o) => {
  return isType(o) === "array";
};
export const isBuffer = (o) => {
  return isType(o) === "buffer";
};
```

/utils/moment.ts

```js
import { isDate, isString, isNumber } from "./_initernal/isType";

const format = (date: any, format: string, isUTC: any) => {
  if (!isNumber(date) && !isString(date) && !isDate(date)) {
    throw new Error("The first parameter must be number, string, Date object");
  }

  let d = date;

  if (isNumber(date) || isString(date)) {
    d = new Date(date);
  }

  if (!isString(format)) {
    return d.toString();
  }
  const year = isUTC
    ? d.getUTCFullYear().toString()
    : d.getFullYear().toString();
  const month = isUTC
    ? (d.getUTCMonth() + 1).toString()
    : (d.getMonth() + 1).toString();
  const day = isUTC ? d.getUTCDate().toString() : d.getDate().toString();
  const hour = isUTC ? d.getUTCHours().toString() : d.getHours().toString();
  const hour12 = (hour % 12).toString();
  const amOrPm = hour < 12 ? "AM" : "PM";
  const minute = isUTC
    ? d.getUTCMinutes().toString()
    : d.getMinutes().toString();
  const second = isUTC
    ? d.getUTCSeconds().toString()
    : d.getSeconds().toString();
  const millisecond = isUTC
    ? d.getUTCMilliseconds().toString()
    : d.getMilliseconds().toString();

  return format
    .replace(/(^|[^Y])YYYY([^Y]|$)/g, `$1${year}$2`)
    .replace(/(^|[^Y])YY([^Y]|$)/g, `$1${String(year).slice(-2)}$2`)
    .replace(/(^|[^M])MM([^M]|$)/g, `$1${month.padStart(2, "0")}$2`)
    .replace(/(^|[^M])M([^M]|$)/g, `$1${month}$2`)
    .replace(/(^|[^D])DD([^D]|$)/g, `$1${day.padStart(2, "0")}$2`)
    .replace(/(^|[^D])D([^D]|$)/g, `$1${day}$2`)
    .replace(/(^|[^H])HH([^H]|$)/g, `$1${hour.padStart(2, "0")}$2`)
    .replace(/(^|[^H])H([^H]|$)/g, `$1${hour}$2`)
    .replace(/(^|[^h])hh([^h]|$)/g, `$1${hour12.padStart(2, "0")}$2`)
    .replace(/(^|[^h])h([^h]|$)/g, `$1${hour12}$2`)
    .replace(/(^|[^A])A([^A]|$)/g, `$1${amOrPm}$2`)
    .replace(/(^|[^a])a([^a]|$)/g, `$1${amOrPm.toLowerCase()}$2`)
    .replace(/(^|[^m])mm([^m]|$)/g, `$1${minute.padStart(2, "0")}$2`)
    .replace(/(^|[^m])m([^m]|$)/g, `$1${minute}$2`)
    .replace(/(^|[^s])ss([^s]|$)/g, `$1${second.padStart(2, "0")}$2`)
    .replace(/(^|[^s])s([^s]|$)/g, `$1${second}$2`)
    .replace(
      /(^|[^S]+)([S]+)([^S]+|$)/g,
      (match: any, s1: any, s2: string | any[], s3: any) => {
        let msStr = millisecond.padStart(3, "0");
        for (let i = 3; i < s2.length; i++) {
          msStr += "0";
        }
        msStr = msStr.slice(0, s2.length);
        return `${s1}${msStr}${s3}`;
      }
    );
};

export { format };
```

### 使用 log4js

user.service.ts 中通过 Logger.error('错误日志');打印日志

```js
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../../entities/user/User.entity';
import { Repository } from 'typeorm';
import { Logger } from '../../common/log4js/index';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}
  /**
   * 账号列表业务逻辑处理
   */
  async getList(): Promise<any> {
    Logger.error('错误日志');
    // Logger.log('info日志');
    // throw new UnauthorizedException(`Custom error`);
    const qb = this.userRepository.createQueryBuilder('user');
    const data = await qb.getMany();
    return data;
  }
}
```

### 效果

![在这里插入图片描述](https://img-blog.csdnimg.cn/3496f8ed933d4c2280b0db3f33800bf7.jpg#pic_center)
![在这里插入图片描述](https://img-blog.csdnimg.cn/4949a4db1aad4224a9ad20290861970e.jpg?x-oss-process=image/watermark,type_ZHJvaWRzYW5zZmFsbGJhY2s,shadow_50,text_Q1NETiBA6aG16Z2i5LuU6YO95LiN5aaC,size_16,color_FFFFFF,t_70,g_se,x_16#pic_center)

### 总结

由此，我们简单配置并实例化 log4js ,已经可以再需要的地方打印日志，并且生成响应的日志文件，但是现在我们需要在使用的地方每次都引入。

显然这是不实际的，因此,下一章，我们将通过中间件，拦截器，来为我们完成更多的事情
