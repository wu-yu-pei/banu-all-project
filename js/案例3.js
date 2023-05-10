//原始Promise函数
let testStatus = 1; //测试参数，无业务上的实际用途，模拟请求次数，假设第三次请求才成功
const fetchTodayNews = () => {
  return new Promise((resolve, reject) => {
    if (testStatus === 3) {
      testStatus = 1;
      return resolve('success');
    }
    testStatus++;
    return reject('error');
  });
};

//若想让该函数自动重试三次，需要编写新函数，如下：
function PromiseAutoRetry(method, retryTimes) {
  return new Promise((resolve, reject) => {
    (function retryfn() {
      method()
        .then(resolve)
        .catch((error) => {
          --retryTimes == 0 ? reject(error) : retryfn();
        });
    })();
  });
}

//最终调用方式为
(async () => {
  const result = await PromiseAutoRetry(fetchTodayNews, 3);
  console.log(result);
})();
