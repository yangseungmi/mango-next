'use client'

import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
// import { deleteCookie } from 'cookies-next' // 또는 localStorage 사용 시 localStorage.removeItem()

const useLogout = () => {
    const router = useRouter()

    const logout = () => {
        // 1. Google Identity 세션 해제
        // if (typeof window !== 'undefined' && window.google?.accounts?.id) {
        //     window.google.accounts.id.disableAutoSelect()
        // }
        //
        // // 2. 쿠키/스토리지 정리
        // deleteCookie('accessToken') // 또는 localStorage.removeItem('accessToken')

        // 3. 리다이렉트
        router.push('/login')
    }

    return logout
}

export default useLogout
