'use client'

import Link from "next/link";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import React from "react";

const App = () => {
    const moreList = [
        {text: '내 정보', link: '/profile'},
        {text: '알림 설정', link: '/notifications'},
        {text: '자주 묻는 질문', link: '/faq'},
        {text: '고객센터', link: '/support'},
        {text: '이용약관', link: '/terms'},
    ];
    return (
        <div className="flex flex-col min-h-screen bg-gray-50 w-[375px] mx-auto relative">
            {/* 헤더 */}
            <header className="fixed top-0 w-[375px] z-10 bg-white shadow-sm p-4 flex justify-between items-center">
                <div className="flex items-center">
                    <img
                        src="https://public.readdy.ai/ai/img_res/cb0d4a879b43da21a4e203bb468a353b.jpg"
                        alt="로고"
                        className="w-8 h-8 mr-2"
                    />
                    <h1 className="text-lg font-bold">베이커리 기계 수리</h1>
                </div>
                <div className="flex items-center space-x-4">
                    <button className="relative cursor-pointer">
                        <i className="fas fa-bell text-gray-600"></i>
                        <span
                            className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">2</span>
                    </button>
                    <Avatar className="cursor-pointer">
                        <AvatarImage src="https://public.readdy.ai/ai/img_res/adddc094417f81d0805c8ab11ce3284c.jpg"/>
                        <AvatarFallback>김</AvatarFallback>
                    </Avatar>
                </div>
            </header>

            {/* 메인 콘텐츠 */}
            <main className="flex-1 pt-[72px] pb-16">
                <div className="py-2">
                    <h2 className="text-xl font-bold mb-4">더보기</h2>
                    <div
                        className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden mb-4">
                        <div className="divide-y divide-gray-200">
                            <div className="divide-y divide-gray-200">
                                {moreList.map((item, index) => (
                                    item.link ? (
                                        <Link href={item.link} key={index}>
                                            <div
                                                className="flex items-center justify-between p-4 cursor-pointer hover:bg-gray-50">
                                                <span>{item.text}</span>
                                                <i className="fas fa-chevron-right text-gray-400"></i>
                                            </div>
                                        </Link>
                                    ) : (
                                        <div
                                            key={index}
                                            className="flex items-center justify-between p-4 cursor-pointer hover:bg-gray-50"
                                            onClick={() => handleLogout()}
                                        >
                                            <span>{item.text}</span>
                                            <i className="fas fa-chevron-right text-gray-400"></i>
                                        </div>
                                    )
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default App;

