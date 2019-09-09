const router = require('koa-router')();
const request = require('superagent');
const DB = require('../db/db.js');
const cheerio = require('cheerio');

router.get('/add', async (ctx) => {
  const url = 'http://192.168.88.53:8080/poetry.html';
  let str = await new Promise((resolve, reject) => {
    request.get(url)
      .end((error, res) => {
        if (error) {
          reject(error);
          return;
        } else {
          resolve(res.text);
        }
      });
  });
  let $ = cheerio.load(str);
  var sql = `insert into poetry(title,author,content)`;
  var arr = [];
  $('.poetry-item').each((index, ele) => {
    let $ele = $(ele);
    let title = $ele.find('.title').text();
    let author = $ele.find('.author').text();
    let content = $ele.find('.content').text();
    if (title && author && content) {
      arr.push(`("${title}","${author}","${content}")`);
    }
  });
  DB.query(sql + ' ' + 'VALUES ' + arr.join(','));
  ctx.body = '抓取数据';
});

router.get('/getData', async (ctx) => {
  let title = '抓取的诗词';
  let sql = 'select * from poetry';
  let data = await DB.query(sql);
  await ctx.render('index', {
    title,
    poetry: data
  });
});

module.exports = router;