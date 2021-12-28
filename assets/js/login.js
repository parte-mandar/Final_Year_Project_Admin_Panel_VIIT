function submit() {
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  if (username != "" && password != "") {
    async function postData(url = "") {
      // Default options are marked with *
      const response = await fetch(url, {
        method: "GET", // *GET, POST, PUT, DELETE, etc.
        mode: "cors", // no-cors, *cors, same-origin
        cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
        credentials: "same-origin", // include, *same-origin, omit
        headers: {
          "Content-Type": "application/json",
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        redirect: "follow", // manual, *follow, error
        referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
        //body: JSON.stringify(data) // body data type must match "Content-Type" header
      });
      return response.json(); // parses JSON response into native JavaScript objects
    }
    postData(
      `http://kgamifytest-env.eba-sb353hxm.ap-south-1.elasticbeanstalk.com/admin/login?email=${username}`
    ).then((data) => {
      if (JSON.stringify(data) == "{}") {
        alert(`Email "${username}" is not found, please contact admin`);
      } else {
        if (data.Item.password == password) {
          sessionStorage.setItem("email", username);

          //redirect to dashboard
          window.location.href = "dashboard.html";

          console.log("correct");
        } else {
          alert("Password incorrect, please contact admin");
        }
      }
    });
  } else if (username == "" && password != "") {
    document.getElementById("email_error").innerHTML = "Email not entered!";
    document.getElementById("password_error").innerHTML = "";
  } else if (password == "" && username != "") {
    document.getElementById("email_error").innerHTML = "";
    document.getElementById("password_error").innerHTML =
      "Password not entered!";
  } else {
    document.getElementById("email_error").innerHTML = "Email not entered!";
    document.getElementById("password_error").innerHTML =
      "Password not entered!";
  }
}
