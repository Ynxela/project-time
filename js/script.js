//function makeGETRequest(url, callback) {
//    let xhr;
//    xhr = new XMLHttpRequest();
//
//    xhr.onreadystatechange = function () {
//        if (xhr.readyState === 4) {
//            callback(xhr.responseText);
//        }
//    }
//
//    xhr.open('GET', url, true);
//    xhr.send();
//};

let dailyActivitiesData = {
    dailyData: {
        '24.4.2019': [
            {
                time: [3600, 3660],
                activity: 'A6EA19A35',
                activityN: "Сон",
            },
            {
                time: [3720, 3780],
                activityCode: 'A327E1367',
                activityN: "Прогулка",
            },
        ],
        '25.4.2019': [
            {
                time: [3600, 3660],
                activity: 'A6EA19A35',
                activityN: "Сон",
            },
            {
                time: [3720, 3780],
                activity: 'A327E1367',
                activityN: "Прогулка",
            },
            {
                time: [3780, 3840],
                activity: 'A327E1367',
                activityN: "Прогулка",
            },
        ],
    },


    renderData: function () {

        let parent = document.getElementById('activity-container');
        parent.innerHTML = '';

        for (date in this.dailyData) {
            let idx = 0;

            let activityBlock = document.createElement('div');
            activityBlock.className = 'activity-block';
            activityBlock.id = `${date}`;
            parent.appendChild(activityBlock);

            let dateBlock = document.createElement('div');
            dateBlock.className = 'date-block';
            dateBlock.innerHTML = `<p>${date}</p>`;
            activityBlock.appendChild(dateBlock);

            this.dailyData[date].forEach(function (act, idx) {
                
                let activityData = document.createElement('div');
                activityData.className = 'activity-data';
                

                let deleteCross = document.createElement('div');
                deleteCross.className = 'delete-cross';
                deleteCross.onclick = deleteElement;
                deleteCross.dataset.idx = idx;
                deleteCross.dataset.date = date;

                activityBlock.appendChild(activityData);
                activityData.innerHTML = `<p>${transformTimeBack(act.time[0])} - ${transformTimeBack(act.time[1])}</p><p>${act.activityN}</p>`;
                activityData.appendChild(deleteCross);
                
                idx += 1

            });

        };
    },

};

function deleteElement(event) {
    let activityId = event.target.dataset.idx;
    let date = event.target.dataset.date;
    delete dailyActivitiesData.dailyData[date][activityId];
    dailyActivitiesData.renderData();
};

let activityData = {
    activities: {
        A6EA19A35: "Сон",
        A627E9367: "Прогулка",
        A327E1367: "Чтение книги",
    },
    getData: function () {
        this.activities = JSON.parse(this.jsonData);
        return this.activities;
    },
    getActivities: function () {
        return this.activities;
    },
    createActivity: function (name) {
        this.activities[generateActivityCode()] = name;
    },
    deleteActivity: function (code) {
        delete this.activities[code];
    },
    updateActivity: function (code, newName) {
        this.activities[code] = newName;
    }
};


function generateActivityCode() {
    let letters = '0123456789ABCDEF';
    let activityCode = '';
    for (let i = 0; i < 8; i++) {
        activityCode += letters[Math.floor(Math.random() * 16)];
    }
    return activityCode;
};

function transformTime(date) {
    let devider = date.indexOf(":");
    let hour = date.substring(0, devider);
    let minutes = date.substr(devider + 1, 5);
    let secondStamp = hour * 3600 + minutes * 60;
    return secondStamp;
};

function transformTimeBack(seconds) {
    let hr = '';
    let min = '';
    let hours = Math.floor(seconds / 3600);
    let minutes = (seconds - hours * 3600) / 60;
    if (hours < 10) {
        hr = 0;
    }
    if (minutes < 10) {
        min = 0;
    }
    let time = `${hr}${hours}:${min}${minutes}`;
    return time;
};

function getCurrentDate() {
    let date = new Date();
    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();
    let fullDate = `${day}.${month}.${year}`;
    return fullDate;
};

function fillData(start, end, code) {
    let today = getCurrentDate();
    if (!dailyActivitiesData.dailyData[today]) {
        dailyActivitiesData.dailyData[today] = [];
    }
    let startActivity = transformTime(start);
    let endActivity = transformTime(end);
    let activities = activityData.getActivities();
    let activityNm = null;

    if (code in activities) {
        activityNm = activities[code];
    } else {
        activityNm = "Не существует";
    };

    let data = {
        time: [startActivity, endActivity],
        activityCode: code,
        activityN: activityNm,
    };

    dailyActivitiesData.dailyData[today].push(data);
    dailyActivitiesData.renderData();
};

window.onload = dailyActivitiesData.renderData();
