import React from 'react'
import { Button } from './ui/button'
import Link from 'next/link'


const Login = () => {
  return (
    <Button asChild>
      <Link href="/login">Login</Link>
    </Button>
  )
}

export default Login