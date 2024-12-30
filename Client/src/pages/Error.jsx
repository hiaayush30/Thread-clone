import { Button, Stack, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

function Error() {
    const nav=useNavigate();
  return (
    <div className="w-screen h-screen bg-[url('/errorImage.jpg')] bg-cover bg-no-repeat flex justify-center items-center">
        <Stack 
        padding={5}
        // border={'1px solid black'}
        // bgcolor={'wheat'}
        borderRadius={'10px'}
        flexDirection={'column'}
        alignItems={'center'}
        gap={2}
        color={'white'}
        // boxShadow={'7px 7px 7px white'}
        >
            <Typography variant="h3">Oop`s</Typography>
            <Typography variant="h3">you're lost</Typography>
            <button
            onClick={()=>nav(-1)} 
            className="p-1 bg-zinc-800 text-white rounded-md hover:bg-zinc-700">Go Back</button>
            <button
            onClick={()=>nav('/')} 
            className="p-1 bg-zinc-800 text-white rounded-md hover:bg-zinc-700">Go to Home</button>
        </Stack>
    </div>
  )
}

export default Error;