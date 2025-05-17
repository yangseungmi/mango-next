'use client';

import {createContext, ReactNode, useContext, useEffect, useState} from 'react';
import {User} from '@supabase/supabase-js';
import {supabase} from "@/lib/supabase";

type AuthContextType = {
    user: User | null;
    isLoading: boolean;
};

const AuthContext = createContext<AuthContextType>({
    user: null,
    isLoading: true,
});

export const AuthProvider = ({children}: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const getUser = async () => {
            const {data} = await supabase.auth.getUser();
            setUser(data.user ?? null);
            setIsLoading(false);
        };

        getUser();

        const {data: listener} = supabase.auth.onAuthStateChange(async (_event, session) => {
            if (session?.user) {
                const {data, error} = await supabase
                    .from('member-info')
                    .select('*')
                    .eq('id', session.user.id)
                    .single();
                setUser(data); // member-info의 데이터로 저장
            } else {
                setUser(null);
            }
        });

        return () => {
            listener.subscription.unsubscribe();
        };
    }, []);

    return (
        <AuthContext.Provider value={{user, isLoading}}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
