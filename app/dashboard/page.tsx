'use client'

import React, {useEffect, useState} from 'react';
import {Button} from "@/components/ui/button";
import {Card, CardContent} from "@/components/ui/card";
import {ScrollArea} from "@/components/ui/scroll-area";
import {Badge} from "@/components/ui/badge";
import {useRouter, useSearchParams} from "next/navigation";
import {useAuth} from '@/context/AuthContext';
import Bottom from "@/app/common/components/Bottom";

const App = () => {
    const router = useRouter();
    const [activeTab, setActiveTab] = useState("home");

    const searchParams = useSearchParams();
    // const [user, setUser] = useState<any>(null);
    const {user, isLoading} = useAuth();

    // 베이커리 제품 데이터
    const bakeryProducts = [
        {
            id: 1,
            name: "데코르",
            image: "https://public.readdy.ai/ai/img_res/1949e6a615fce694e4eff683ccedabfd.jpg",
            description: "서울 종로구 종로2가 6"
        },
        {
            id: 2,
            name: "성심당",
            image: "https://public.readdy.ai/ai/img_res/b782c98edb509af16987f260c1fbafe5.jpg",
            description: "경기 성남시 분당구 삼평동 740"
        },
        {
            id: 3,
            name: "테라로사",
            image: "https://public.readdy.ai/ai/img_res/3b20a2115eae5ee9147f218634ffcc1c.jpg",
            description: "강원 강릉시 구정면 현천길 7"
        },
        {
            id: 4,
            name: "타르틴",
            image: "https://public.readdy.ai/ai/img_res/2dbc54990b3b00130957e9b9b4c3514c.jpg",
            description: "경기 성남시 분당구 삼평동 740"
        }
    ];

    // 기계 수리 후기 데이터
    const repairReviews = [
        {
            id: 1,
            machineName: "데커 컨벡션 오븐 DKO-8B",
            repairContent: "온도 센서 교체 및 컨트롤러 수리",
            date: "2025-04-03",
            rating: 5
        },
        {
            id: 2,
            machineName: "삼성 스파이럴 믹서 SM-200",
            repairContent: "모터 교체 및 벨트 조정",
            date: "2025-04-01",
            rating: 4
        },
        {
            id: 3,
            machineName: "LG 상업용 냉장고 LCR-450",
            repairContent: "냉매 충전 및 압축기 점검",
            date: "2025-03-28",
            rating: 5
        },
        {
            id: 4,
            machineName: "한국 반죽기 KDM-100",
            repairContent: "기어박스 수리 및 부품 교체",
            date: "2025-03-25",
            rating: 4
        }
    ];

    const changeTab = (tab: string) => {
        return router.push("/");
    }
    useEffect(() => {
        const from = searchParams.get('from');
        console.log('from', from)
        if (from === 'detail') {
            setActiveTab('history');
        }
    }, []);

    return (
        <div className="flex flex-col min-h-screen bg-gray-50 w-[375px] mx-auto relative">
            {/* 헤더 */}
            {/*<header className="fixed top-0 w-[375px] z-10 bg-white shadow-sm p-4 flex justify-between items-center">*/}
            {/*    <div className="flex items-center">*/}
            {/*        <h2 className="text-xl font-bold">접수 내역</h2>*/}
            {/*    </div>*/}
            {/*    <div className="flex items-center space-x-4">*/}
            {/*    <button className="relative cursor-pointer">*/}
            {/*            <i className="fas fa-bell text-gray-600"></i>*/}
            {/*            <span*/}
            {/*                className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">2</span>*/}
            {/*        </button>*/}
            {/*        <Avatar className="cursor-pointer">*/}
            {/*            <AvatarImage src="https://public.readdy.ai/ai/img_res/adddc094417f81d0805c8ab11ce3284c.jpg"/>*/}
            {/*            <AvatarFallback>김</AvatarFallback>*/}
            {/*        </Avatar>*/}
            {/*    </div>*/}
            {/*</header>*/}

            {/* 메인 콘텐츠 */}
            <main className="flex-1 pt-[60px] pb-16">
                <ScrollArea className="h-[calc(100vh-136px)]">
                    <div>
                        <div className="px-4 py-4">
                            <div className="mb-6">
                                <h2 className="text-xl font-bold mb-2">안녕하세요, 양승미 님!</h2>
                                <p className="text-gray-600">오늘도 맛있는 빵 만드시느라 고생 많으십니다.</p>
                            </div>

                            {/* 자주 찾는 서비스 */}
                            <div className="mb-6">
                                <h3 className="text-lg font-bold mb-3">자주 찾는 서비스</h3>
                                <div className="grid grid-cols-4 gap-3">
                                    {[
                                        {
                                            icon: "https://public.readdy.ai/ai/img_res/282a4747f2df7190efc1f10248a10531.jpg",
                                            name: "오븐"
                                        },
                                        {
                                            icon: "https://public.readdy.ai/ai/img_res/7fd0f93fd7e8f9fb5dc52a74554bbd59.jpg",
                                            name: "믹서"
                                        },
                                        {
                                            icon: "https://public.readdy.ai/ai/img_res/7dd4f1348b6f83afa6ab7dfd8ff64cd4.jpg",
                                            name: "발효기"
                                        },
                                        {
                                            icon: "https://public.readdy.ai/ai/img_res/9ebb56368fb658ea024cae411a9d77bf.jpg",
                                            name: "반죽기"
                                        }
                                    ].map((item, index) => (
                                        <div key={index} className="flex flex-col items-center cursor-pointer">
                                            <div
                                                className="w-16 h-16 rounded-full bg-white shadow-md flex items-center justify-center overflow-hidden mb-1">
                                                <img src={item.icon} alt={item.name}
                                                     className="w-12 h-12 object-contain"/>
                                            </div>
                                            <span
                                                className="text-xs text-center text-gray-700 whitespace-nowrap overflow-hidden text-overflow-ellipsis">{item.name}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* 빠른 수리 접수 버튼 */}
                            <div className="mb-8">
                                <Button
                                    className="w-full py-6 bg-blue-600 hover:bg-blue-700 text-white text-lg font-bold shadow-lg !rounded-button"
                                    onClick={() => setActiveTab("repair")}

                                >
                                    <i className="fas fa-tools mr-2"></i>
                                    수리 접수하기
                                </Button>
                            </div>
                            {/* 베이커리 사진 그리드 섹션 */}
                            <div className="mb-8">
                                <div className="flex justify-between items-center mb-4">
                                    <h3 className="text-lg font-bold">최근 수리 베이커리</h3>
                                    <Button variant="ghost"
                                            className="text-blue-600 text-sm p-0 h-auto cursor-pointer">
                                        더보기 <i className="fas fa-chevron-right ml-1 text-xs"></i>
                                    </Button>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    {bakeryProducts.map((product) => (
                                        <div key={product.id}
                                             className="bg-white rounded-lg overflow-hidden shadow-sm border border-gray-100 cursor-pointer hover:shadow-md transition-shadow">
                                            <div className="w-full aspect-square overflow-hidden">
                                                <img
                                                    src={product.image}
                                                    alt={product.name}
                                                    className="w-full h-full object-cover object-top"
                                                />
                                            </div>
                                            <div className="p-3">
                                                <h4 className="font-medium text-gray-900">{product.name}</h4>
                                                <p className="text-xs text-gray-500 mt-1">{product.description}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* 기계 수리 후기 게시판 섹션 */}
                            <div className="mb-8">
                                <div className="flex justify-between items-center mb-4">
                                    <h3 className="text-lg font-bold">기계 수리 후기</h3>
                                    <Button variant="ghost"
                                            className="text-blue-600 text-sm p-0 h-auto cursor-pointer"
                                    >
                                        더보기 <i className="fas fa-chevron-right ml-1 text-xs"></i>
                                    </Button>
                                </div>

                                <Card className="border border-gray-200 shadow-sm">
                                    <CardContent className="p-0">
                                        <div className="divide-y divide-gray-200">
                                            {repairReviews.map((review) => (
                                                <div key={review.id}
                                                     className="p-4 hover:bg-gray-50 cursor-pointer transition-colors">
                                                    <div className="flex justify-between items-start">
                                                        <div>
                                                            <h4 className="font-medium text-gray-900">{review.machineName}</h4>
                                                            <p className="text-sm text-gray-600 mt-1">{review.repairContent}</p>
                                                            <div className="flex items-center mt-2">
                                                                {[...Array(review.rating)].map((_, i) => (
                                                                    <i key={i}
                                                                       className="fas fa-star text-yellow-400 text-xs mr-0.5"></i>
                                                                ))}
                                                                {[...Array(5 - review.rating)].map((_, i) => (
                                                                    <i key={i}
                                                                       className="far fa-star text-yellow-400 text-xs mr-0.5"></i>
                                                                ))}
                                                            </div>
                                                        </div>
                                                        <div className="flex flex-col items-end">
                                                                <span
                                                                    className="text-xs text-gray-500">{review.date}</span>
                                                            <Badge variant="outline"
                                                                   className="mt-2 bg-blue-50 text-blue-700 border-blue-200">
                                                                완료
                                                            </Badge>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>

                        </div>
                    </div>
                </ScrollArea>
            </main>
            {/* 하단 탭 바 */}
            <Bottom activeTab={activeTab} onTabChange={changeTab}/>
        </div>
    );
};

export default App;

