// this is todays temprature ff compoennt

import { Card, CardBody, CardFooter, CardHeader , Text , Flex, Box, Spacer, Image} from "@chakra-ui/react";
import { TodyasWeather } from "../Schemas/Schema";
import { IoIosThermometer , IoIosLocate} from "react-icons/io";

interface SunriceTprops {
  todaysData: TodyasWeather,
  unitDate:string,
  location:string
}

function SunriseT({ todaysData, unitDate, location }: SunriceTprops) {

  return (
    <>
      <Card bg={'gray.700'}>
        <CardHeader><Text fontWeight={'semibold'} fontSize={20} color={'white'} textAlign={'center'} >Temprature</Text></CardHeader>
        <CardBody>
            <Flex justifyContent={"space-around"}>
                <Box fontSize={38} color={'white'} > {todaysData.temp} {unitDate}</Box>
                
               <Box > <IoIosThermometer fill="white" size={90}/></Box>
            </Flex>
        </CardBody>
        <CardFooter>
        <Flex gap={4}>
        <IoIosLocate fill="white" size={30}/>
        <Text color={'white'} fontSize={20}>{location}</Text>
        </Flex>
        </CardFooter>
      </Card>
    </>
  );
}

export default SunriseT;
