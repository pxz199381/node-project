const http = require('http');
const fs = require('fs');
const path = require('path');
const cheerio = require('cheerio');

const opt = {
  hostname: 'localhost',
  port: '8080',
  path: '/douban.html'
};

http.get(opt, function (res) {
  var html = '';
  var movies = [];

  res.setEncoding('utf-8');

  res.on('data', function (chunk) {
    html += chunk;
  });

  res.on('end', function () {
    var $ = cheerio.load(html);
    $('.item').each(function () {
      // img
      var picUrl = $('.pic img', this).attr('src');
      var movie = {
        title: $('.title', this).text(), // 获取电影名称
        star: $('.info .star em', this).text(), // 获取电影评分
        link: $('a', this).attr('href'), // 获取电影详情页链接
        picUrl: /^http/.test(picUrl) ? picUrl : 'http://localhost:8080/' + picUrl // 组装电影图片链接
      };
      movies.push(movie);
      downloadImg('img/', movie.picUrl);
    });
    saveData('data/data.json', movies);
  });
}).on('error', function (err) {
  console.log(err);
});

function downloadImg(imgDir, url) {
  http.get(url, function (res) {
    var data = '';

    res.setEncoding('binary');

    res.on('data', function (chunk) {
      data += chunk;
    });

    res.on('end', function () {
      fs.writeFile(imgDir + path.basename(url), data, 'binary', function (err) {
        if (err) return console.log(err);
        console.log('image downloaded: ' + path.basename(url));
      });
    });
  });
}

function saveData(path, movies) {
  fs.writeFile(path, JSON.stringify(movies, null, 4), function (err) {
    if (err) return console.log(err);
    console.log('data saved!');
  });
}