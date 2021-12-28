if (sessionStorage.getItem("email") == null) {
  window.location.href = "index.html";
}

function submit() {
  if (document.getElementById("category_name").value == "") {
    alert("Category Name cannot be empty !!");
    return;
  }

  const category = {
    category: document.getElementById("category_name").value,
    count: 0,
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
    `http://kgamifytest-env.eba-sb353hxm.ap-south-1.elasticbeanstalk.com/app/categories`
  ).then((data) => {
    if (JSON.stringify(data) == "{}") {
      alert("Category not Successfully Uploaded..");
    } else {
      alert("Category Successfully Uploaded..");
    }
  });
}
