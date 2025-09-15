
import { SignUpForm } from '@/components/site/auth-modal';
import Link from 'next/link';

export default function SignUpPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/10 via-background to-secondary/10">
      <div className="w-full max-w-lg mx-auto">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-extrabold text-primary drop-shadow-lg mb-2">Join Kolam AI Today!</h1>
          <p className="text-lg text-muted-foreground">Create your account to start designing, sharing, and exploring Kolam patterns.</p>
        </div>
        <SignUpForm />
        <div className="mt-6 text-center">
          <span className="text-muted-foreground">Already have an account?</span>
          <Link href="/signin" className="ml-2 text-gray-800 drop-shadow-sm font-semibold underline hover:text-secondary transition">Sign In</Link>
        </div>
      </div>
    </div>
  );
}