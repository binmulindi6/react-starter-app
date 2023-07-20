import Error404 from '../../assets/404.svg'
import { Header } from '../App/Login'

function NotFound() {
  return (
    <div className="bg-bg h-full w-full max-w-screen-2xl">
      <Header />
      <div className="flex justify-center mt-20">
        <img src={Error404} alt="" srcset="" />
      </div>
    </div>
  )
}

export default NotFound
