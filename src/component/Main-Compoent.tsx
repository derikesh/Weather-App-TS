import axios from "axios";
import React, { useEffect, useState } from "react";
import { TodyasWeather, WeeklyWeather } from "../Schemas/Schema";
import { Grid, GridItem } from "@chakra-ui/react";
import SiderBar from "./SiderBar";
import Main from "./Main";
import { useQuery } from "react-query";

function MainComponent() {
  // useStates to Fetch the latitude and longititude
  const [cordinate, setCorinate] = useState({
    longitude: 85.324,
    latitude: 27.7172,
  });

  //   useState to state the Unit of Temprature
  // For temperature in Fahrenheit use units=imperial
  // For temperature in Celsius use units=metric
  const [unit, setUnit] = useState<string>("metric");


  // set location name
  const [location, setLocation] = useState('kathmandu')


  // this is for letting user know if its degree celcius or fahrewriash 
  const [unitDet, setUnitDet] = useState('c')

  // useEffect function to fetch the datas of weather
  useEffect(() => {
    QueryData();
  }, [cordinate, unit]);

  useEffect( ()=> {
    if( unit === 'metric' ){
      setUnitDet('C');
    }else {
      setUnitDet('F')
    }
  } ,[ unit ])

  // now to set the intial values of todays datas and assigning the data type created in Schemas

  // here we are intilizing that TodyasWeather is an Object  
  const [todaysWeather, setTodaysWeather] = useState<TodyasWeather>({
     humidity: 0,
    sunrise: 0,
    sunset: 0,
    temp: 0,
    visibility: 0,
    wind_speed: 0,
    status: 'clear',
    rain_status: 0,
    Icon:'string'
  });


//   using state to store the values of weelkly information 

// here we can saying weeklyDay is an array , but we can do same as todaysWeather state 
// here we are using array insted of object because we want to display 7 weekly days data , which will be easy to acess when placed in array 
const [weeklyDay, setWeeklyDay] = useState<WeeklyWeather[]>( [] );


// trying to use react query 


 useQuery('query-key',()=> { QueryData() }  )

let QueryData = async ()=> {
  try {
    const link = await axios.get(
      `https://api.openweathermap.org/data/2.5/onecall?lat=${cordinate.latitude}&lon=${cordinate.longitude}&units=${unit}&exclude=hourly,minutely&appid=2cef435fc80892a1fcba4005dc6b4223`
    );
    // since we are stroing this data to out todaysWeather State which data type is object , we are also using object data type here
       let CurrentDay = {
        humidity: link.data.current.humidity,
        sunrise: link.data.current.sunrise,
        sunset: link.data.current.sunset,
        temp: link.data.current.temp,
        visibility: link.data.current.visibility,
        wind_speed: link.data.current.wind_speed,
        status: link.data.current.weather[0].main,
        rain_status: link.data.current.uvi,
        Icon: link.data.current.weather[0].icon
      };

  //   set the datas for current dat
    setTodaysWeather(CurrentDay);




  //   now setting the array for weakly dats


  // setting current day to make proper loop
    let day1 = new Date().getDay();

  //   initilizing a empty array to store all the datas 
  let weeklyUpdate:any[] = [];
    
  // mapping through the loop of 6 index days
    link.data.daily.map( (item:any, index:number)=> {
      
      // making a condition if day > 6 then put value 0 as day1, day1 is incremented in each iterations

      if( day1 > 6 ) {
          day1 = 0;
      }
      weeklyUpdate.push( { 
          temp:item.temp.day,
          id:index,
          day:day1,
          icon:item.weather[0].icon,
          status:item.weather[0].main
       } );


       day1++;

  } )

  setWeeklyDay( weeklyUpdate );

  } catch (err) {
    if (axios.isAxiosError(err)) {
      throw new Error(err.message);
    } else {
      throw new Error("an unknow error has occured");
    }
  }
}


  // function fetching data using axios
  // let getWeather = async () => {
   
  // };



  // jsx elemnts
  return <>
  
    <Grid templateColumns='repeat( 12,1fr )'  >
      <GridItem colSpan={ 12 } mb={30}>
        {/* for sidebar we will be sending todays weather data and unitDet data  and also set cordinate because we will be updating lat and long when user search for other countries */}
        <SiderBar todaysWeather={todaysWeather} setLocation={setLocation} units={ setUnitDet }  setCorinate={ setCorinate }/>
        </GridItem>
      <GridItem colSpan={12}>
        <Main location={location} weeklyDay = { weeklyDay } unitDet={unitDet  } setUnit={ setUnit } todaysWeather= { todaysWeather } />
      </GridItem>

    </Grid>

  </>;
}

export default MainComponent;
