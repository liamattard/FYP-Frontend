const params = new URLSearchParams(window.location.search);
var id = params.get("id");
var moderation = params.get("moderation");
var days = params.get("days");

if (moderation == null || days == null || id == null) {
  window.location.href = "https://www.touristplanner.xyz";
}

let loading_bar = document.createElement("img");
loading_bar.src = "https://media0.giphy.com/media/3oEjI6SIIHBdRxXI40/200.gif";
let loading_text = document.createElement("div");
loading_text.innerHTML = "Generating Your Activity Plans!";
document.body.appendChild(loading_bar);
document.body.appendChild(loading_text);

function add_days(days_tab, plan) {
  for (let i = 1; i <= days; i++) {
    day_button = document.createElement("button");
    day_button.id = "days_button";
    day_button.className = "daytablinks";
    day_button.innerHTML = "Day";
    day = document.createElement("div");
    day.innerHTML = i;

    day_content = document.createElement("div");
    day_content.className = "daytabcontent";
    console.log(day_content);
    let id = i + days_tab.id;
    day_content.id = id;
    day_content.style.textAlign = "center";

    for (let j = 0; j < plan[i - 1].length; j++) {
      place = document.createElement("div");
      place.className = "place";
      place.innerHTML = plan[i - 1][j];
      day_content.appendChild(place);
    }
    document.body.appendChild(day_content);

    day_button.appendChild(day);
    day_button.onclick = function () {
      switch_timetable(event, id, true);
    };
    days_tab.appendChild(day_button);
  }
}

function switch_timetable(evt, timetable_name, is_day) {
  var i, tabcontent, tablinks;
  if (is_day) {
    tabcontent = document.getElementsByClassName("daytabcontent");
    tablinks = document.getElementsByClassName("daytablinks");
  } else {
    tabcontent = document.getElementsByClassName("tabcontent");
    tablinks = document.getElementsByClassName("tablinks");

    days_tablinks = document.getElementsByClassName("daytabcontent");
    for (i = 0; i < days_tablinks.length; i++) {
      days_tablinks[i].style.display = "none";
    }

    daytablinks = document.getElementsByClassName("daytablinks");
    for (i = 0; i < daytablinks.length; i++) {
      daytablinks[i].className = daytablinks[i].className.replace(
        " active",
        ""
      );
    }
    if (timetable_name.charAt(timetable_name.length - 1) == "e") {
      daytablinks[0].className += " active";
      days_tablinks[0].style.display = "block";
    } else {
      console.log("aa" + days_tablinks.length / 2);
      let good_index = days_tablinks.length / 2;
      good_index = parseInt(good_index, 10);
      daytablinks[good_index].className += " active";
      days_tablinks[good_index].style.display = "block";
    }
  }
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" active", "");
  }

  document.getElementById(timetable_name).style.display = "block";
  evt.currentTarget.className += " active";
}

fetch("http://liamattard.xyz:8888/getItineraries?id=" + id)
  .then((response) => response.json())
  .then((data) => {
    console.log(data);
    loading_text.style.display = "none";
    loading_bar.style.display = "none";
    days_tab_one = document.getElementById("days_tab_one");
    days_tab_two = document.getElementById("days_tab_two");
    add_days(days_tab_one, data);
    add_days(days_tab_two, data);
    document.getElementById("first").click();
  });
