const params = new URLSearchParams(window.location.search);
var id = params.get("id");
var responseNumber = params.get("response");
var survey = document.getElementById("survey");
survey.style.display = "none";

if (id == null || responseNumber == null) {
  window.location.href = "https://www.touristplanner.xyz";
}

function updateScore() {
  let q1 = document.getElementById("q1");
  let q2 = document.getElementById("q2");

  let url = "https://liamattard.xyz:8888/updateScore";
  url += "?id=" + id;
  url += "&response=" + responseNumber;
  url += "&q1=" + q1.value;
  url += "&q2=" + q2.value;
  fetch(url, {
    method: "POST",
  }).then((response) => {
    if (response.status == 200) {
      if (responseNumber == 0) {
        window.location.href =
          "https://www.touristplanner.xyz/screens/timetable_two.html?response=1&id=" +
          id;
      } else {
        window.location.href =
          "https://www.touristplanner.xyz/fyp/FYP-Frontend/screens/thanks.html";
      }
    } else {
      window.location.href = "www.touristplanner.xyz";
    }
  });
}

let loading = document.getElementById("loading");

fetch(
  "https://liamattard.xyz:8888/getItineraries?id=" +
    id +
    "&response= " +
    responseNumber
)
  .then((response) => response.json())
  .then((data) => {
    setDays(data);
    loading.style.display = "none";
  })
  .then((_) => {
    document.body.appendChild(survey);
    survey.style.display = "";
  });

function setDays(data) {
  for (i = 0; i < Object.keys(data).length; i++) {
    let dayHeader = document.createElement("h2");
    dayHeader.innerHTML = "Day " + (i + 1);
    document.body.appendChild(dayHeader);

    //days container
    let dayDiv = document.createElement("div");
    document.body.appendChild(dayDiv);
    dayDiv.className = "Day";

    //line that's next to the days
    let ul = document.createElement("ul");
    ul.className = "DayItem";

    //cards of the days
    let cardHolder = document.createElement("div");
    cardHolder.className = "DayItem";

    dayDiv.appendChild(ul);
    dayDiv.appendChild(cardHolder);

    let timeOfDay = document.createElement("h2");
    timeOfDay.innerHTML = "Morning";
    cardHolder.appendChild(timeOfDay);

    for (j = 0; j < data[i.toString()].length; j++) {
      let card = document.createElement("div");
      let knob = document.createElement("li");
      let text = document.createElement("div");
      text.className = "item placeTitle";
      card.className = "card";
      text.innerHTML = data[i.toString()][j][0];

      if (j == data[i.toString()].length - 2) {
        let card_hotel = document.createElement("div");
        let knob_hotel = document.createElement("li");
        let text_hotel = document.createElement("div");
        text_hotel.className = "item placeTitle";
        card_hotel.className = "card";
        text_hotel.innerHTML = "Rest at Hotel";
        card_hotel.appendChild(getEmoji("hotel"));
        card_hotel.appendChild(text_hotel);
        cardHolder.appendChild(card_hotel);
        ul.appendChild(knob_hotel);

        let timeOfDay = document.createElement("h2");
        timeOfDay.innerHTML = "Evening";
        cardHolder.appendChild(timeOfDay);
      }
      card.appendChild(getEmoji(data[i.toString()][j][1]));
      card.appendChild(text);
      cardHolder.appendChild(card);
      ul.appendChild(knob);
    }
  }
}

function getEmoji(emojiString) {
  emoji = document.createElement("img");
  emoji.className = "item emoji";

  if (emojiString == "cafe") {
    emoji.src = "../assets/emojis/cafe.png";
  }
  if (emojiString == "shopping") {
    emoji.src = "../assets/emojis/shopping.png";
  }
  if (emojiString == "nature") {
    emoji.src = "../assets/emojis/nature.png";
  }
  if (emojiString == "restaurant") {
    emoji.src = "../assets/emojis/restaurant.png";
  }
  if (emojiString == "museums") {
    emoji.src = "../assets/emojis/museums.png";
  }
  if (emojiString == "beach") {
    emoji.src = "../assets/emojis/beach.png";
  }
  if (emojiString == "club") {
    emoji.src = "../assets/emojis/club.png";
  }
  if (emojiString == "bar") {
    emoji.src = "../assets/emojis/bar.png";
  }
  if (emojiString == "hotel") {
    emoji.src = "../assets/emojis/hotel.png";
  }

  return emoji;
}
