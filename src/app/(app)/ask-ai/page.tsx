'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { adviseStudent } from '@/ai/flows/student-advisor';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Loader2, Sparkles, User } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const formSchema = z.object({
  query: z.string().min(10, 'Please enter a question with at least 10 characters.'),
});

interface ChatMessage {
  role: 'user' | 'model';
  content: string;
}

export default function AskAiPage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      query: '',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true);
    setError(null);
    
    // Add user message to chat history
    setChatHistory(prev => [...prev, { role: 'user', content: values.query }]);

    const response = await adviseStudent({ query: values.query });

    if (response) {
      // Add model response to chat history
      setChatHistory(prev => [...prev, { role: 'model', content: response }]);
      form.reset();
    } else {
      setError('An unknown error occurred.');
    }

    setLoading(false);
  }

  return (
    <div className="max-w-3xl mx-auto flex flex-col h-[calc(100vh-10rem)]">
      <div className="flex-grow overflow-y-auto space-y-6 p-4">
        {chatHistory.length === 0 ? (
           <Card className="mt-8 bg-primary/5">
                <CardHeader>
                    <CardTitle className="text-xl font-headline text-primary flex items-center gap-2">
                        <Sparkles/>
                        Ask Your AI Advisor
                    </CardTitle>
                    <CardDescription>
                        Have a question about colleges, courses, or important dates? Ask Disha, your personal AI career guide.
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-2 text-sm text-muted-foreground">
                    <p className="font-semibold">Here are a few examples to get you started:</p>
                    <ul className="list-disc list-inside">
                        <li>"Find engineering colleges in Bangalore."</li>
                        <li>"What are the career options after a B.Com degree?"</li>
                        <li>"When is the last date to apply for the INSPIRE scholarship?"</li>
                        <li>"Tell me about St. Joseph's College in Bangalore."</li>
                    </ul>
                </CardContent>
            </Card>
        ) : (
            chatHistory.map((message, index) => (
            <div key={index} className={`flex items-start gap-4 ${message.role === 'user' ? 'justify-end' : ''}`}>
                {message.role === 'model' && (
                    <Avatar className="w-8 h-8 border">
                        <AvatarImage src="/logo.svg" alt="AI Advisor" />
                        <AvatarFallback><Sparkles size={16}/></AvatarFallback>
                    </Avatar>
                )}
                <div className={`max-w-lg p-3 rounded-lg ${message.role === 'user' ? 'bg-primary text-primary-foreground' : 'bg-muted'}`}>
                     <p className="whitespace-pre-wrap">{message.content}</p>
                </div>
                 {message.role === 'user' && (
                    <Avatar className="w-8 h-8">
                        <AvatarFallback><User size={16}/></AvatarFallback>
                    </Avatar>
                )}
            </div>
            ))
        )}
         {loading && (
          <div className="flex items-start gap-4">
             <Avatar className="w-8 h-8 border">
                <AvatarImage src="/logo.svg" alt="AI Advisor" />
                <AvatarFallback><Sparkles size={16}/></AvatarFallback>
            </Avatar>
            <div className="max-w-lg p-3 rounded-lg bg-muted flex items-center">
               <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Thinking...
            </div>
          </div>
        )}
        {error && <p className="text-destructive">{error}</p>}
      </div>

      <div className="sticky bottom-0 bg-background pt-4 pb-2">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="flex items-start gap-2">
            <FormField
              control={form.control}
              name="query"
              render={({ field }) => (
                <FormItem className="flex-grow">
                  <FormControl>
                    <Input placeholder="e.g., Find computer science colleges in Raipur..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" disabled={loading}>
              {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Ask'}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}
