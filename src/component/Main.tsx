import { color } from "framer-motion";
import { WeeklyWeather , TodyasWeather } from "../Schemas/Schema";
import { Button , Flex , Heading , Text , Spacer, HStack, Grid , GridItem , GridProps} from "@chakra-ui/react";
import WeeklyWeatherAS from "./WeeklyWeather";
import SunriseT from "./SunriseT";
interface mainProps {
    weeklyDay : WeeklyWeather[],
    todaysWeather : TodyasWeather,
    setUnit: (arg:string) => void,
    unitDet : string,
    location:string
}

function Main( { weeklyDay , todaysWeather , setUnit , unitDet , location} : mainProps ) {



    // function to change the unit of temprature 
    let changeUnit = ( change:string )=> {
        if( change === 'imperial' ){
            setUnit('imperial') ;
        } else if( change === 'metric' ){
            setUnit('metric');
        }
    }


    // removing a extra array index from weekly 8 days to 7
    let newArrayWeek = weeklyDay.splice(7,1);

    return ( <>

        <Flex mb={10}>
            <Heading fontSize={20} as={'h2'} textColor={'cyan.300'} >Weekly Forcast</Heading>
            <Spacer/>
           <HStack>
            <Text fontSize={22}>Unit : </Text>
           <Button color={'white'} variant={'outline'} onClick={ ()=> { changeUnit('imperial') } } >F</Button>
            <Button  color={'white'} variant={ 'outline' } onClick={ ()=> { changeUnit('metric') } } >C</Button>
           </HStack>

        </Flex>
        
        {/* weekly display */}

        <Grid my={10} templateColumns={'repeat(7,1fr)'} gap={3}>
           
           { weeklyDay?.map( (item) => (
            <WeeklyWeatherAS icon={ item.icon } temp={ item.temp } status={ item.status } day={ item.day } unitDate ={ unitDet } />
           ) ) }
           
        </Grid>
        <Heading fontSize={20} as={'h2'} textColor={'cyan.300'} >Today's Highlight</Heading>
        <Grid templateColumns={'repeat(3,1fr)'}>
            {/* for sunrise and sunset */}
            <GridItem bg={'gray.700'} my={5} colSpan={1}>
                <SunriseT location={location} todaysData = { todaysWeather } unitDate={unitDet} />
            </GridItem>
            {/* for today's temprature */}
            <GridItem></GridItem>

        </Grid>

    </> );
}

export default Main;