const weatherData = {'2025-06-08': ['Rome', '15'], '2025-06-09': ['Brisbane', '15'], '2025-06-10': ['Mendoza', '15'], '2025-06-11': ['Rome', '15'], '2025-06-12': ['Rome', '15'], '2025-06-13': ['Rome', '15'], '2025-06-14': ['Vienna', '15'], '2025-06-15': ['Vienna', '15'], '2025-06-16': ['Brisbane', '15'], '2025-06-17': ['Vienna', '15'], '2025-06-18': ['Vienna', '15'], '2025-06-19': ['Buenos Aires', '15'], '2025-06-20': ['Buenos Aires', '15'], '2025-06-21': ['Buenos Aires', '15'], '2025-06-22': ['Cordoba', '15'], '2025-06-23': ['Toronto', '15'], '2025-06-24': ['Toronto', '15'], '2025-06-25': ['Athens', '15'], '2025-06-26': ['Valletta', '15']}
// dataset format 2025-06-10

let dateRange = firstDateLastDate(weatherData);

document.getElementById("p2").textContent = `available dates between ${dateRange[0]} - ${dateRange[1]}` 


document.getElementById("go").onclick = function(){
    let dateFrom, dateTo;

    dateFrom = document.getElementById("dateFrom").value;
    dateTo = document.getElementById("dateTo").value;

    if (new Date(dateFrom) > new Date(dateTo)) {//if from date is after before date
        let dateFromCopy = dateFrom;
        dateFrom = dateTo;
        dateTo = dateFromCopy;

        document.getElementById("dateFrom").value = dateFrom;
        document.getElementById("dateTo").value = dateTo;
        
    }

    if (weatherData[dateFrom] == undefined || weatherData[dateTo] == undefined) {
        window.alert("Please include available dates");
        return;
    }

    let dates = getDates(dateFrom, dateTo);
    console.log(`dates: ${dates}`);

    let winner = bestLocation(dates, weatherData);

    //document.getElementById("myH2").textContent = `For dates ${dateFrom} to ${dateTo}:`;
    document.getElementById("myH2").textContent = `the nicest weather is in ${winner}!!`;
}


function getDates(startDateStr, endDateStr) {
  const dates = [];
  
  const startDate = new Date(startDateStr + "T12:00:00");// avoids local timezone issues 
  const endDate = new Date(endDateStr + "T12:00:00");

  // prevent DST issues
  startDate.setHours(0, 0, 0, 0);
  endDate.setHours(0, 0, 0, 0);

  while (startDate <= endDate) {
    // get string (YYYY-MM-DD T 00:00:00.000Z)
    const formatted = startDate.toISOString().split('T')[0];
    dates.push(formatted);

    // next day
    startDate.setDate(startDate.getDate() + 1);
  }

  return dates;
}


function firstDateLastDate(data){
    let latest = "";
    let earliest = "";
    
    for (let date in data){

        if (latest == ""){
            latest = date;
            earliest = date;
            continue;
        }

        if (new Date(latest) < new Date(date)){
            latest = date;
        }
        if (new Date(earliest) > new Date(date)){
            earliest = date;
        }
    }

    return [earliest, latest];
}

function bestLocation(dates, data){
    // dict format city : score
    let dict = {};

    for (let d of dates){
        // cityScore format tokyo, 10
        let cityScore = data[d];
        let city = cityScore[0];
        let dataScore = cityScore[1];

        let dictScore = 0;
        if (dict[city] != null){
            dictScore = dict[city];
        }

        dict[city] = dictScore + dataScore;    
    }
    let keys = Object.keys(dict);

    // best = [tokyo, 10]
    let best = [keys[0], dict[keys[0]]]

    for (let key of keys){
        if (best[1] < dict[key]){
            best = [key, dict[key]]
        }
    }
    return best[0]
}