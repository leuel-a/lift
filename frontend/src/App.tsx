import LoginForm from '@/components/login-form.tsx'
import homePageImg from './assets/undraw_software_engineer_re_tnjc.svg'
import { Dumbbell } from 'lucide-react'

export default function App() {
  return (
    <div className="flex h-screen items-center">
      <div className="flex h-full flex-1 flex-col justify-center items-center gap-10 bg-indigo-100/20">
        <div className="max-w-[32rem]">
          <img className="object-cover" src={homePageImg} alt="Home page image" />
        </div>
        <div className="space-y-3 text-center">
          <h1 className="text-3xl text-indigo-950 font-medium">Your Gym, Perfectly Managed.</h1>
          <p className="max-w-[70ch] text-sm text-gray-500">
            Empowering gym owners to streamline operations, track memberships, and create exceptional experiences for
            every fitness journey.
          </p>
        </div>
      </div>
      <div className="flex flex-1 flex-col items-center">
        <div className="flex items-center justify-center gap-4">
          <Dumbbell size={30} />
          <h1 className="font-epilogue text-2xl tracking-widest text-black">Lift</h1>
        </div>
        <LoginForm />
      </div>
    </div>
  )
}
