import { supabase } from '@/lib/supabase';

export const checkIsLoggedIn = async (): Promise<boolean> => {
    const { data: { session } } = await supabase.auth.getSession();
    return !!session;
};
