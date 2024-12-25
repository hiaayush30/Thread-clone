import Input from '../../components/Home/Input'
import Post from '../../components/Home/Post'

export default function Home() {
  return (
    <>
      <div className='py-5'>
        <Input />
        <Post src='' />
        <Post src='errorImage.jpg' />
        <Post src='image.jpg' />
        <Post src='peakpx.jpg' />
      </div>
      <div className='text-center py-3'>
        <button className='px-1 py-1 border-2 rounded-md hover:underline underline-offset-4 hover:bg-blue-50 bg-blue-100'>Load More</button>
      </div>
    </>
  )
}
