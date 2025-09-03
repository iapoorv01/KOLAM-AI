import { SignUpForm } from '@/components/site/auth-modal';
import Link from 'next/link';

export default function SignUpPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <SignUpForm />
      <div className="mt-4 text-center">
        <Link href="/signin" className="text-primary underline">Already have an account? Sign In</Link>
      </div>
    </div>
  );
}
