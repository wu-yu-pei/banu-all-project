export function generationNewsData() {
  return new Array(20).fill(0).map((_, index) => {
    return {
      id: index,
      title: `新闻${index + 1}`,
      content: `巴奴发布内容${index + 1}`,
      type: 'news',
      create_time: +new Date(),
      updata_time: +new Date(),
    };
  });
}

export function isNumber(val) {
  // isNaN()函数 把空串 空格 以及NUll 按照0来处理 所以先去除
  if (val === '' || val == null) {
    return false;
  }

  if (!isNaN(val)) {
    return true;
  } else {
    return false;
  }
}
