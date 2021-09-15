
// "https://api.openweathermap.org/data/2.5/weather?q=pune&appid=824ba6d6437716f74c2e07a55c8486d3"

//from weather.hbs file
const cityName = document.getElementById('cityName');
const submit_btn = document.getElementById('submit_btn');
const city_name = document.getElementById('city_name');
const temp = document.getElementById('temp');
const temp_status = document.getElementById('temp_status');
const dataHide = document.querySelector('.middle_layer');



const getInfo = async (event) => {
    // for Page not refresh
    event.preventDefault();
    if (cityName.value === "") {
        city_name.innerText = `Please Enter City Name First!!`;
        dataHide.classList.add('data_hide');
    }
    else {
        try {
            let api_url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName.value}&units=metric&appid=824ba6d6437716f74c2e07a55c8486d3`;
            //wait till when all data is not found
            const response = await fetch(api_url);
            const data = await response.json();
            const arrData = [data];
            city_name.innerText = `${arrData[0].name},${arrData[0].sys.country}`;
            temp.innerText = `${arrData[0].main.temp}°C`;
            // temp_status.innerText = arrData[0].weather[0].main;

            const tempMood = arrData[0].weather[0].main

            //condition to check weather condition sunny or cloudy or rainy
            if (tempMood == 'Clear') {
                temp_status.innerHTML =
                    "<i class='fas fa-sun' style='color: #eccc68;'></i>";
            }
            else if (tempMood == 'Clouds') {
                temp_status.innerHTML =
                    "<i class='fas fa-cloud' style='color: #f1f2f6;'></i>";
            }
            else if (tempMood == 'Rain') {
                temp_status.innerHTML =
                    "<i class='fas fa-cloud-rain' style='color: #a4b0be;'></i>";
            }
            else {
                temp_status.innerHTML =
                    "<i class='fas fa-sun' style='color: #eccc68;'></i>";
            }
            dataHide.classList.remove('data_hide');
        }
        catch {
            city_name.innerText = `Enter Right City Name`;
            dataHide.classList.add('data_hide');
        }
    }

}

submit_btn.addEventListener('click', getInfo);
