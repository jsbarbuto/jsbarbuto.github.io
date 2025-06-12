const weatherData = {'2025-06-08': ['Rome', '15'], '2025-06-09': ['Brisbane', '15'], '2025-06-10': ['Mendoza', '15'], '2025-06-11': ['Rome', '15'], '2025-06-12': ['Rome', '15'], '2025-06-13': ['Rome', '15'], '2025-06-14': ['Vienna', '15'], '2025-06-15': ['Vienna', '15'], '2025-06-16': ['Brisbane', '15'], '2025-06-17': ['Vienna', '15'], '2025-06-18': ['Vienna', '15'], '2025-06-19': ['Buenos Aires', '15'], '2025-06-20': ['Buenos Aires', '15'], '2025-06-21': ['Buenos Aires', '15'], '2025-06-22': ['C�rdoba', '15'], '2025-06-23': ['Toronto', '15'], '2025-06-24': ['Toronto', '15'], '2025-06-25': ['Athens', '15'], '2025-06-26': ['Valletta', '15']}

console.log(weatherData['2025-06-08']);

console.log(`example dates 20250609, 20250615`);
//YYYYMMDD
//20250609
let dateFrom
let dateBack
//dataset format 2025-06-10


document.getElementById("dateFromButton").onclick = function(){ 
    dateFrom = document.getElementById("dateFrom").value;
    dateFrom = formatDate(dateFrom);

    console.log("date From: " + dateFrom); 

}

document.getElementById("dateBackButton").onclick = function(){
    dateBack = document.getElementById("dateBack").value;
    console.log("date To: " + dateBack); 
    dateBack = formatDate(dateBack);

    document.getElementById("myH2").textContent = `${dateFrom} - ${dateBack} ....`;
}

document.getElementById("generateButton").onclick = function(){

    let dates = getDateRange(dateFrom, dateBack);
    console.log(`dates: ${dates}`);

    let winner = bestLocation(dates, weatherData);
    console.log(`best country: ${winner}`);

    //write best location
    document.getElementById("myH2").textContent = `${winner}!!`;

    console.log(`recommended city is ${winner}`);
}

//window.alert('example');

function formatDate(date){
    stringBuilder = "";
    for (i=0; i<date.length; i++){
        if (i==4 || i==6) { stringBuilder += '-'} 
        stringBuilder += date[i];
    }
    return stringBuilder
}

function getDateRange(startDateStr, endDateStr) {
  const dates = [];
  
  const startDate = new Date(startDateStr);
  const endDate = new Date(endDateStr);

  //prevent DST issues
  startDate.setHours(0, 0, 0, 0);
  endDate.setHours(0, 0, 0, 0);

  while (startDate <= endDate) {
    //get string (YYYY-MM-DD T 00:00:00.000Z)
    const formatted = startDate.toISOString().split('T')[0];
    dates.push(formatted);

    //next day
    startDate.setDate(startDate.getDate() + 1);
  }

  return dates;
}

//data -> date: [city, score]
function bestLocation(dates){
    //dict -> city : score
    let dict = {};

    for (let d of dates){
        //cityScore -> tokyo, 10
        let cityScore = weatherData[d];
        let city = cityScore[0];
        let dataScore = cityScore[1];

        let dictScore = 0;
        if (dict[city] != null){
            dictScore = dict[city];
        }

        dict[city] = dictScore + dataScore;    
    }
    let keys = Object.keys(dict);

    //best = [tokyo, 10]
    let best = [keys[0], dict[keys[0]]]

    for (let key of keys){
        if (best[1] < dict[key]){
            best = [key, dict[key]]
        }
    }
    return best[0]
}