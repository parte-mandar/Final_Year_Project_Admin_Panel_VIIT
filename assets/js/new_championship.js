if (sessionStorage.getItem("email") == null) {
  window.location.href = "index.html";
}

let championship_count = 0;

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
  `http://kgamifytest-env.eba-sb353hxm.ap-south-1.elasticbeanstalk.com/app/categories/all`
).then((data) => {
  if (JSON.stringify(data) == "{}") {
    document.getElementById("select_dropdown").innerHTML = "No data";
  } else {
    var options = dropdown();
    options.then(function (data) {
      document.getElementById("select_dropdown").innerHTML = data;
    });
  }

  async function dropdown() {
    let result = "";
    let test = 0;
    console.log("dsafdsadsa");
    while (test < data.categories.length) {
      result += `<option value="${data.categories[test].category}">${data.categories[test].category}</option>`;
      test++;
    }
    return result;
  }
});

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
    let result = "";
    let test = 0;
    console.log("dsafdsadsa");
    while (test < data.labels.length) {
      result += `<option value="${data.labels[test].label}">${data.labels[test].label}</option>`;
      test++;
    }
    return result;
  }
});

function get_category_count(c_category) {}

function submit() {
  if (document.getElementById("championship_name").value == "") {
    alert("Championship Name cannot be empty !!");
    return;
  } else if (document.getElementById("description").value == "") {
    alert("Description cannot be empty !!");
    return;
  } else if (document.getElementById("qualification").value == "") {
    alert("Qualification cannot be empty !!");
    return;
  } else if (document.getElementById("total_coins").value == "") {
    alert("Total Coins cannot be empty !!");
    return;
  } else if (document.getElementById("n_questions").value == "") {
    alert("Number of Questions cannot be empty !!");
    return;
  } else if (document.getElementById("t_required").value == "") {
    alert("Time Required cannot be empty !!");
    return;
  } else if (
    Number.isNaN(parseInt(document.getElementById("t_required").value))
  ) {
    alert("Time Required should be a Number(In Minutes) !!");
    return;
  } else if (
    Number.isNaN(parseInt(document.getElementById("total_coins").value))
  ) {
    alert("Total Coins should be a Number !!");
    return;
  } else if (
    Number.isNaN(parseInt(document.getElementById("n_questions").value))
  ) {
    alert("Number of Quetions should be a Number !!");
    return;
  }

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const d = new Date();
  const month = d.getMonth();
  const year = d.getFullYear();
  const day = d.getDate();
  const c_category = document.getElementById("select_dropdown").value;

  const championship = {
    Label: document.getElementById("standard-select").value,
    qualification: document.getElementById("qualification").value,
    championship: document.getElementById("championship_name").value,
    total_coins: parseInt(document.getElementById("total_coins").value),
    number_of_questions: parseInt(document.getElementById("n_questions").value),
    total_time: parseInt(document.getElementById("t_required").value),
    number_of_participants: 0,
    category: c_category,
    start_time: day.toString() + " " + months[month] + " " + year.toString(),
    description: document.getElementById("description").value,
  };

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
      body: JSON.stringify(championship), // body data type must match "Content-Type" header
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

  postData(
    `http://kgamifytest-env.eba-sb353hxm.ap-south-1.elasticbeanstalk.com/app/championships`
  ).then((data) => {
    if (JSON.stringify(data) == "{}") {
      alert("Championship not Successfully Uploaded..");
    } else {
      getData(
        `http://kgamifytest-env.eba-sb353hxm.ap-south-1.elasticbeanstalk.com/app/categories?category=${c_category}`
      ).then((data) => {
        if (JSON.stringify(data) == "{}") {
          alert("Championship not Successfully Uploaded..");
        } else {
          let count = data.Item.count;
          console.log(count + 1);
          postCategoryData(
            `http://kgamifytest-env.eba-sb353hxm.ap-south-1.elasticbeanstalk.com/app/categories/`,
            c_category,
            count + 1
          ).then((data) => {
            if (JSON.stringify(data) == "{}") {
              alert("Championship not Successfully Uploaded.!");
            } else {
              alert("Championship Successfully Uploaded.!");
            }
          });
        }
      });
    }
  });
}
