'use client'

import React, {useState} from 'react';
import {Badge} from "@/components/ui/badge";
import {Button} from "@/components/ui/button";
import {Card} from "@/components/ui/card";
import {ScrollArea} from "@/components/ui/scroll-area";
import {Select} from "@/components/ui/select";
import {Textarea} from "@/components/ui/textarea";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import {useRouter} from "next/navigation";

const App: React.FC = () => {
    const [currentPage, setCurrentPage] = useState<'list' | 'write'>('list');
    const [activeTab, setActiveTab] = useState<string>('history');
    const [selectedDateFilter, setSelectedDateFilter] = useState<string>('all');
    const [selectedMachineType, setSelectedMachineType] = useState<string>('all');
    const [sortOrder, setSortOrder] = useState<string>('latest');
    const router = useRouter();
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
    const dateFilters = [
        {id: 'month1', label: '1개월'},
        {id: 'month3', label: '3개월'},
        {id: 'month6', label: '6개월'},
        {id: 'all', label: '전체'},
    ];
    const machineTypes = [
        {id: 'all', label: '전체'},
        {id: 'oven', label: '오븐'},
        {id: 'mixer', label: '믹서'},
        {id: 'refrigerator', label: '냉장고'},
        {id: 'kneader', label: '반죽기'},
        {id: 'proofer', label: '발효기'},
    ];
    const repairReviews = [
        {
            id: 1,
            machineName: '데커 컨벡션 오븐 DKO-8B',
            repairDetails: '온도 센서 교체 및 컨트롤러 수리',
            date: '2025-05-20',
            rating: 5,
            status: '완료',
            type: 'oven',
        },
        {
            id: 2,
            machineName: '삼성 스파이럴 믹서 SM-200',
            repairDetails: '모터 교체 및 벨트 조정',
            date: '2025-05-15',
            rating: 4,
            status: '완료',
            type: 'mixer',
        },
        {
            id: 3,
            machineName: 'LG 상업용 냉장고 LCR-450',
            repairDetails: '냉매 충전 및 압축기 점검',
            date: '2025-05-10',
            rating: 5,
            status: '완료',
            type: 'refrigerator',
        },
        {
            id: 4,
            machineName: '한국 반죽기 KDM-100',
            repairDetails: '기어박스 수리 및 부품 교체',
            date: '2025-05-05',
            rating: 4,
            status: '완료',
            type: 'kneader',
        },
        {
            id: 5,
            machineName: '윈코 발효기 WP-20',
            repairDetails: '온도 조절 장치 수리 및 센서 교체',
            date: '2025-04-28',
            rating: 5,
            status: '완료',
            type: 'proofer',
        },
        {
            id: 6,
            machineName: '라치오 데크 오븐 RDO-3',
            repairDetails: '히팅 엘리먼트 교체 및 전기 시스템 점검',
            date: '2025-04-22',
            rating: 3,
            status: '완료',
            type: 'oven',
        },
        {
            id: 7,
            machineName: '대영 버티컬 믹서 DVM-40',
            repairDetails: '회전축 베어링 교체 및 모터 점검',
            date: '2025-04-15',
            rating: 4,
            status: '완료',
            type: 'mixer',
        },
        {
            id: 8,
            machineName: '하이트 냉동 쇼케이스 HFC-300',
            repairDetails: '냉각 시스템 수리 및 팬 모터 교체',
            date: '2025-04-08',
            rating: 5,
            status: '완료',
            type: 'refrigerator',
        },
        {
            id: 9,
            machineName: '성진 반죽기 SJK-50',
            repairDetails: '믹싱 암 교체 및 속도 조절기 수리',
            date: '2025-04-01',
            rating: 4,
            status: '완료',
            type: 'kneader',
        },
        {
            id: 10,
            machineName: '데커 컨벡션 오븐 DKO-10C',
            repairDetails: '디지털 패널 교체 및 도어 힌지 수리',
            date: '2025-03-25',
            rating: 5,
            status: '완료',
            type: 'oven',
        },
        {
            id: 11,
            machineName: '삼성 냉장 쇼케이스 SSC-500',
            repairDetails: '냉각 가스 주입 및 도어 실링 교체',
            date: '2025-03-18',
            rating: 4,
            status: '완료',
            type: 'refrigerator',
        },
        {
            id: 12,
            machineName: '대성 발효기 DSF-100',
            repairDetails: '습도 조절 장치 수리 및 전자 제어 보드 교체',
            date: '2025-03-10',
            rating: 5,
            status: '완료',
            type: 'proofer',
        },
    ];
// Filter and sort reviews
    const filteredReviews = repairReviews.filter(review => {
// Filter by machine type
        if (selectedMachineType !== 'all' && review.type !== selectedMachineType) {
            return false;
        }
// Filter by date
        if (selectedDateFilter !== 'all') {
            const reviewDate = new Date(review.date);
            const today = new Date();
            let monthsAgo;
            switch (selectedDateFilter) {
                case 'month1':
                    monthsAgo = 1;
                    break;
                case 'month3':
                    monthsAgo = 3;
                    break;
                case 'month6':
                    monthsAgo = 6;
                    break;
                default:
                    monthsAgo = 0;
            }
            const cutoffDate = new Date();
            cutoffDate.setMonth(today.getMonth() - monthsAgo);
            if (reviewDate < cutoffDate) {
                return false;
            }
        }
        return true;
    }).sort((a, b) => {
        if (sortOrder === 'latest') {
            return new Date(b.date).getTime() - new Date(a.date).getTime();
        } else {
            return b.rating - a.rating;
        }
    });

    const changeTab = (tab: string) => {
        setActiveTab(tab);
    }

    const goBoardWrite = () => {
        return router.push("/board/write");
    }

    return (
        <div className="flex flex-col min-h-screen bg-gray-50 w-[375px] mx-auto relative">
            <div className="flex flex-col w-[375px] min-h-[762px] bg-gray-50 relative pb-16">
                {/* Header */}
                <header
                    className="fixed top-0 w-[375px] z-10 bg-white shadow-sm p-4 flex justify-between items-center">
                    <div className="flex items-center">
                        <img
                            src="https://public.readdy.ai/ai/img_res/cb0d4a879b43da21a4e203bb468a353b.jpg"
                            alt="로고"
                            className="w-8 h-8 mr-2"
                        />
                        <h1 className="text-lg font-bold">수리 후기</h1>
                    </div>
                    <div className="flex items-center space-x-4">
                        <button className="relative cursor-pointer">
                            <i className="fas fa-bell text-gray-600"></i>
                            <span
                                className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">2</span>
                        </button>
                        <Avatar className="cursor-pointer">
                            <AvatarImage
                                src="https://public.readdy.ai/ai/img_res/adddc094417f81d0805c8ab11ce3284c.jpg"/>
                            <AvatarFallback>김</AvatarFallback>
                        </Avatar>
                    </div>
                </header>
                {/* Filter Section */}
                <div className="fixed top-[52px] w-[375px] bg-white shadow-sm px-4 py-3 border-b">
                    {/* 정렬 셀렉트 (숨김 처리 중) */}
                    <div className="flex justify-between items-center mb-2">
                        <Select value={sortOrder} onValueChange={setSortOrder}>
                            {/* <SelectTrigger /> */}
                        </Select>
                    </div>

                    {/* 날짜 필터 */}
                    <ScrollArea className="w-full overflow-x-auto pb-1">
                        <div className="flex space-x-2 px-1">
                            {dateFilters.map((filter) => (
                                <Button
                                    key={filter.id}
                                    // variant={selectedDateFilter === filter.id ? "default" : "outline"}
                                    size="sm"
                                    className={`text-xs px-2 h-6 rounded-full transition ${
                                        selectedDateFilter === filter.id
                                            ? "bg-blue-600 hover:bg-blue-700 text-white"
                                            : "bg-white text-gray-800 border border-gray-200 hover:bg-gray-100"
                                    }`}
                                    onClick={() => setSelectedDateFilter(filter.id)}
                                >
                                    {filter.label}
                                </Button>
                            ))}
                        </div>
                    </ScrollArea>

                    {/* 기기 필터 */}
                    <div className="w-full overflow-x-auto mt-1 pb-1">
                        <div className="overflow-x-auto whitespace-nowrap">
                            <div className="inline-flex space-x-2 px-1">
                                {machineTypes.map((type) => (
                                    <Button
                                        key={type.id}
                                        size="sm"
                                        className={`text-xs px-2 h-6 rounded-lg ${
                                            selectedMachineType === type.id
                                                ? "bg-blue-600 hover:bg-blue-700 text-white"
                                                : "bg-white text-gray-800 border border-gray-200 hover:bg-gray-100"
                                        }`}
                                        onClick={() => setSelectedMachineType(type.id)}
                                    >
                                        {type.label}
                                    </Button>
                                ))}
                            </div>
                        </div>
                    </div>

                </div>
                <div className="mt-[160px] px-4 pb-4  overflow-x-hidden">
                    <div className="flex justify-between items-center mb-3">
                        <h2 className="text-lg font-medium">전체 후기 ({filteredReviews.length})</h2>
                        <Button
                            onClick={goBoardWrite}
                            className="bg-blue-600 hover:bg-blue-700 text-white text-sm px-3 py-2"
                        >
                            <i className="fas fa-pen mr-2"></i>
                            후기 작성
                        </Button>
                    </div>
                    {filteredReviews.length > 0 ? (
                        <div className="space-y-3">
                            {filteredReviews.map(review => (
                                <Card key={review.id} className="p-4 !rounded-button">
                                    <a
                                        href="https://readdy.ai/home/d3683d32-6b48-4b2b-87b7-6ddbb63b44c3/d6c07c0c-050b-42a0-ba40-3954c7fb81c6"
                                        data-readdy="true"
                                        className="cursor-pointer"
                                    >
                                        <div className="flex justify-between items-start mb-2">
                                            <div>
                                                <h3 className="font-medium text-gray-800">{review.machineName}</h3>
                                                <p className="text-sm text-gray-600 mt-1">{review.repairDetails}</p>
                                            </div>
                                            <div className="text-sm text-gray-500">{review.date}</div>
                                        </div>
                                    </a>
                                    <div className="flex justify-between items-center">
                                        <div className="flex text-yellow-400">
                                            {[...Array(5)].map((_, i) => (
                                                <i
                                                    key={i}
                                                    className={`${i < review.rating ? 'fas' : 'far'} fa-star`}
                                                ></i>
                                            ))}
                                        </div>
                                        <Badge className="bg-blue-600 hover:bg-blue-700">{review.status}</Badge>
                                    </div>
                                </Card>
                            ))}
                        </div>
                    ) : (
                        <div className="flex flex-col items-center justify-center py-10">
                            <i className="fas fa-clipboard-list text-gray-300 text-5xl mb-4"></i>
                            <p className="text-gray-500">선택한 필터에 맞는 후기가 없습니다</p>
                            <Button
                                variant="outline"
                                className="mt-4 text-blue-600 border-blue-600"
                                onClick={() => {
                                    setSelectedDateFilter('all');
                                    setSelectedMachineType('all');
                                }}
                            >
                                필터 초기화
                            </Button>
                        </div>
                    )}
                </div>

                {/* 하단 탭 바 */}
                <div className="fixed bottom-0 w-[375px] bg-white border-t border-gray-200 grid grid-cols-5 h-16">
                    <button
                        className={`flex flex-col items-center justify-center ${activeTab === "home" ? "text-blue-600" : "text-gray-500"} cursor-pointer`}
                        onClick={() => changeTab("home")}
                    >
                        <i className={`fas fa-home ${activeTab === "home" ? "text-blue-600" : "text-gray-500"} text-xl mb-1`}></i>
                        <span className="text-xs">홈</span>
                    </button>
                    <button
                        className={`flex flex-col items-center justify-center ${activeTab === "repair" ? "text-blue-600" : "text-gray-500"} cursor-pointer`}
                        onClick={() => setActiveTab("repair")}
                    >
                        <i className={`fas fa-tools ${activeTab === "repair" ? "text-blue-600" : "text-gray-500"} text-xl mb-1`}></i>
                        <span className="text-xs">수리 접수</span>
                    </button>
                    <button
                        className={`flex flex-col items-center justify-center ${activeTab === "history" ? "text-blue-600" : "text-gray-500"} cursor-pointer`}
                        onClick={() => changeTab("history")}
                    >
                        <i className={`fas fa-clipboard-list ${activeTab === "history" ? "text-blue-600" : "text-gray-500"} text-xl mb-1`}></i>
                        <span className="text-xs">접수 내역</span>
                    </button>
                    <button
                        className={`flex flex-col items-center justify-center ${activeTab === "invoice" ? "text-blue-600" : "text-gray-500"} cursor-pointer`}
                        onClick={() => changeTab("invoice")}
                    >
                        <i className={`fas fa-file-invoice-dollar ${activeTab === "invoice" ? "text-blue-600" : "text-gray-500"} text-xl mb-1`}></i>
                        <span className="text-xs">견적</span>
                    </button>
                    <button
                        className={`flex flex-col items-center justify-center ${activeTab === "more" ? "text-blue-600" : "text-gray-500"} cursor-pointer`}
                        onClick={() => changeTab("more")}
                    >
                        <i className={`fas fa-ellipsis-h ${activeTab === "more" ? "text-blue-600" : "text-gray-500"} text-xl mb-1`}></i>
                        <span className="text-xs">더보기</span>
                    </button>
                </div>
            </div>
        </div>
    );
};
export default App
