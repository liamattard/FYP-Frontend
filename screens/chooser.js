const new_slider = document.getElementById("slider");
new_slider.style.setProperty("--val", +new_slider.value);
new_slider.style.setProperty("--max", +new_slider.max);
new_slider.style.setProperty("--min", +new_slider.min);

document.documentElement.classList.add("js");

new_slider.addEventListener(
  "input",
  (e) => {
    new_slider.style.setProperty("--val", +new_slider.value);
    console.log(new_slider.value);
  },
  false
);

const new_slider_two = document.getElementById("slider_two");
new_slider_two.style.setProperty("--val", +new_slider_two.value);
new_slider_two.style.setProperty("--max", +new_slider_two.max);
new_slider_two.style.setProperty("--min", +new_slider_two.min);

document.documentElement.classList.add("js");

new_slider_two.addEventListener(
  "input",
  (e) => {
    new_slider_two.style.setProperty("--val", +new_slider_two.value);
    console.log(new_slider_two.value);
  },
  false
);

const params = new URLSearchParams(window.location.search);
var id = params.get("id");
if (id == null) {
  window.location.href = "https://www.touristplanner.xyz";
} else {
}

var slider = document.getElementById("slider");

slider.onmouseup = function () {
  slider.value = Math.round(this.value);
};

slider.ontouchend = function () {
  slider.value = Math.round(this.value);
};

var slider_two = document.getElementById("slider_two");

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
