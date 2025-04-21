'use client'

import {useEffect} from 'react'
import {useRouter} from 'next/navigation'
import {supabase} from '@/lib/supabase'

export default function AuthCallbackPage() {
    const router = useRouter();

    useEffect(() => {
        const afterLogin = async () => {
            const {data: {user}, error} = await supabase.auth.getUser();

            if (!user || error) {
                console.error('❌ 로그인 실패', error?.message);
                return router.replace('/login');
            }

            const {id, email, user_metadata} = user;
            const {full_name, avatar_url} = user_metadata ?? {};

            const {error: upsertError} = await supabase
                .from('member-info')
                .upsert([
                    {
                        id,
                        email,
                        name: full_name ?? '',
                        avatar_url: avatar_url ?? '',
                        last_login_at: new Date().toISOString()
                    }
                ], {
                    onConflict: 'id'
                });

            if (upsertError) {
                console.error('❌ 회원 정보 저장 실패', upsertError.message);
                return router.replace('/login');
            }

            console.log('✅ 로그인 및 회원정보 저장 완료');
            router.replace('/') // 로그인 후 이동할 위치
        }

        afterLogin();
    }, [])

    return (
        <>
            <div className="flex justify-center items-center min-h-screen bg-white">
                <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"/>
            </div>
        </>
    );
}
