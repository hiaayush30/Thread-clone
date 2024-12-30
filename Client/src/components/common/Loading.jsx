import { Stack, CircularProgress } from "@mui/material"
function Loading() {
  return (
    <div className="flex justify-center items-center">
      <CircularProgress color="info" size={20}/>
    </div>
  )
}

export default Loading
