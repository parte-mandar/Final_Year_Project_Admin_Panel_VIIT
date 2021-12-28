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
  `http://kgamifytest-env.eba-sb353hxm.ap-south-1.elasticbeanstalk.com/admin/labels/all`
).then((data) => {
  if (JSON.stringify(data) == "{}") {
    document.getElementById("category_list").innerHTML = "No data";
  } else {
    var options = dropdown();
    options.then(function (data) {
      document.getElementById("category_list").innerHTML = data;
    });
  }

  async function dropdown() {
    let result = ``;
    let test = 0;
    while (test < data.labels.length) {
      result += `

       <br /><br />

        <div style="display: flex; flex-direction: row;">
            <div style="min-width: 112ch; font-size: 16px;" class="select">
                  <span style="font-size: 20px;font-weight:bold;">${data.labels[test].label}</span>
            </div>
        </div>

        <br/>

        <button onclick="deactivate('${data.labels[test].label}')" style="background-color: #c90101;padding:10px 20px 10px 20px;color:white;font-size: 15px;border:none;"   id="dodropdown"><i class="fas fa-times"></i> Delete</button>

        <br /><br />
      `;
      test++;
    }
    return result;
  }
});

function deactivate(category = "") {
  async function postData(url = "") {
    // Default options are marked with *
    const response = await fetch(url, {
      method: "DELETE", // *GET, POST, PUT, DELETE, etc.
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
    `http://kgamifytest-env.eba-sb353hxm.ap-south-1.elasticbeanstalk.com/admin/labels?label=${category}`
  ).then((data) => {
    if (JSON.stringify(data) == "{}") {
      alert("Something went wrong..");
    } else {
      alert("Label is Deleted..");

      window.location.reload();
    }
  });
}
