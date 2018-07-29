## DNS 缓存清除
> 一键清除chrome的DNS缓存, 并刷新当前选项卡。 web开发的利器。


### 更新日志

#### 2018/07/29 - v0.3.0
* 兼容chrome 68+
* chrome 68+之后, 谷歌移除了原清除DNS的API方法, 所以只能通过打开`chrome://net-internals/#dns`页面, 进行js注入的方式来清除缓存。
* 但是要注入`chrome://net-internals/#dns`页面, 需要额外的授权。

> 授权方法:
>> 1. 打开 `chrome://flags/`
>> 2. 找到 `chrome:// URLs`, 并将其设置为`Enabled`

**快速导航地址:**  [授权设置地址](chrome://flags/#extensions-on-chrome-urls)


#### 2018/07/07 - v0.2.0
* 首版, 支持chrome 67-; 不需要额外设置任何内容, 即装即用。