'use client';

import React, {useEffect, useState} from 'react';
import {useAuth} from '@/context/AuthContext';
import {Button} from "@/components/ui/button";
import {supabase} from "@/lib/supabase";
import {useRouter, useSearchParams} from "next/navigation";
import {ScrollArea} from "@/components/ui/scroll-area";
import {Card, CardContent} from "@/components/ui/card";
import {Progress} from "@/components/ui/progress";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";

interface EstimateItem {
    id: number;
    name: string;
    price: number;
}

const RepairDetail = () => {
    const {user, isLoading} = useAuth();
    const searchParams = useSearchParams();
    const orderId = searchParams.get('id');
    const router = useRouter();

    const [messageText, setMessageText] = useState("");
    const [createdAt, setCreatedAt] = useState("");
    const [modelName, setModelName] = useState("");
    const [description, setDescription] = useState("123");
    const [photos, setPhotos] = useState<File[]>([]);
    const storage_img_url = process.env.NEXT_PUBLIC_SUPABASE_STORAGE_IMAGE_URL!

    const [estimateItems, setEstimateItems] = useState<EstimateItem[]>([
        {id: 0, name: '', price: 0},
    ]);

    useEffect(() => {
        fetchOrders();
        fetchInvoice();
    }, []);

    const fetchOrders = async () => {

        const {data: {user}} = await supabase.auth.getUser();
        if (!user) return;

        const {data, error} = await supabase
            .from('order-info')
            .select('*')
            .eq('id', Number(orderId))
            .eq('user_id', user.id)
            .order('created_at', {ascending: false});

        if (error) {
            console.error('❌ 주문 조회 실패', error.message);
        } else if (!data) {
            console.error('❌ 주문 조회 실패');
        } else {
            console.log('detail data', data[0]);
            const order = data[0];
            setCreatedAt(order.created_at);
            setModelName(order.model_name);
            setDescription(order.description);
            setPhotos(order.photos);
        }
    }
    const fetchInvoice = async () => {

        const {data, error} = await supabase
            .from('invoice-info')
            .select('*')
            .eq('order_id', Number(orderId))
            .order('created_at', {ascending: false});

        if (error) {
            console.error('❌ 주문 조회 실패', error.message);
        } else if (!data) {
            console.error('❌ 주문 조회 실패');
        } else {
            setEstimateItems(data);
        }
    }
    const [selectedDate, setSelectedDate] = useState('2025-05-13');

    const total = estimateItems.reduce((sum, item) => sum + item.price, 0);

    const handleAddItem = () => {
        setEstimateItems([...estimateItems, {id: 0, name: '', price: 0}]);
    };

    const handleUpdateItem = (index: number, field: keyof EstimateItem, value: string) => {
        const updated = [...estimateItems];
        updated[index][field] = field === 'price' ? parseInt(value) || 0 : value;
        setEstimateItems(updated);
    };

    const handleRemoveItem = (index: number) => {
        const updated = [...estimateItems];
        updated.splice(index, 1);
        setEstimateItems(updated);
    };
    const goHistory = () => {
        return router.push('/?from=detail');
    }

    const repairDetails = {
        machine: {
            name: "데커 컨벡션 오븐 DKO-8B",
            serialNumber: "DKO8B-2023-78945",
            image: "https://public.readdy.ai/ai/img_res/4a00160f252d7b51cfefe9e0d1f496ef.jpg"
        },
        receipt: {
            date: "2025-04-01",
            number: "REP-20250401-001",
            status: "진행중"
        },
        issue: {
            description: "오븐 온도가 설정값보다 20도 이상 높게 올라가는 문제가 있습니다. 온도 조절 노브는 정상적으로 작동하지만 실제 온도가 맞지 않아 제품이 타는 경우가 발생합니다. 또한 타이머 알람이 울리지 않는 문제도 있습니다.",
            photos: [
                "https://public.readdy.ai/ai/img_res/e129f8328aa834ce397ae42b7ff42711.jpg",
                "https://public.readdy.ai/ai/img_res/24271c536393dc4ea953b6c0155d310f.jpg",
                "https://public.readdy.ai/ai/img_res/e1fea79372905409e85c61cf401346f1.jpg"
            ]
        },
        technician: {
            name: "배믿음 매니저",
            specialty: "오븐 / 발효기 전문",
            experience: "10년",
            image: "https://public.readdy.ai/ai/img_res/a20ed9d1a59a883d5f8d0ae951405b8b.jpg"
        },
        estimate: {
            total: "185,000원",
            items: [
                {name: "온도 센서 교체", price: "85,000원"},
                {name: "컨트롤러 수리", price: "65,000원"},
                {name: "출장비", price: "35,000원"}
            ],
            expectedCompletionDate: "2025-04-08"
        },
    };

    return (
        <div className="flex flex-col min-h-screen bg-gray-50 w-[375px] mx-auto relative">
            {/* 헤더 */}
            <header className="fixed top-0 w-[375px] z-10 bg-blue-600 shadow-sm p-4 flex items-center">
                <button
                    onClick={() => goHistory()}
                    className="mr-3 cursor-pointer bg-transparent border-none p-0"
                >
                    <i className="fas fa-arrow-left text-white"></i>
                </button>
                <h1 className="text-lg text-white font-bold">수리 접수 상세</h1>
            </header>

            {/* 메인 콘텐츠 */}
            <main className="flex-1 pt-[72px] pb-16">
                <ScrollArea className="h-[calc(100vh-136px)]">
                    <div className="px-4 py-3">
                        {/* 회원 정보 카드 */}
                        <Card className="mb-4 border border-gray-200 shadow-sm overflow-hidden py-0">
                            <CardContent className="p-4">
                                <div className="p-2 mb-2">
                                    <div className="flex items-center">
                                        <div
                                            className="w-10 h-10 bg-secondary bg-opacity-10 rounded-full flex items-center justify-center mr-3">
                                            <i className="ri-user-line ri-lg text-secondary"></i>
                                        </div>
                                        <div>
                                            <h3 className="font-medium">박단팥</h3>
                                            <p className="text-sm text-gray-500">010-9876-5432</p>
                                        </div>
                                    </div>
                                    <button className="w-8 h-8 flex items-center justify-center text-gray-400">
                                        <i className="ri-phone-line ri-lg"></i>
                                    </button>
                                </div>
                                <div className="grid grid-cols-3 gap-4 text-sm">
                                    <div>
                                        <p className="text-gray-500">회원등급</p>
                                        <p className="font-medium">VIP</p>
                                    </div>
                                    <div>
                                        <p className="text-gray-500">누적 수리</p>
                                        <p className="font-medium">12건</p>
                                    </div>
                                    <div>
                                        <p className="text-gray-500">최근 수리</p>
                                        <p className="font-medium">2025.03.15</p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* 기계 정보 카드 */}
                        <Card className="mb-4 border border-gray-200 shadow-sm overflow-hidden py-0">
                            <CardContent className="p-4">
                                <div className="p-2 mb-2">
                                    <div className="flex justify-between text-xs text-gray-500 mb-2">
                                        <span>접수</span>
                                        <span>전화 예정</span>
                                        <span>방문 확정</span>
                                        <span>수리 완료</span>
                                    </div>
                                    <Progress value={31} className="h-2"/>
                                </div>

                                <div className="flex items-center">
                                    <div
                                        className="w-[80px] h-[80px] rounded-lg overflow-hidden mr-4 bg-white flex items-center justify-center">
                                        <img
                                            src={repairDetails.machine.image}
                                            alt={repairDetails.machine.name}
                                            className="w-full h-full object-contain"
                                        />
                                    </div>
                                    <div className="flex-1">
                                        <h2 className="font-bold text-lg text-gray-900">{modelName}</h2>
                                        <div className="gap-3 py-1">
                                            <div>
                                                <p className="text-xs text-gray-500">시리얼 번호</p>
                                                <p className="text-sm text-gray-700">{repairDetails.machine.serialNumber}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* 접수 정보 카드 */}
                        <Card className="mb-4 border border-gray-200 shadow-sm py-0">
                            <CardContent className="p-4">
                                <h3 className="font-bold text-md mb-3">접수 정보</h3>
                                <div className="grid grid-cols-2 gap-3">
                                    <div>
                                        <p className="text-xs text-gray-500">접수일</p>
                                        <p className="text-sm font-medium">{createdAt}</p>
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-500">접수번호</p>
                                        <p className="text-sm font-medium">{repairDetails.receipt.number}</p>
                                    </div>
                                </div>
                                <div className="pt-2">
                                    <p className="text-xs text-gray-500 pb-1">첨부 사진</p>
                                    <div className="grid grid-cols-3 gap-2">
                                        {photos.map((photo, index) => (
                                            <div key={index}
                                                 className="aspect-square rounded-lg overflow-hidden border border-gray-200">
                                                <img
                                                    src={`${storage_img_url}/${photo}`}
                                                    alt={`첨부 사진 ${index + 1}`}
                                                    className="w-full h-full object-cover"
                                                />
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* 고장 증상 */}
                        <Card className="mb-4 border border-gray-200 shadow-sm py-0">
                            <CardContent className="p-4">
                                <h3 className="font-bold text-md mb-2">고장 증상</h3>
                                <p className="text-sm text-gray-700 leading-relaxed">
                                    {description}
                                </p>
                            </CardContent>
                        </Card>

                        {/* 견적 정보 */}
                        <Card className="mb-4 border border-gray-200 shadow-sm py-0">
                            <CardContent className="p-4">
                                <h3 className="font-bold text-md mb-3">예상 견적</h3>
                                <div className="border-b pb-2 mb-2">
                                    {!!estimateItems &&
                                        estimateItems.map((item, idx) => (
                                            <div className="flex items-center gap-2 mb-2" key={idx}>
                                                <div className="relative ">
                                                <input
                                                    type="text"
                                                    value={item.name}
                                                    onChange={(e) => handleUpdateItem(idx, 'name', e.target.value)}
                                                    className=" border-none bg-gray-50 rounded p-2 text-sm"
                                                />
                                                </div>
                                                <div className="relative w-25">
                                                    <input
                                                        type="number"
                                                        value={item.price}
                                                        onChange={(e) => handleUpdateItem(idx, 'price', e.target.value)}
                                                        className="w-full border-none bg-gray-50 rounded p-2 text-sm text-right pr-8"
                                                    />
                                                    <span className="absolute right-2 top-1/2 -translate-y-1/2 text-sm text-gray-500">원</span>
                                                </div>
                                                <div className="relative w-6">
                                                    <button
                                                        className="text-gray-400 hover:text-red-500"
                                                    >
                                                        <i className="fas fa-trash"></i>
                                                    </button>
                                                </div>
                                            </div>
                                        ))
                                    }
                                    <div className="cursor-pointer text-blue-500 text-sm" onClick={handleAddItem}>
                                        + 항목 추가
                                    </div>
                                </div>
                                <div className="flex justify-between items-center bg-gray-50 p-3 rounded">
                                    <span className="font-bold">총 견적 금액</span>
                                    <span className="font-bold text-lg">{total.toLocaleString()}원</span>
                                </div>
                            </CardContent>
                        </Card>

                        {/* 기술자 정보 */}
                        <Card className="border border-gray-200 shadow-sm py-0">
                            <CardContent className="p-4">
                                <h3 className="font-bold text-md mb-3">담당 기술자</h3>
                                <div className="flex items-center">
                                    <Avatar className="h-14 w-14 mr-4">
                                        <AvatarImage src={repairDetails.technician.image}
                                                     alt={repairDetails.technician.name}/>
                                        <AvatarFallback>박</AvatarFallback>
                                    </Avatar>
                                    <div>
                                        <div className="flex items-center">
                                            <h4 className="font-medium text-gray-900 mr-2">{repairDetails.technician.name}</h4>
                                            <div className="flex items-center">
                                                {/*<i className="fas fa-star text-yellow-400 text-xs"></i>*/}
                                                {/*<span className="text-xs ml-1">{repairDetails.technician.rating}</span>*/}
                                            </div>
                                        </div>
                                        <p className="text-sm text-gray-600">{repairDetails.technician.specialty}</p>
                                        <p className="text-xs text-gray-500">경력 {repairDetails.technician.experience}</p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </ScrollArea>
            </main>

            {/* 하단 버튼 영역 */}
            <div className="fixed bottom-0 w-[375px] bg-white border-t border-gray-200 p-4 flex space-x-3">
                <Button variant="outline"
                        className="flex-1 border-red-500 text-red-500 hover:bg-red-50 hover:text-red-600 !rounded-button"
                >
                    고객에게 전화
                </Button>
                <Button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white !rounded-button">
                    견적서 저장
                </Button>
            </div>
        </div>
    );
};

export default RepairDetail;

