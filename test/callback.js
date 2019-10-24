// var fs = require('fs');

// function someAsyncOperation (callback) {
//   // 假设这个任务要消耗 95ms
//   fs.readFile('temp.txt', callback);
// }

// var timeoutScheduled = Date.now();

// setTimeout(function () {

//   var delay = Date.now() - timeoutScheduled;

//   console.log(delay + "ms have passed since I was scheduled"); 
// }, 100);


// // someAsyncOperation要消耗 95 ms 才能完成
// someAsyncOperation(function () {
//   var startCallback = Date.now();
//   console.log(startCallback - timeoutScheduled + "ms have passed since text was readed");
//   // 消耗 10ms...
//   while (Date.now() - startCallback < 1000) {
//     ; // do nothing
//   }

// });

const buff = Buffer.from('runoob','ascii');

const buff2 = Buffer.alloc(10, 1);

const buff3 = Buffer.from([1,2,3]);

console.log(buff3);
console.log(buff3.toString('hex'));
console.log(buff3.toString('base64'));