import { Button, Stack, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

function Error() {
    const nav=useNavigate();
  return (
    <Stack
    width={'100%'}
    height={'100vh'}
    flexDirection={'row'}
    justifyContent={'center'}
    alignItems={'center'}
    sx={{
        background:'url("/errorImage.jpg")',
        backgroundRepeat:"no-repeat",
        backgroundSize:'cover'
    }}
    >
        <Stack 
        padding={5}
        // border={'1px solid black'}
        // bgcolor={'wheat'}
        borderRadius={'10px'}
        flexDirection={'column'}
        alignItems={'center'}
        gap={2}
        color={'white'}
        marginTop={'200px'}
        // boxShadow={'7px 7px 7px white'}
        >
            <Typography variant="h3">Oop`s</Typography>
            <Typography variant="h3">you're lost</Typography>
            <button
            onClick={()=>nav(-1)} 
            className="p-1 bg-blue-900 text-white rounded-md hover:bg-blue-800">Go Back</button>
            <button
            onClick={()=>nav('/')} 
            className="p-1 bg-blue-900 text-white rounded-md hover:bg-blue-800">Go to Home</button>
        </Stack>
    </Stack>
  )
}

export default Error;