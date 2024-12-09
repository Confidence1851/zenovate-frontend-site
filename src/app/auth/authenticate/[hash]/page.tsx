'use client';
import { signIn } from 'next-auth/react';
import { useParams, useRouter } from 'next/navigation';
import { useEffect } from "react";
import toast from 'react-hot-toast'

export default function AuthenticatePage() {
  const params = useParams();
  const router = useRouter();


  useEffect(() => {
    handle();
  }, []);

  async function handle() {
    const hash = params?.hash ?? "";

    const result = await signIn('credentials', {
      hash,
      redirect: false
    })

    if (result?.error) {
      const errorData = JSON.parse(result.error)
      if (errorData?.message) {
        toast.error(errorData.message)
      } else {
        toast.error('An error occured')
      }
      return router.push("/");
    } else {
      return router.push('/dashboard/orders')
    }
  }


  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <>Redirecting</>
    </div>
  );
};

