'use client'

import React from 'react'
import { useRouter } from 'next/navigation'
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'

interface LoginRequiredDialogProps {
    isOpen: boolean
    onClose: () => void
}

export default function LoginRequiredDialog({ isOpen, onClose }: LoginRequiredDialogProps) {
    const router = useRouter()

    const goToLogin = () => {
        onClose();
        router.push('/login')
    }

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>로그인이 필요합니다</DialogTitle>
                    <DialogDescription>
                        이 기능을 이용하시려면 로그인해야 합니다.
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter className="flex justify-end gap-2">
                    <DialogClose asChild>
                        <Button variant="outline">닫기</Button>
                    </DialogClose>
                    <Button onClick={goToLogin}>로그인하기</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
