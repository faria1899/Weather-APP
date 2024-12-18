const emptyInput  =  document.getElementById("Empty-input");
const SearchBtn   =  document.getElementById("search-button");
document.getElementById("search-city").addEventListener("keypress",(event)=>{
    if(event.key==="Enter"){

        SearchBtn.click();

    };
});

const SearchButton = () =>{
    const InputSearch =  document.getElementById("search-city");
    const CityName = InputSearch.value.trim();
    emptyInput.textContent="";

    if (CityName === ""){
        emptyInput.innerHTML= 
        `<h4 class=" text-danger mt-3">Please Enter the city name</h4>`;
        return;
            

    } 
    InputSearch.value=" ";
    
    loadSearch(CityName);



};

const loadSearch = async(city)=>{

    const api="568a2f0c890179542da59ba2aa85dadf";
    const url=`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api}&units=metric`;
    const res = await fetch(url);
    const tem = await res.json();
    console.log(tem);
    

    DisplayWeather(tem);
}

const DisplayWeather=(temperture)=>{

    if(temperture.message === "city not found"){
        emptyInput.innerHTML=  `
         <h4 class=" text-danger mt-2">No weather data found !</h4>
        `;
    };
     
    const cont = document.getElementById("container");
    cont.innerHTML="";
     
     const localData  =   ConvertUnixTimeToLocalData(temperture.dt);
     const SunRise    =   ConvertUnixTimeToLocalData(temperture.sys.sunrise);
     const SunSet     =   ConvertUnixTimeToLocalData(temperture.sys.sunset);


    const div= document.createElement("div");
    div.innerHTML= `
                <h4 class="fs-2 text-white">${temperture.name},${temperture.sys.country}</h4>
                <h6 class=" text-white">${localData.fullDate}</h6>
                <img src="http://openweathermap.org/img/wn/${temperture.weather[0].icon}@2x.png" alt="Weather Icon"
     style="filter: brightness(0) invert(1);">
                 <h5 class="fs-1 text-white">${temperture.main.temp} &deg;C</h5>
                 <h5 class=" text-white">${temperture.weather[0].main}</h5>
                 <h5 class=" text-white"><span class="me-3">Sunrise: ${SunRise.time12h}</span> & <span class="ms-3">Sunset: ${SunSet.time12h}</span></h5>
                 <h5 class=" text-white"><span>Wind:${temperture.wind.speed}</span></h5>

                `;
                
                 

    cont.appendChild(div);
};
loadSearch("dhaka");

const ConvertUnixTimeToLocalData=(unixTime)=>{
    const MilliSeconds = unixTime*1000;
    const humanDateFormat = new Date(MilliSeconds);
    const Convertobj={
        fullDate: humanDateFormat.toLocaleString("en-US", {
            day: "numeric",
            month: "short",
            year: "numeric",
          }),
          time12h: humanDateFormat.toLocaleString("en-US", {
            hour: "numeric",
            minute: "numeric",
            hour12: true,
          }),

    };

     return Convertobj;
}
