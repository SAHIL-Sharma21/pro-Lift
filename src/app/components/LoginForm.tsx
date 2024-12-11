'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { AlertCircle, Eye, EyeOff, Loader2 } from 'lucide-react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useAuth } from '@/app/hooks/useAuth'
import { useCart } from '@/app/hooks/useCart'
import { useToast } from '@/hooks/use-toast'
import GoogleLoginButton from './GoogleLoginButton'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'

const LoginForm = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)

  const { login, loading, error } = useAuth()
  const router = useRouter()
  const { cart } = useCart()
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await login({ email, password })
      toast({
        title: 'Login Successful',
        description: 'You are now logged in',
        variant: 'default',
      })
      if (cart && cart.items.length > 0) {
        router.push('/checkout')
      } else {
        router.push('/products')
      }
    } catch (error: any) {
      toast({
        title: 'Login Failed',
        description: error.message || 'There was an error logging in. Please try again.',
        variant: 'destructive',
      })
    }
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Login to Your Account</CardTitle>
        <CardDescription>Enter your credentials to access your account</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? 'text' : 'password'}
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <Eye className="h-4 w-4" />
                ) : (
                  <EyeOff className="h-4 w-4" />
                )}
                <span className="sr-only">
                  {showPassword ? 'Hide password' : 'Show password'}
                </span>
              </Button>
            </div>
          </div>
          <Button className="w-full" type="submit" disabled={loading}>
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Logging In...
              </>
            ) : (
              'Log In'
            )}
          </Button>
          {error && (
            <Alert variant="destructive" className='mt-4'>
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Error:</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
        </form>
      </CardContent>
      <CardFooter className="flex flex-col space-y-4">
        <GoogleLoginButton />
        <p className="text-sm text-center">
          Don&apos;t have an account?{' '}
          <Link href="/auth/register" className="text-primary hover:underline">
            Sign up
          </Link>
        </p>
      </CardFooter>
    </Card>
  )
}

export default LoginForm

