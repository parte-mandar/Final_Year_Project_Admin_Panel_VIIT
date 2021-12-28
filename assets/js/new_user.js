if (sessionStorage.getItem("email") == null) {
  window.location.href = "index.html";
}

function submit() {
  if (document.getElementById("email").value == "") {
    alert("Email / Username cannot be empty !!");
    return;
  }

  const user = {
    email: document.getElementById("email").value,
    password: document.getElementById("password").value,
  };

  async function postData(url = "") {
    // Default options are marked with *
    const response = await fetch(url, {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      mode: "cors", // no-cors, *cors, same-origin
      cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
      credentials: "same-origin", // include, *same-origin, omit
      headers: {
        "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      redirect: "follow", // manual, *follow, error
      referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
      body: JSON.stringify(user), // body data type must match "Content-Type" header
    });
    return response.json(); // parses JSON response into native JavaScript objects
  }

  postData(
    `http://kgamifytest-env.eba-sb353hxm.ap-south-1.elasticbeanstalk.com/admin/login`
  ).then((data) => {
    if (JSON.stringify(data) == "{}") {
      alert("User not Successfully Added..");
    } else {
      alert("User Successfully Added..");
    }
  });
}
