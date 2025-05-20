'use client'

import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
const App: React.FC = () => {
    const [isNotificationsEnabled, setIsNotificationsEnabled] = useState(true);
    const [isLocationEnabled, setIsLocationEnabled] = useState(true);
    const userInfo = {
        name: "김민지",
        phoneNumber: "010-9876-5432",
        email: "minji.kim@email.com",
        address: "서울시 강남구 베이커리로 456",
        storeName: "민지의 베이커리",
        storeType: "베이커리",
        profileImage: "https://readdy.ai/api/search-image?query=young%20asian%20female%20bakery%20owner%2C%2030%20years%20old%2C%20warm%20smile%2C%20professional%20casual%20attire%2C%20high%20quality%20portrait%20photography%2C%20studio%20lighting%2C%20neutral%20background%2C%20professional%20headshot&width=120&height=120&seq=cust1&orientation=squarish",
        favoriteRepairShops: ["서울 베이커리 수리", "강남 기계 수리"],
        recentRepairs: [
            {
                date: "2025-05-15",
                type: "오븐 수리",
                status: "완료"
            },
            {
                date: "2025-04-20",
                type: "믹서기 점검",
                status: "완료"
            }
        ]
    };
    return (
        <div className="flex flex-col min-h-screen bg-gray-50 w-[375px] mx-auto relative">
            {/* 헤더 */}
            <header className="fixed top-0 w-[375px] z-10 bg-white shadow-sm p-4 flex items-center justify-center">
                <a
                    href="#"
                    className="absolute left-4 cursor-pointer"
                >
                    <i className="fas fa-arrow-left text-gray-700"></i>
                </a>
                <h1 className="text-lg font-bold">내 정보</h1>
            </header>
            {/* 메인 콘텐츠 */}
            <main className="flex-1 pt-[72px] pb-16">
                <ScrollArea className="h-[calc(100vh-136px)]">
                    <div className="px-4 py-3">
                        {/* 프로필 섹션 */}
                        <div className="flex flex-col items-center justify-center mb-6 pt-4">
                            <div className="relative mb-3">
                                <Avatar className="h-24 w-24 border-4 border-white shadow-md">
                                    <AvatarImage src={userInfo.profileImage} alt={userInfo.name} />
                                    <AvatarFallback className="bg-blue-100 text-blue-600 text-xl">민</AvatarFallback>
                                </Avatar>
                                <button className="absolute bottom-0 right-0 bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center shadow-md cursor-pointer !rounded-button">
                                    <i className="fas fa-camera text-sm"></i>
                                </button>
                            </div>
                            <h2 className="text-xl font-bold text-gray-900">{userInfo.name}</h2>
                            <p className="text-sm text-gray-600 mt-1">{userInfo.storeName}</p>
                            <p className="text-xs text-gray-500">{userInfo.storeType}</p>
                            <Button variant="outline" className="mt-4 text-sm h-9 px-4 border-blue-500 text-blue-600 hover:bg-blue-50 !rounded-button">
                                <i className="fas fa-pen text-xs mr-2"></i>
                                프로필 수정
                            </Button>
                        </div>
                        {/* 기본 정보 섹션 */}
                        <Card className="mb-4 border border-gray-200 shadow-sm">
                            <CardContent className="p-4">
                                <div className="flex justify-between items-center mb-3">
                                    <h3 className="font-bold text-md">기본 정보</h3>
                                    <Button variant="ghost" size="sm" className="h-8 px-2 text-blue-600 hover:bg-blue-50 !rounded-button">
                                        <i className="fas fa-pen text-xs"></i>
                                    </Button>
                                </div>
                                <div className="space-y-3">
                                    <div className="flex">
                                        <span className="text-sm text-gray-500 w-24">전화번호</span>
                                        <span className="text-sm text-gray-900 flex-1">{userInfo.phoneNumber}</span>
                                    </div>
                                    <div className="flex">
                                        <span className="text-sm text-gray-500 w-24">이메일</span>
                                        <span className="text-sm text-gray-900 flex-1">{userInfo.email}</span>
                                    </div>
                                    <div className="flex">
                                        <span className="text-sm text-gray-500 w-24">매장 주소</span>
                                        <span className="text-sm text-gray-900 flex-1">{userInfo.address}</span>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                        {/* 자주 이용하는 수리점 */}
                        <Card className="mb-4 border border-gray-200 shadow-sm">
                            <CardContent className="p-4">
                                <div className="flex justify-between items-center mb-3">
                                    <h3 className="font-bold text-md">자주 이용하는 수리점</h3>
                                </div>
                                <div className="space-y-3">
                                    {userInfo.favoriteRepairShops.map((shop, index) => (
                                        <div key={index} className="flex items-center justify-between bg-gray-50 p-3 rounded-lg">
                                            <span className="text-sm text-gray-900">{shop}</span>
                                            <Button variant="ghost" size="sm" className="h-8 w-8 text-gray-500 hover:bg-gray-200 !rounded-button">
                                                <i className="fas fa-heart text-red-500"></i>
                                            </Button>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>

                        {/* 최근 수리 내역 */}
                        <Card className="mb-4 border border-gray-200 shadow-sm">
                            <CardContent className="p-4">
                                <div className="flex justify-between items-center mb-3">
                                    <h3 className="font-bold text-md">최근 수리 내역</h3>
                                    <Button variant="ghost" size="sm" className="h-8 px-3 text-blue-600 hover:bg-blue-50 !rounded-button">
                                        전체보기
                                    </Button>
                                </div>
                                <div className="space-y-3">
                                    {userInfo.recentRepairs.map((repair, index) => (
                                        <div key={index} className="flex items-center justify-between bg-gray-50 p-3 rounded-lg">
                                            <div className="flex flex-col">
                                                <span className="text-sm font-medium text-gray-900">{repair.type}</span>
                                                <span className="text-xs text-gray-500">{repair.date}</span>
                                            </div>
                                            <Badge variant="outline" className={`${
                                                repair.status === "완료" ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"
                                            }`}>
                                                {repair.status}
                                            </Badge>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>

                        {/* 알림 설정 섹션 */}
                        <Card className="mb-4 border border-gray-200 shadow-sm">
                            <CardContent className="p-4">
                                <h3 className="font-bold text-md mb-3">알림 설정</h3>
                                <div className="space-y-4">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <Label htmlFor="notifications" className="text-sm font-medium">
                                                앱 알림
                                            </Label>
                                            <p className="text-xs text-gray-500">새로운 수리 요청 및 메시지 알림</p>
                                        </div>
                                        <Switch
                                            id="notifications"
                                            checked={isNotificationsEnabled}
                                            onCheckedChange={setIsNotificationsEnabled}
                                        />
                                    </div>
                                    <Separator />
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <Label htmlFor="location" className="text-sm font-medium">
                                                위치 서비스
                                            </Label>
                                            <p className="text-xs text-gray-500">주변 수리 요청 확인을 위한 위치 정보</p>
                                        </div>
                                        <Switch
                                            id="location"
                                            checked={isLocationEnabled}
                                            onCheckedChange={setIsLocationEnabled}
                                        />
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                        {/* 계정 관리 섹션 */}
                        <Card className="mb-4 border border-gray-200 shadow-sm">
                            <CardContent className="p-4">
                                <h3 className="font-bold text-md mb-3">계정 관리</h3>
                                <div className="space-y-2">
                                    <Button variant="ghost" className="w-full justify-start text-gray-700 hover:bg-gray-100 !rounded-button">
                                        <i className="fas fa-lock text-gray-500 mr-3 w-5"></i>
                                        비밀번호 변경
                                        <i className="fas fa-chevron-right text-gray-400 ml-auto text-xs"></i>
                                    </Button>
                                    <Button variant="ghost" className="w-full justify-start text-gray-700 hover:bg-gray-100 !rounded-button">
                                        <i className="fas fa-sign-out-alt text-gray-500 mr-3 w-5"></i>
                                        로그아웃
                                        <i className="fas fa-chevron-right text-gray-400 ml-auto text-xs"></i>
                                    </Button>
                                    <Button variant="ghost" className="w-full justify-start text-red-500 hover:bg-red-50 !rounded-button">
                                        <i className="fas fa-user-times text-red-500 mr-3 w-5"></i>
                                        회원 탈퇴
                                        <i className="fas fa-chevron-right text-gray-400 ml-auto text-xs"></i>
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                        {/* 앱 정보 */}
                        <div className="text-center mb-8 mt-6">
                            <p className="text-xs text-gray-400">베이커리 수리 접수 v1.0.5</p>
                            <p className="text-xs text-gray-400 mt-1">© 2025 Bakery Repair Service</p>
                        </div>
                    </div>
                </ScrollArea>
            </main>
        </div>
    );
};
export default App
