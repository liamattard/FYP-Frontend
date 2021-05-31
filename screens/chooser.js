const params = new URLSearchParams(window.location.search);
var id = params.get("id");
if (id == null) {
  window.location.href = "https://www.touristplanner.xyz";
} else {
}

var slider = document.getElementById("slider");
var output = document.getElementById("moderation");
output.innerHTML = slider.value;

if (output.innerHTML == 1) {
  output.innerHTML = "Relaxed activity plan, not a lot of activities";
} else if (output.innerHTML == 2) {
  output.innerHTML = "Moderate activity plan";
} else if (output.innerHTML == 3) {
  output.innerHTML = "Busy activity plan, a lot of activities";
}

slider.oninput = function () {
  output.innerHTML = Math.round(this.value);
  if (output.innerHTML == 1) {
    output.innerHTML = "Relaxed activity plan, not a lot of activities";
  } else if (output.innerHTML == 2) {
    output.innerHTML = "Moderate activity plan";
  } else if (output.innerHTML == 3) {
    output.innerHTML = "Busy activity plan, a lot of activities";
  }
};

slider.onmouseup = function () {
  slider.value = Math.round(this.value);
  if (slider.value == 1) {
    output.innerHTML = "Relaxed activity plan, not a lot of activities";
  } else if (slider.value == 2) {
    output.innerHTML = "Moderate activity plan";
  } else if (slider.value == 3) {
    output.innerHTML = "Busy activity plan, a lot of activities";
  }
};

slider.ontouchend = function () {
  slider.value = Math.round(this.value);
};

var slider_two = document.getElementById("slider_two");
var output_two = document.getElementById("days");
output_two.innerHTML = slider_two.value;

slider_two.oninput = function () {
  output_two.innerHTML = Math.round(this.value);
};

slider_two.onmouseup = function () {
  slider_two.value = Math.round(this.value);
};

slider_two.ontouchend = function () {
  slider_two.value = Math.round(this.value);
};

function letsGo() {
  var loading = document.getElementById("loading");
  var button = document.getElementById("submit");
  loading.style.display = "";
  button.style.display = "none";
  let timetable_url = "https://liamattard.xyz:8888/setTimetableInfo?id=";
  timetable_url = timetable_url + id;
  timetable_url = timetable_url + "&moderation=" + slider.value;
  timetable_url = timetable_url + "&number_of_days=" + slider_two.value;
  fetch(timetable_url, {
    method: "POST",
  })
    .then((response) => {
      if (response.status == 200) {
        return response.text();
      } else {
        window.location.replace("https://www.touristplanner.xyz");
      }
    })
    .then((data) => {
      let final_site =
        "https://www.touristplanner.xyz/screens/timetable.html?id=";
      final_site += id;
      final_site += "&moderation=" + slider.value;
      final_site += "&days=" + slider_two.value;
      window.location.replace(final_site);
    });
}
