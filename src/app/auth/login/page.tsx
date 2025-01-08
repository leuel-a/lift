// components
import { LoginForm } from './components/login-form';

export default function Page() {
  return (
    <main className="h-full flex items-center justify-center">
      <div className="w-[35rem]">
        <div className="mb-6 text-center space-y-1">
          <h4 className="text-2xl">Welcome Back.</h4>
          <p className='text-gray-400'>Please login with your credentials</p>
        </div>
        <LoginForm />
      </div>
    </main>
  );
}
