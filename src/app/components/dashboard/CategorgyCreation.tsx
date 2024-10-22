'use client'

import React, { useState } from 'react'
import {useCreateCategory} from '@/app/hooks/useCategory';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import {Textarea} from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertCircle } from 'lucide-react';

const CategorgyCreation = () => {

    const [name, setName] = useState<string>('');
    const [description, setDescription] = useState('');

    const {create, error,loading} = useCreateCategory();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const data = create({name, description});
            console.log(data);
            //if categriy is created successfully then go to product creation page
        } catch (error: any) {
            console.log("category creation failed: ", error); // can show notification or some ui components
            return;
        }
    }

  return (
    <>
        <form onSubmit={handleSubmit}>
            <div className='flex flex-col space-y-2'>
                <Label htmlFor='name'>Category Name</Label>
                <Input
                type='text'
                id='name'
                placeholder='Enter category name'
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                />
            </div>
            <div className='flex flex-col space-y-2'>
                <Label htmlFor='description'>Category Description</Label>
                <Textarea 
                id='description'
                placeholder='Enter category description'
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                />
            </div>
            <Button
            type='submit'
            disabled={loading}
            >
                {loading ? " Creating..." :"Create Category"}
            </Button>
            {error && (
                <Alert variant="destructive" className='mt-4'>
                    <AlertCircle className="h-4 w-4" />
                    <AlertTitle>Error</AlertTitle>
                     <AlertDescription>{error}</AlertDescription>
                </Alert>
            )}
        </form>
    </>
  )
}

export default CategorgyCreation