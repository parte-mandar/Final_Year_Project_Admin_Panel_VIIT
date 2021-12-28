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
  `http://kgamifytest-env.eba-sb353hxm.ap-south-1.elasticbeanstalk.com/admin/labels/all`
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
    let result = `<option value="all">----- Select Label -----</option>`;
    let test = 0;
    while (test < data.labels.length) {
      result += `<option value="${data.labels[test].label}">${data.labels[test].label}</option>`;
      test++;
    }
    return result;
  }
});

postData(
  `http://kgamifytest-env.eba-sb353hxm.ap-south-1.elasticbeanstalk.com/app/questions/all`
).then((data) => {
  if (JSON.stringify(data) == "{}") {
    document.getElementById("question_list").innerHTML = "No data";
  } else {
    var options = dropdown();
    options.then(function (data) {
      document.getElementById("question_list").innerHTML = data;
    });
  }

  async function dropdown() {
    let result = ``;
    let test = 0;
    while (test < data.questions.length) {
      result += `

       <br /><br />

        <div style="display: flex; flex-direction: row;">
            <div style="min-width: 102ch; font-size: 16px;" class="select">
                  <span style="font-size: 20px;">Question ID: ${data.questions[test].questionID}  </span>
                  <br/>
                  <span style="font-size: 20px;font-weight:bold;"> ${data.questions[test].question}  </span>

            </div>
        </div>
    
        <div style="display: flex; flex-direction: row;">
          <div style=" display: flex; min-width: 508ch; font-size: 16px;"  class="select">
            <div  class="card-title">
              <p>Total Coins: ${data.questions[test].coins}</p>
              <p>Label: ${data.questions[test].Label}</p>
              <p>Correct Answer: ${data.questions[test].answer}</p>
            </div>
          </div>
        </div>

        <button onclick="edit('${data.questions[test].questionID}')" style="background-color: #004ffa;padding:10px 20px 10px 20px;color:white;font-size: 15px;border:none;"  id="dodropdown" > <i class="fas fa-edit"></i> Edit</button> &nbsp;&nbsp;&nbsp;
        <button onclick="deactivate('${data.questions[test].questionID}')" style="background-color: #c90101;padding:10px 20px 10px 20px;color:white;font-size: 15px;border:none;" id="dodropdown"><i class="fas fa-times"></i> Delete</button>
      
        <br/><br/>


      `;
      test++;
    }
    return result;
  }
});

function sort() {
  let category = document.getElementById("standard-select").value;
  console.log(category);
  if (category == "all") {
    window.location.reload();
    return;
  }

  let element = document.getElementById("question_list");

  element.style.cssText = "display:None;";

  postData(
    `http://kgamifytest-env.eba-sb353hxm.ap-south-1.elasticbeanstalk.com/app/questions/getByLabel?label=${category}`
  ).then((data) => {
    if (JSON.stringify(data) == "{}") {
      document.getElementById("questions_by_label").innerHTML = "No data";
    } else {
      var options = dropdown();
      options.then(function (data) {
        document.getElementById("questions_by_label").innerHTML = data;
      });
    }

    async function dropdown() {
      let result = ``;
      let test = 0;
      while (test < data.Items.length) {
        result += `

        <br /><br />

        <div style="display: flex; flex-direction: row;">
            <div style="min-width: 102ch; font-size: 16px;" class="select">
                  <span style="font-size: 20px;">Question ID: ${data.Items[test].questionID}  </span>
                  <br/>
                  <span style="font-size: 20px;font-weight:bold;"> ${data.Items[test].question}  </span>

            </div>
        </div>
    
        <div style="display: flex; flex-direction: row;">
          <div style=" display: flex; min-width: 508ch; font-size: 16px;"  class="select">
            <div  class="card-title">
              <p>Total Coins: ${data.Items[test].coins}</p>
              <p>Label: ${data.Items[test].Label}</p>
              <p>Correct Answer: ${data.Items[test].answer}</p>
            </div>
          </div>
        </div>

        <button onclick="edit('${data.Items[test].questionID}')" style="background-color: #004ffa;padding:10px 20px 10px 20px;color:white;font-size: 15px;border:none;"  id="dodropdown" > <i class="fas fa-edit"></i> Edit</button> &nbsp;&nbsp;&nbsp;
        <button onclick="deactivate('${data.Items[test].questionID}')" style="background-color: #c90101;padding:10px 20px 10px 20px;color:white;font-size: 15px;border:none;"   id="dodropdown"><i class="fas fa-times"></i> Delete</button>
      
        <br/><br/>
      `;
        test++;
      }
      return result;
    }
  });
}

function deactivate(questionID = "") {
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
    `http://kgamifytest-env.eba-sb353hxm.ap-south-1.elasticbeanstalk.com/app/questions?questionID=${questionID}`
  ).then((data) => {
    if (JSON.stringify(data) == "{}") {
      alert("Something went wrong..");
    } else {
      alert("Question is Deleted..");
      window.location.reload();
    }
  });
}
