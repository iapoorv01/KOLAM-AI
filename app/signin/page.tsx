
import { SignInForm } from '@/components/site/auth-modal';
import Link from 'next/link';

export default function SignInPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/10 via-background to-secondary/10">
      <div className="w-full max-w-lg mx-auto">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-extrabold text-primary drop-shadow-lg mb-2">Welcome Back to Kolam AI!</h1>
          <p className="text-lg text-muted-foreground">Sign in to explore, create, and share beautiful Kolam patterns.</p>
        </div>
        <SignInForm />
        <div className="mt-6 text-center">
          <span className="text-muted-foreground">Don&#39;t have an account?</span>
          <Link href="/signup" className="ml-2 text-primary font-semibold underline hover:text-secondary transition">Sign Up</Link>
        </div>
      </div>
    </div>
  );
}