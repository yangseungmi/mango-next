'use client'

import React, {useReducer, useState} from 'react';
import {Badge} from "@/components/ui/badge";
import {Button} from "@/components/ui/button";
import {Card} from "@/components/ui/card";
import {ScrollArea} from "@/components/ui/scroll-area";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import {Input} from "@/components/ui/input";
import {Textarea} from "@/components/ui/textarea";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import {ScrollAreaViewport} from "@radix-ui/react-scroll-area";
import {useRouter} from "next/navigation";
import {supabase} from "@/lib/supabase";
import {OrderStatus} from "@/lib/constants";
import {format} from "date-fns";
import {useAuth} from "@/context/AuthContext";

const App: React.FC = () => {
    const [currentPage, setCurrentPage] = useState<'list' | 'write'>('list');
    const [activeTab, setActiveTab] = useState<string>('history');
    const [selectedDateFilter, setSelectedDateFilter] = useState<string>('all');
    const [selectedMachineType, setSelectedMachineType] = useState<string>('all');
    const [sortOrder, setSortOrder] = useState<string>('latest');
    const router = useRouter();
    const {user, isLoading} = useAuth();


// Review writing form states
    const [reviewForm, setReviewForm] = useState({
        rating: 5,
        content: '',
        images: [] as string[],
        isPublic: true
    });
    const handleSubmitReview = (e: React.FormEvent) => {
        e.preventDefault();
// Here you would typically send the review data to your backend
        console.log('Review submitted:', reviewForm);
        setCurrentPage('list');
    };

    const changeTab = (tab: string) => {
        setActiveTab(tab);
    }
    const goBoard = () => {
        return router.push('/board');
    }

    const submitBoard = async () => {
        // supabase 저장

        const payload = {
            member_id: user?.id,
            order_id: state.orderId,
            title: state.title || null,  // 사용 중이면 포함
            description: reviewForm.content,
            rating: reviewForm.rating,
            photos: reviewForm.images.length > 0 ? reviewForm.images : null,
            // created_at은 기본값 now()가 자동 적용
        };

        const {data, error} = await supabase
            .from('board-info')
            .insert([
                {
                    machine_type: state.selectedMachines, // 배열 그대로 저장 (JSON 타입 필드 추천)
                    model_name: state.modelName,
                    photos: storageImageFiles, // images가 배열이면 Supabase 필드도 JSON이어야 함
                    visit_dt: state.selectedDate,
                    phone: state.phoneNumber,
                    address: `${state.address} ${state.detailAddress}`,
                    description: state.symptomDescription,
                    user_id: user?.id,
                    status: OrderStatus.RECEIVED,
                    created_at: format(new Date(), 'yy/MM/dd hh:mm aa')
                },
            ]);

        if (error) {
            console.error('❌ Supabase 저장 실패:', error.message);
        } else {
            console.log('✅ 저장 성공:');
            // 저장 후 초기화
            resetForm();
            localStorage.removeItem(ORDER_STORAGE_KEY);
            // 그리고 접수내역으로 이동
            return setActiveTab('history');
        }
    }

    return (
        <div className="flex flex-col min-h-screen bg-gray-50 w-[375px] mx-auto relative">
            <div className="flex flex-col w-[375px] min-h-[762px] bg-gray-50 relative pb-16">
                {/* Header */}
                <header className="fixed top-0 w-[375px] z-10 bg-white shadow-sm p-4 flex items-center">
                    <button
                        onClick={() => goBoard()}
                        className="mr-3 cursor-pointer bg-transparent border-none p-0"
                    >
                        <i className="fas fa-arrow-left text-gray-700"></i>
                    </button>
                    <h1 className="text-lg font-bold">수리 후기</h1>
                </header>
                {/* Main Content */}
                <div className="mt-[52px] px-4 pb-4">
                    <form onSubmit={handleSubmitReview} className="space-y-6 pt-4">
                        <div className="bg-white rounded-lg p-4 shadow-sm">
                            <h2 className="font-medium mb-3">데커 컨벡션 오븐 DKO-8B</h2>
                            <p className="text-sm text-gray-600">온도 센서 교체 및 컨트롤러 수리</p>
                            <p className="text-sm text-gray-500 mt-1">수리완료일: 2025-05-20</p>
                        </div>
                        <div className="bg-white rounded-lg p-4 shadow-sm">
                            <h3 className="font-medium mb-3">별점 평가</h3>
                            <div className="flex space-x-2">
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <button
                                        key={star}
                                        type="button"
                                        onClick={() => setReviewForm({...reviewForm, rating: star})}
                                        className="text-2xl focus:outline-none"
                                    >
                                        <i className={`${star <= reviewForm.rating ? 'fas' : 'far'} fa-star text-yellow-400`}></i>
                                    </button>
                                ))}
                            </div>
                        </div>
                        <div className="bg-white rounded-lg p-4 shadow-sm">
                            <h3 className="font-medium mb-3">후기 작성</h3>
                            <Textarea
                                placeholder="수리 서비스는 어떠셨나요? 상세한 후기는 다른 사장님들께 큰 도움이 됩니다."
                                className="min-h-[150px] resize-none"
                                value={reviewForm.content}
                                onChange={(e) => setReviewForm({...reviewForm, content: e.target.value})}
                            />
                        </div>
                        <div className="bg-white rounded-lg p-4 shadow-sm">
                            <h3 className="font-medium mb-3">사진 첨부</h3>
                            <div className="grid grid-cols-4 gap-2">
                                <button
                                    type="button"
                                    className="aspect-square rounded-lg border-2 border-dashed border-gray-300 flex items-center justify-center"
                                >
                                    <i className="fas fa-camera text-gray-400 text-xl"></i>
                                </button>
                            </div>
                            <p className="text-xs text-gray-500 mt-2">최대 4장까지 첨부 가능합니다.</p>
                        </div>
                        <div className="bg-white rounded-lg p-4 shadow-sm">
                            <div className="flex items-center justify-between">
                                <span className="font-medium">공개 설정</span>
                                <button
                                    type="button"
                                    onClick={() => setReviewForm({...reviewForm, isPublic: !reviewForm.isPublic})}
                                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none ${reviewForm.isPublic ? 'bg-blue-600' : 'bg-gray-200'}`}
                                >
                                    <span
                                        className={`inline-block h-5 w-5 transform rounded-full bg-white transition-transform ${reviewForm.isPublic ? 'translate-x-6' : 'translate-x-1'}`}
                                    />
                                </button>
                            </div>
                            <p className="text-xs text-gray-500 mt-2">
                                공개 설정시 다른 사장님들이 후기를 볼 수 있습니다.
                            </p>
                        </div>
                        <Button
                            type="submit"
                            onClick={submitBoard}
                            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4"
                        >
                            후기 등록하기
                        </Button>
                    </form>
                </div>
            </div>
        </div>
    );
};
export default App
