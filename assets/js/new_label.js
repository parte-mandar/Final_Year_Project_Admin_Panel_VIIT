if (sessionStorage.getItem("email") == null) {
  window.location.href = "index.html";
}

function submit() {
  if (document.getElementById("category_name").value == "") {
    alert("Label Name cannot be empty !!");
    return;
  }

  const category = {
    label: document.getElementById("category_name").value,
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
      body: JSON.stringify(category), // body data type must match "Content-Type" header
    });
    return response.json(); // parses JSON response into native JavaScript objects
  }

  postData(
    `http://kgamifytest-env.eba-sb353hxm.ap-south-1.elasticbeanstalk.com/admin/labels`
  ).then((data) => {
    if (JSON.stringify(data) == "{}") {
      alert("Label not Successfully Uploaded..");
    } else {
      alert("Label Successfully Uploaded..");
    }
  });
}
