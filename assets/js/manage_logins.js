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

async function postCategoryData(url = "", c_category, c_count) {
  // Default options are marked with *
  const category_update = { category: c_category, count: c_count };
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
    body: JSON.stringify(category_update), // body data type must match "Content-Type" header
  });
  return response.json(); // parses JSON response into native JavaScript objects
}

async function getData(url = "") {
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
  `http://kgamifytest-env.eba-sb353hxm.ap-south-1.elasticbeanstalk.com/app/categories/all`
).then((data) => {
  if (JSON.stringify(data) == "{}") {
    document.getElementById("standard-select").innerHTML = "No data";
  } else {
    var options = dropdown();
    options.then(function (data) {
      document.getElementById("standard-select").innerHTML = data;
    });
  }

  async function dropdown() {
    let result = `<option value="all">----- Select Category -----</option>`;
    let test = 0;
    while (test < data.categories.length) {
      result += `<option value="${data.categories[test].category}">${data.categories[test].category}</option>`;
      test++;
    }
    return result;
  }
});

postData(
  `http://kgamifytest-env.eba-sb353hxm.ap-south-1.elasticbeanstalk.com/admin/login/all`
).then((data) => {
  if (JSON.stringify(data) == "{}") {
    document.getElementById("championship_list").innerHTML = "No data";
  } else {
    var options = dropdown();
    options.then(function (data) {
      document.getElementById("championship_list").innerHTML = data;
    });
  }

  async function dropdown() {
    let result = ``;
    let test = 0;
    while (test < data.logins.length) {
      result += `

       <br /><br />

        <div style="display: flex; flex-direction: row;">
            <div style=" display: flex; min-width: 112ch; font-size: 16px;" class="select">
                  <span style="font-size: 20px;font-weight:bold;"> ${data.logins[test].email}  </span>
            </div>
 
        </div>

        <div style="display: flex; flex-direction: row;">
          <div style=" display: flex; min-width: 508ch; font-size: 16px;"  class="select">
            <div  class="card-title">
              <p>Password : ${data.logins[test].password}</p>
            </div>
          </div>
        </div>

        <button onclick="edit('${data.logins[test].email}')" style="background-color: #004ffa;padding:10px 20px 10px 20px;color:white;font-size: 15px;border:none;"  id="dodropdown"> <i class="fas fa-edit"></i> Edit</button>
        <button onclick="deactivate('${data.logins[test].email}','${data.logins[test].email}')"  style="background-color: #c90101;padding:10px 20px 10px 20px;color:white;font-size: 15px;border:none;"  id="dodropdown"><i class="fas fa-times"></i> Delete</button>

        <br/><br/>
      `;
      test++;
    }
    return result;
  }
});

function sort() {
  let category = document.getElementById("standard-select").value;

  if (category == "all") {
    return;
  }

  let element = document.getElementById("championship_list");

  element.style.cssText = "display:None;";

  postData(
    `http://kgamifytest-env.eba-sb353hxm.ap-south-1.elasticbeanstalk.com/app/championships/getByCategory?category=${category}`
  ).then((data) => {
    if (JSON.stringify(data) == "{}") {
      document.getElementById("championship_by_category").innerHTML = "No data";
    } else {
      var options = dropdown();
      options.then(function (data) {
        document.getElementById("championship_by_category").innerHTML = data;
      });
    }

    async function dropdown() {
      let result = ``;
      let test = 0;
      while (test < data.Items.length) {
        result += `

       <br /><br />

        <div style="display: flex; flex-direction: row;">
            <div style=" display: flex; min-width: 112ch; font-size: 16px;" class="select">
                  <span style="font-size: 20px;font-weight:bold;"> ${data.Items[test].championship}  </span>
            </div>
        </div>

        <div style="display: flex; flex-direction: row;">
          <div style=" display: flex; min-width: 508ch; font-size: 16px;"  class="select">
            <div  class="card-title">
              <p>Total Participants: ${data.Items[test].number_of_participants}</p>
              <p>Qualification Required: ${data.Items[test].qualification}</p>
              <p>Category: ${data.Items[test].category}</p>
              <p>Start Date: ${data.Items[test].start_time}</p>
            </div>
          </div>
        </div>
        <button onclick="edit('${data.Items[test].championship}')" style="background-color: #004ffa;padding:10px 20px 10px 20px;color:white;font-size: 15px;border:none;"  id="dodropdown"> <i class="fas fa-edit"></i> Edit</button>
        <button onclick="deactivate('${data.Items[test].championship}','${data.Items[test].category}')" style="background-color: #c90101;padding:10px 20px 10px 20px;color:white;font-size: 15px;border:none;"  id="dodropdown"><i class="fas fa-times"></i> Delete</button>

        <br/><br/>


      `;
        test++;
      }
      return result;
    }
  });
}

function deactivate(championship = "") {
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
    `http://kgamifytest-env.eba-sb353hxm.ap-south-1.elasticbeanstalk.com/admin/login?email=${championship}`
  ).then((data) => {
    if (JSON.stringify(data) == "{}") {
      alert("Something went wrong..");
    } else {
      alert("User Deleted...");
      window.location.reload();
    }
  });
}
