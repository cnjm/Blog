##  需求场景
用户上传原图，需要将原图压缩（或者任何有可能的操作譬如一些oss自身的处理能力不能满足你的业务需求的）。处理的图片给放到压缩图库，方便使用，这时用户只有访问压缩图库的权限。

## 准备工作

 1. 阿里云对象存储新建两个Bucket，一个作为用户上传原图库Bucket1，另一个压缩图库Bucket2。
 2. 开通函数计算([函数开发指南官方](https://help.aliyun.com/document_detail/52699.html))，新建服务，新建函数，我这里使用了node开发，可以选择安装vscode插件[Aliyun Serverless](https://help.aliyun.com/document_detail/155679.html?spm=a2c4g.11186623.6.556.29754c07HxI8wS)进项开发，包括函数服务创建开发测试上传。非常方便。设置完成会得到http触发器的路径。![函数触发路径](https://img-blog.csdnimg.cn/20200810161550247.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80Mjk5ODcwNw==,size_16,color_FFFFFF,t_70)

 3. Bucket2》基础设置》镜像回源设置如下（回源地址在函数计算中得到）![镜像回源设置](https://img-blog.csdnimg.cn/20200810160706597.jpg?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80Mjk5ODcwNw==,size_16,color_FFFFFF,t_70)
 4. 接下来看一下整个流程（说明一下）
 ****需要使用自定义模块，则需要将自定义模块与代码一起打包上传，否则会报找不到模块，[文档](https://help.aliyun.com/document_detail/58011.html?spm=a2c4g.11186623.6.564.42ce3416Kck7Nd#title-9lj-znp-krk)没详细看直接撸的时候遇到这个问题。(⊙o⊙)…
函数的配置
```
ROSTemplateFormatVersion: '2015-09-01'
Transform: 'Aliyun::Serverless-2018-04-03'
Resources:
  ImageMagick:
    Type: 'Aliyun::Serverless::Service'
    Properties:
      Role: 'acs:ram::****************:role/fc-oss'#角色、这个一定要配置
      InternetAccess: true
    mlyunai:
      Type: 'Aliyun::Serverless::Function'
      Properties:
        Handler: index.handler
        Runtime: nodejs12
        Timeout: 120#超时
        MemorySize: 3072#运行内存
        InstanceConcurrency: 50#并发
        EnvironmentVariables:
        #这可以做一些常量配置
          OSS_REGION: # oss region
          OSS_ORIGINAL_BUCKET_NAME: # oss bucket name
          OSS_COMPRESS_BUCKET_NAME:# oss bucket name
        CodeUri: './'#代码地址
      Events:
        http:
          Type: HTTP
          Properties:
            AuthType: anonymous
            Methods:
              - GET
              - POST
```
连接到图库（centext在函数传进来的。看命名很清晰了就不多说，用户需要先创建，Aliyun Serverless直接绑定了账户）

```
const ossClient = new oss({
        region: ossRegion,
        bucket: ossBucketOriginal,
        accessKeyId: context.credentials.accessKeyId,
        accessKeySecret: context.credentials.accessKeySecret,
        stsToken: context.credentials.securityToken,
});

getResult = await ossClient.get(fileName);


```
[imagemagick npm](https://www.npmjs.com/package/imagemagick)
```
im.crop(params, (err) => {
                    if (err) {
                        reject(err);
                    }
                    // timer1 = (new Date()).valueOf();
                    resolve();
});
```

```
// 写入压缩图库
        await ossClient2.put(fileName, fs.readFileSync(resizedFilePath));
```


####  相关的代码示例
[利用 FC + OSS 快速搭建 Serverless 实时按需图像处理服务](https://github.com/ChanDaoH/serverless-image-on-the-fly)



