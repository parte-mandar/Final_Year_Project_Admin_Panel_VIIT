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

function submit() {
  if (document.getElementById("question_text").value == "") {
    alert("Question Text cannot be empty !!");
    return;
  } else if (document.getElementById("option_1").value == "") {
    alert("Option 1 cannot be empty !!");
    return;
  } else if (document.getElementById("option_2").value == "") {
    alert("Option 2 cannot be empty !!");
    return;
  } else if (document.getElementById("option_3").value == "") {
    alert("Option 3 cannot be empty !!");
    return;
  } else if (document.getElementById("option_4").value == "") {
    alert("Option 4 cannot be empty !!");
    return;
  } else if (document.getElementById("total_coins").value == "") {
    alert("Total Coins cannot be empty !!");
    return;
  } else if (
    Number.isNaN(parseInt(document.getElementById("total_coins").value))
  ) {
    alert("Total Coins should be a Number !!");
    return;
  }

  var ans = "";

  const question = {
    Label: document.getElementById("standard-select").value,
    question: document.getElementById("question_text").value,
    coins: parseInt(document.getElementById("total_coins").value),
    questionID: Math.floor(Math.random() * 1000).toString(),
    option1: document.getElementById("option_1").value,
    option2: document.getElementById("option_2").value,
    option3: document.getElementById("option_3").value,
    option4: document.getElementById("option_4").value,
    answer: document.getElementById(
      document.getElementById("correct_options").value
    ).value,
    wrong_question: "0",
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
      body: JSON.stringify(question), // body data type must match "Content-Type" header
    });
    return response.json(); // parses JSON response into native JavaScript objects
  }

  postData(
    `http://kgamifytest-env.eba-sb353hxm.ap-south-1.elasticbeanstalk.com/app/questions/`
  ).then((data) => {
    if (JSON.stringify(data) == "{}") {
      alert("Questions not Successfully Uploaded..");
    } else {
      alert("Questions added Successfully!..");
      console.log(data);
    }
  });
}
