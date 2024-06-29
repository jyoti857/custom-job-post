import { useClerk } from "@clerk/nextjs";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function AdminNavbar(){
  const {user, signOut} = useClerk();
  const router = useRouter();
  return(
    <div>
      <div>
        <Link href='/admin' className='font-semibold items-center justify-between gap-2'>Admin Dashboard</Link>
      </div>
      <div className="space-x-2">
        <span className="fonr-semibold">
          {user?.primaryEmailAddress?.emailAddress}
        </span>
        <button
          onClick={async()=> {
            await signOut();
            router.push('/')
          }}
          className='underline'
        >Log out</button>
      </div>
    </div>
  )
}