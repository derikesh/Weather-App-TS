import { Input } from "@chakra-ui/react";
import { TodyasWeather , Coordinates } from "../Schemas/Schema";
import { AsyncPaginate } from "react-select-async-paginate";
import { useState } from "react";
import axios, { AxiosError } from "axios";
import { isError } from "react-query";
import { Box } from "@chakra-ui/react";


interface SidebarProps {
  todaysWeather: TodyasWeather,
  units: ( arg:string ) => void,
  setCorinate : (arg:Coordinates) => void,
  setLocation:(arg:string)=> void
}

function Siderbar( { todaysWeather ,units, setCorinate ,setLocation} : SidebarProps  ) {


  // using state to pass value between input value and loadoption function 

  const [search, setSearch] = useState<any>(null);


  // function to handel onchange


  // this function keep on changing its values as we change input values
  let handelOnChange = ( inputValue:any )=> {

    // setting setSearch into on change because we want to pass input value of user to loadfunction 
    setSearch(inputValue);

    // this is onchange values 

    let cordinateObject = inputValue;
    
    console.log(cordinateObject);

    setCorinate( {
      latitude :cordinateObject.lat ,
      longitude : cordinateObject.long
    } )

    setLocation(cordinateObject.label)

  }


  // function for 'loadOptions'
  const functionLoad = async ( inputValue:string )=> {

    try {

        let linkData =await axios.get(`http://api.openweathermap.org/geo/1.0/direct?q=${inputValue}&limit=4&appid=2cef435fc80892a1fcba4005dc6b4223`);

        

        return { options:linkData.data.map( (item:any)=> {
          return {
              lat : `${ item.lat }`,
              long: `${ item.lon }`,
              label: `${ item.name } , ${ item.country }`

          }


        } ) };

        

    } catch(err){

      if( axios.isAxiosError(err) ){
        throw new Error( err.message )
      } else {
        return { options : [] }
      }

    }


  }


  
  return ( <>
  
    
   <Box color={'black'}>
   <AsyncPaginate
    loadOptions={ functionLoad }
    placeholder='Search For City Name '
    value={search}
    onChange={ handelOnChange }
    />
   </Box>

    
  </> );
}

export default Siderbar;
