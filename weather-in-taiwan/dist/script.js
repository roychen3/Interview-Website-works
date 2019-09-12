var allWeatherData;
var weatherObj = {
  location: "",
  info: [
  {
    startTime: "",
    endTime: "",
    weatherDescription: "",
    maxTemperature: "",
    minTemperature: "",
    rainProbability: "",
    comfort: "" },

  {
    startTime: "",
    endTime: "",
    weatherDescription: "",
    maxTemperature: "",
    minTemperature: "",
    rainProbability: "",
    comfort: "" },

  {
    startTime: "",
    endTime: "",
    weatherDescription: "",
    maxTemperature: "",
    minTemperature: "",
    rainProbability: "",
    comfort: "" }] };



var isShow = false;

function showSelectOption() {
  let selectOptin = document.querySelector(".select-option");
  if (isShow) {
    selectOptin.classList.remove("show-select-option");
    isShow = false;
  } else
  {
    selectOptin.classList.add("show-select-option");
    isShow = true;
  }
}

function switchDay(day) {
  let result;
  switch (day) {
    case 0:
      result = "星期日";
      break;
    case 1:
      result = "星期一";
      break;
    case 2:
      result = "星期二";
      break;
    case 3:
      result = "星期三";
      break;
    case 4:
      result = "星期四";
      break;
    case 5:
      result = "星期五";
      break;
    case 6:
      result = "星期六";
      break;}

  return result;
}

function showWeather() {
  let weather = document.querySelector(".weather");
  let showData = '';
  let startWeatherDate;
  let endWeatherDate;
  let date = '';
  let startDay;
  let endDay;
  let startTime;
  let endTime;
  let time;
  weather.innerHTML = "<h3 class='weather-location'>" + weatherObj.location + "</h3>";
  showData += "<div class='weather-card-container'>";

  for (let i = 0; i < 3; i++) {
    startWeatherDate = new Date(weatherObj.info[i].startTime);
    endWeatherDate = new Date(weatherObj.info[i].endTime);
    startDay = switchDay(startWeatherDate.getDay());
    endDay = switchDay(endWeatherDate.getDay());
    startTime = startWeatherDate.toLocaleTimeString('en-US');
    endTime = endWeatherDate.toLocaleTimeString('en-US');
    time = "<p class='start-time'>" + startTime + "</p><p class='end-time'> - " + endTime + '</p>';
    if (startDay === endDay) {
      date = startDay + "<br>" + time;
    } else
    {
      date = startDay + " - " + endDay + "<br>" + time;
    }

    showData += "<div class='weather-card'>";
    showData += "<div class='weather-time'>" + date + "</div>";
    showData += "<div class='weather-description'>" + weatherObj.info[i].weatherDescription + "</div>";
    showData += "<div class='weather-temperature'>" + weatherObj.info[i].minTemperature + " ~ " + weatherObj.info[i].maxTemperature + "</div>";
    showData += "<div class='rain-probability'>降雨機率：" + weatherObj.info[i].rainProbability + "</div>";
    showData += "</div>";
  }
  showData += "</div>";
  weather.innerHTML += showData;
}

function filterDatas(selectedLocation) {
  let weatherDataSite;

  // 尋找選擇地區在陣列中的位子
  for (let i = 0; i < allWeatherData.length; i++) {
    if (allWeatherData[i].locationName == selectedLocation) {
      weatherDataSite = i;
      break;
    }
  }

  let infoType;
  let infoStartTime;
  let infoEndTime;
  let weatherDescription;
  let rainProbability;
  let degree;

  for (let i = 0; i < allWeatherData[weatherDataSite].weatherElement.length; i++) {
    infoType = allWeatherData[weatherDataSite].weatherElement[i].elementName;
    weatherObj.location = allWeatherData[weatherDataSite].locationName;

    for (let j = 0; j < allWeatherData[weatherDataSite].weatherElement[i].time.length; j++) {
      infoStartTime = allWeatherData[weatherDataSite].weatherElement[i].time[j].startTime;
      infoEndTime = allWeatherData[weatherDataSite].weatherElement[i].time[j].endTime;

      if (j < 3) {
        weatherObj.info[j].startTime = infoStartTime;
        weatherObj.info[j].endTime = infoEndTime;
      }

      if (infoType === "Wx") {
        // 天氣描述
        weatherDescription = allWeatherData[weatherDataSite].weatherElement[i].time[j].parameter.parameterName;
        weatherObj.info[j].weatherDescription = weatherDescription;
      } else
      if (infoType === "MaxT") {
        // 最高溫度
        degree = allWeatherData[weatherDataSite].weatherElement[i].time[j].parameter.parameterName + "℃";
        weatherObj.info[j].maxTemperature = degree;
      } else
      if (infoType === "MinT") {
        // 最低溫度
        degree = allWeatherData[weatherDataSite].weatherElement[i].time[j].parameter.parameterName + "℃";
        weatherObj.info[j].minTemperature = degree;
      } else
      if (infoType === "CI") {
        // 舒適感
        weatherDescription = allWeatherData[weatherDataSite].weatherElement[i].time[j].parameter.parameterName;
        weatherObj.info[j].comfort = weatherDescription;
      } else
      if (infoType === "PoP") {
        // 降雨機率
        rainProbability = allWeatherData[weatherDataSite].weatherElement[i].time[j].parameter.parameterName + "%";
        weatherObj.info[j].rainProbability = rainProbability;
      }
    }

    showWeather();
  }
}

function addSelectOption() {
  let selectBar = document.querySelector(".select-bar");
  selectBar.innerHTML += "<ul class='select-option'></ul>";

  let selectOption = document.querySelector(".select-option");
  for (let i = 0; i < allWeatherData.length; i++) {
    selectOption.innerHTML += "<li class='option'>" + allWeatherData[i].locationName + "</li>";
  }

  let option = document.querySelectorAll(".select-option .option");
  for (let i = 0; i < option.length; i++) {
    option[i].addEventListener("click", () => selectedLocation(option[i].innerText));
  }
}

function selectedLocation(location) {
  let selectBarText = document.querySelector(".select-bar p");
  let option = document.querySelectorAll(".select-bar .select-option .option");
  let isDelete = false;
  let isAdd = false;
  selectBarText.innerText = location;

  for (let i = 0; i < option.length; i++) {
    if (isDelete && isAdd) {
      break;
    }
    if (option[i].classList.contains("selected")) {
      option[i].classList.remove("selected");
      isDelete = true;
    }
    if (option[i].innerText === location) {
      option[i].classList.add("selected");
      isAdd = true;
    }
  }

  filterDatas(location);
}

function getWeather() {
  let title = document.querySelector("header .title");
  title.textContent = "台灣 36 小時天氣預報";

  let xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    let messagModel = document.querySelector(".message-model");
    let message = document.querySelector("#message");

    if (this.readyState == 4 && this.status == 200) {
      message.innerHTML = "";
      messagModel.classList.remove("show");

      let resultDatas = JSON.parse(this.responseText);
      let selectBar = document.querySelector(".select-bar");

      allWeatherData = resultDatas.cwbopendata.dataset.location;
      selectBar.addEventListener("click", () => showSelectOption());
      addSelectOption();
      filterDatas("臺北市");

      let option = document.querySelectorAll(".select-bar .select-option .option");
      option[0].classList.add("selected");

    } else
    if (this.readyState == 1) {
      message.innerHTML = "<i class='fas fa-spinner'></i> 載入中";
      messagModel.classList.add("show");
    } else
    if (this.status != 200) {
      message.innerHTML = "<i class='fas fa-exclamation-triangle'></i> 伺服器發生問題";
      messagModel.classList.add("show");
    }
  };

  //在 api 網址前面加上 https://cors-anywhere.herokuapp.com/ 解決 CORS 問題
  xhttp.open("GET", "https://opendata.cwb.gov.tw/fileapi/v1/opendataapi/F-C0032-001?Authorization=rdec-key-123-45678-011121314&format=JSON", true);
  xhttp.send();
}

getWeather();