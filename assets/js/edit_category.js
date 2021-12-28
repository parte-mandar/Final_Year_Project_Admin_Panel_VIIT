if (sessionStorage.getItem("email") == null) {
  window.location.href = "index.html";
}

var currentUrl = window.location.href;
let params = new URL(currentUrl).searchParams;
let edit_championship = params.get("category"); // "n1"
console.log("Ediiit" + edit_championship);

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
  `http://kgamifytest-env.eba-sb353hxm.ap-south-1.elasticbeanstalk.com/app/championships?championship=${edit_championship}`
).then((data) => {
  if (JSON.stringify(data) == "{}") {
    document.getElementById("standard-select").innerHTML = "No data";
  } else {
    console.log(data.Item.championship);
    console.log(data.Item.description);
    console.log(data.Item.qualification);
    console.log(data.Item.total_coins);
    console.log(data.Item.number_of_questions);
    console.log(data.Item.total_time);

    document.getElementById("championship_name").value = data.Item.championship;
    document.getElementById("description").value = data.Item.description;
    document.getElementById("qualification").value = data.Item.qualification;
    document.getElementById("total_coins").value = data.Item.total_coins;
    document.getElementById("n_questions").value =
      data.Item.number_of_questions;
    document.getElementById("t_required").value = data.Item.total_time;
  }
});
