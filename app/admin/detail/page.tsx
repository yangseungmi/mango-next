'use client';

import React, {useEffect, useState} from 'react';
import {useAuth} from '@/context/AuthContext';
import {Button} from "@/components/ui/button";

interface EstimateItem {
    name: string;
    price: number;
}

const RepairDetail = () => {
    const {user, isLoading} = useAuth();

    // useEffect(() => {
    //     const fetchUser = async () => {
    //         const {data, error} = await supabase.auth.getUser();
    //         if (!data) console.log('data 없음');
    //         else setUser(data.user);
    //     };
    //     fetchUser();
    // }, []);

    const [estimateItems, setEstimateItems] = useState<EstimateItem[]>([
        { name: '모터 센서 교체', price: 85000 },
        { name: '컨트롤러 수리', price: 65000 },
        { name: '출장비', price: 35000 },
    ]);
    const [selectedDate, setSelectedDate] = useState('2025-05-13');

    const total = estimateItems.reduce((sum, item) => sum + item.price, 0);

    const handleAddItem = () => {
        setEstimateItems([...estimateItems, { name: '', price: 0 }]);
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

    return (
        <div className="flex flex-col min-h-screen bg-gray-50 w-[375px] mx-auto relative">
            {/* 헤더 */}
            <header className="fixed top-0 w-[375px] z-10 bg-blue-300 shadow-sm p-4 flex items-center">
                <button
                    className="mr-3 cursor-pointer bg-transparent border-none p-0"
                >
                    <i className="fas fa-arrow-left text-gray-700"></i>
                </button>
                <h1 className="text-lg font-bold">수리 접수 상세</h1>
            </header>

            <main className="pt-16 px-4">
                {/* 회원 정보 */}
                <div className="bg-white rounded p-4 mt-3 shadow-sm">
                    <div className="flex items-center justify-between mb-2">
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
                </div>

                {/* 진행 상태 */}
                <div className="bg-white rounded p-4 mt-3 shadow-sm">
                    <div className="flex justify-between mb-2 text-sm">
                        <span className="font-medium">접수</span>
                        <span className="text-gray-400">전화 예정</span>
                        <span className="text-gray-400">방문 확정</span>
                        <span className="text-gray-400">수리 완료</span>
                    </div>
                    <div className="h-1.5 bg-gray-200 rounded-full overflow-hidden">
                        <div className="h-full bg-black w-1/4 rounded-full"></div>
                    </div>
                </div>

                {/* 기기 정보 */}
                <div className="bg-white rounded p-4 mt-3 shadow-sm">
                    <div className="flex items-center">
                        <div className="w-20 h-20 mr-4">
                            <img
                                src="https://readdy.ai/api/search-image?query=commercial%20oven%2C%20professional%20kitchen%20equipment%2C%20front%20view%2C%20detailed%2C%20realistic%2C%20isolated%20on%20white%20background&width=200&height=200&seq=1&orientation=squarish"
                                alt="오븐 이미지"
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <div>
                            <h2 className="text-lg font-bold">반죽기-28323</h2>
                            <p className="text-gray-500 text-sm mt-1">시리얼 번호</p>
                            <p className="text-sm">DK08B-2023-78945</p>
                        </div>
                    </div>
                </div>

                {/* 접수 정보 */}
                <div className="bg-white rounded p-4 mt-3 shadow-sm">
                    <h2 className="text-lg font-bold mb-3">접수 정보</h2>
                    <div className="grid grid-cols-2 gap-3">
                        <div>
                            <p className="text-gray-500 text-sm">접수일</p>
                            <p className="text-sm">2025/05/10 14:30 PM</p>
                        </div>
                        <div>
                            <p className="text-gray-500 text-sm">접수번호</p>
                            <p className="text-sm">REP-20250510-003</p>
                        </div>
                    </div>
                    <p className="text-gray-500 text-sm mt-3">첨부 사진</p>
                    <div className="grid grid-cols-2 gap-2 mt-1">
                        <img
                            src="https://readdy.ai/api/search-image?query=graph%20chart%20data%20visualization%2C%20technical%20diagnostic%20report%2C%20machine%20performance%20data&width=160&height=120&seq=2&orientation=landscape"
                            className="w-full h-24 object-cover rounded"
                            alt="진단 차트"
                        />
                        <img
                            src="https://readdy.ai/api/search-image?query=broken%20commercial%20mixer%2C%20mechanical%20issue%2C%20close-up%20of%20damaged%20part%2C%20technical%20detail&width=160&height=120&seq=3&orientation=landscape"
                            className="w-full h-24 object-cover rounded"
                            alt="고장 부위"
                        />
                    </div>
                </div>

                {/* 고장 증상 */}
                <div className="bg-white rounded p-4 mt-3 shadow-sm">
                    <h2 className="text-lg font-bold mb-2">고장 증상</h2>
                    <p className="text-sm">
                        기계 작동 시 이상한 소리가 나며, 반죽 속도가 일정하지 않습니다. 또한 전원을 켤 때 가끔 지연이 발생합니다. 지난 주부터 증상이 시작되었습니다.
                    </p>
                </div>

                {/* 예상 견적 */}
                <div className="bg-white rounded p-4 mt-3 shadow-sm">
                    <div className="flex justify-between items-center mb-3">
                        <h2 className="text-lg font-bold">예상 견적</h2>
                        <button className="text-sm text-secondary" onClick={handleAddItem}>
                            <i className="ri-add-line ri-lg"></i> 항목 추가
                        </button>
                    </div>
                    <div className="border-b pb-2 mb-2">
                        {estimateItems.map((item, idx) => (
                            <div className="flex items-center gap-2 mb-2" key={idx}>
                                <input
                                    type="text"
                                    value={item.name}
                                    onChange={(e) => handleUpdateItem(idx, 'name', e.target.value)}
                                    className="flex-1 border-none bg-gray-50 rounded p-2 text-sm"
                                />
                                <div className="relative w-32">
                                    <input
                                        type="number"
                                        value={item.price}
                                        onChange={(e) => handleUpdateItem(idx, 'price', e.target.value)}
                                        className="w-full border-none bg-gray-50 rounded p-2 text-sm text-right pr-8"
                                    />
                                    <span
                                        className="absolute right-2 top-1/2 -translate-y-1/2 text-sm text-gray-500">원</span>
                                </div>
                                <button onClick={() => handleRemoveItem(idx)}
                                        className="text-gray-400 hover:text-red-500">
                                    <i className="ri-delete-bin-line ri-lg"></i>
                                </button>
                            </div>
                        ))}
                    </div>
                    <div className="flex justify-between items-center bg-gray-50 p-3 rounded">
                        <span className="font-bold">총 견적 금액</span>
                        <span className="font-bold text-lg">{total.toLocaleString()}원</span>
                    </div>
                </div>

                {/* 방문일 */}
                <div className="mt-4 bg-white rounded p-4 shadow-sm">
                    <p className="text-gray-500 text-sm">방문 접수일</p>
                    <div className="flex justify-between items-center mt-1">
                        <p>{selectedDate}</p>
                        <button className="text-secondary text-sm cursor-pointer">변경</button>
                    </div>
                </div>

                {/* 기술자 정보 */}
                <div className="bg-white rounded p-4 mt-3 shadow-sm">
                    <h2 className="text-lg font-bold mb-3">담당 기술자</h2>
                    <div className="flex items-center">
                        <div className="w-12 h-12 bg-gray-200 rounded-full overflow-hidden mr-3">
                            <img
                                src="https://readdy.ai/api/search-image?query=professional%20repairman%20icon%2C%20abstract%2C%20no%20face%2C%20simple%20silhouette&width=100&height=100&seq=4&orientation=squarish"
                                className="w-full h-full object-cover"
                                alt="기술자"
                            />
                        </div>
                        <div>
                            <p className="font-medium">김기술</p>
                            <p className="text-sm text-gray-500">경력 8년 / 주방기기 전문</p>
                        </div>
                    </div>
                </div>
            </main>

            {/* 하단 버튼 */}
            <div className="fixed bottom-0 w-[375px] bg-white border-t border-gray-200 p-4 flex space-x-3">
                <Button variant="outline"
                        className="flex-1 border-red-500 text-red-500 hover:bg-red-50 hover:text-red-600 !rounded-button"
                >
                    고객에게 전화
                </Button>
                <Button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white !rounded-button">
                    <i className="fa-solid fa-phone"></i>
                    견적서 저장
                </Button>
            </div>
        </div>
    );
};

export default RepairDetail;
