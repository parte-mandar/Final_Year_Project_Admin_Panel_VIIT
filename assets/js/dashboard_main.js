if (sessionStorage.getItem("email") == null) {
  window.location.href = "index.html";
}

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
  `http://kgamifytest-env.eba-sb353hxm.ap-south-1.elasticbeanstalk.com/app/login/count`
).then((data) => {
  if (JSON.stringify(data) == "{}") {
    document.getElementById("total_registered_users").innerHTML = "No data";
  } else {
    document.getElementById("total_registered_users").innerHTML = data.logins;
  }
});

postData(
  `http://kgamifytest-env.eba-sb353hxm.ap-south-1.elasticbeanstalk.com/app/championships/count`
).then((data) => {
  if (JSON.stringify(data) == "{}") {
    document.getElementById("total_championships").innerHTML = "No data";
  } else {
    document.getElementById("total_championships").innerHTML = data.count;
  }
});
