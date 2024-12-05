import Contributions from './contributions'
import Form from 'next/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const { user } = await searchParams

  // check if user is empty
  // check if user is exist

  return (
    <div className="w-1/2 mx-auto mt-8">
      <Form action="/" className="flex gap-4 items-center mb-8">
        {/* On submission, the input value will be appended to 
          the URL, e.g. /search?query=abc */}
        <Input name="user" required placeholder="username" />
        <Button type="submit">Check</Button>
      </Form>

      {user && <Contributions username={user as string} />}
    </div>
  )
}
