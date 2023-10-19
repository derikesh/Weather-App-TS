import {
  Box,
  Flex,
  Card,
  CardBody,
  CardHeader,
  CardFooter,
} from "@chakra-ui/react";

interface WeeklyProps {
  icon: string;
  temp: number;
  status: string;
  day: number;
  unitDate:string;
}

function WeeklyWeatherAS({ icon, temp, status, day, unitDate }: WeeklyProps) {
  // making a cases to display the day for 0 1 2 3 to sun , mon ,tues

  let weekDay;

  switch (day) {
    case 0:
      weekDay = "Sunday";
      break;
    case 1:
      weekDay = "Monday";
      break;
    case 2:
      weekDay = "Tuesday";
      break;
    case 3:
      weekDay = "Wednesday";
      break;
    case 4:
      weekDay = "Thrusday";
      break;
    case 5:
      weekDay = "Friday";
      break;
    case 6:
      weekDay = "Saturday";
      break;
  }

  return (
    <>
      <Card bg={"gray.700"}>
        <CardHeader fontWeight={'semibold'} fontSize={20} color={'white'} textAlign={'center'}>{ weekDay}</CardHeader>
        <CardBody>
          <img
            src={` https://openweathermap.org/img/wn/${icon}@2x.png`}
            alt=""
          />
        </CardBody>
        <CardFooter fontWeight={'semibold'} fontSize={18} color={'gray.400'} textAlign={'center'} >{temp} {unitDate}</CardFooter>
      </Card>
    </>
  );
}

export default WeeklyWeatherAS;
