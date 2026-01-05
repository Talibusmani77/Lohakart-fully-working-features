import { useState, useEffect } from 'react';
import { AdminLayout } from '@/components/AdminLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { MessageSquare, Mail, Trash2, CheckCircle, Clock } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { format } from 'date-fns';
import { toast } from 'sonner';

interface ContactMessage {
    id: string;
    created_at: string;
    name: string;
    email: string;
    message: string;
    is_read: boolean;
}

export default function AdminMessages() {
    const [messages, setMessages] = useState<ContactMessage[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchMessages();
    }, []);

    const fetchMessages = async () => {
        try {
            const { data, error } = await supabase
                .from('contact_messages')
                .select('*')
                .order('created_at', { ascending: false });

            if (error) throw error;
            // @ts-ignore
            setMessages(data || []);

            // Mark all fetched messages as read
            // @ts-ignore
            const unreadIds = data?.filter(m => !m.is_read).map(m => m.id) || [];
            if (unreadIds.length > 0) {
                await supabase
                    .from('contact_messages')
                    // @ts-ignore
                    .update({ is_read: true })
                    .in('id', unreadIds);
            }
        } catch (error) {
            console.error('Error fetching messages:', error);
            toast.error('Failed to load messages');
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to delete this message?')) return;

        try {
            const { error } = await supabase
                .from('contact_messages')
                .delete()
                .eq('id', id);

            if (error) throw error;
            setMessages(prev => prev.filter(m => m.id !== id));
            toast.success('Message deleted');
        } catch (error) {
            console.error('Delete error:', error);
            toast.error('Failed to delete message');
        }
    };

    return (
        <AdminLayout>
            <div className="p-8 space-y-8">
                <div className="flex justify-between items-center">
                    <div>
                        <h1 className="text-3xl font-bold flex items-center gap-3">
                            <MessageSquare className="w-8 h-8 text-primary" />
                            Contact Messages
                        </h1>
                        <p className="text-muted-foreground mt-1">Manage user inquiries from the Contact Us page</p>
                    </div>
                </div>

                <Card className="border-none shadow-sm overflow-hidden rounded-2xl">
                    <CardHeader className="bg-white border-b">
                        <CardTitle>Inquiries</CardTitle>
                    </CardHeader>
                    <CardContent className="p-0">
                        {loading ? (
                            <div className="p-8 text-center text-muted-foreground animate-pulse">Loading messages...</div>
                        ) : messages.length === 0 ? (
                            <div className="p-12 text-center text-muted-foreground">No messages yet.</div>
                        ) : (
                            <Table>
                                <TableHeader>
                                    <TableRow className="bg-slate-50">
                                        <TableHead className="w-[200px]">Date</TableHead>
                                        <TableHead>Sender</TableHead>
                                        <TableHead>Message</TableHead>
                                        <TableHead className="text-right">Actions</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {messages.map((msg) => (
                                        <TableRow key={msg.id} className="hover:bg-slate-50/50 transition-colors">
                                            <TableCell className="text-sm">
                                                <div className="flex items-center gap-2 text-slate-500">
                                                    <Clock className="w-3 h-3" />
                                                    {format(new Date(msg.created_at), 'MMM dd, yyyy HH:mm')}
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                <div className="font-medium">{msg.name}</div>
                                                <div className="text-xs text-slate-500 flex items-center gap-1">
                                                    <Mail className="w-3 h-3" /> {msg.email}
                                                </div>
                                            </TableCell>
                                            <TableCell className="max-w-md">
                                                <p className="text-sm line-clamp-2 text-slate-600 italic">
                                                    "{msg.message}"
                                                </p>
                                            </TableCell>
                                            <TableCell className="text-right pt-4">
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    className="h-8 w-8 text-red-500 hover:text-red-600 hover:bg-red-50"
                                                    onClick={() => handleDelete(msg.id)}
                                                >
                                                    <Trash2 className="h-4 w-4" />
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        )}
                    </CardContent>
                </Card>
            </div>
        </AdminLayout>
    );
}
