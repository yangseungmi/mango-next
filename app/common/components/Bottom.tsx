// app/common/components/Button.tsx
import React from 'react';

interface BottomTabBarProps {
    activeTab: string;
    onTabChange: (tab: string) => void;
}

const BottomTabBar = ({ activeTab, onTabChange }: BottomTabBarProps) => {
    return (
        <div className="fixed bottom-0 w-[375px] bg-white border-t border-gray-200 grid grid-cols-6 h-16">
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
                className={`flex flex-col items-center justify-center ${activeTab === "community" ? "text-blue-600" : "text-gray-500"} cursor-pointer`}
                onClick={() => changeTab("review")}
            >
                <i className={`fas fa-comment-dots ${activeTab === "community" ? "text-blue-600" : "text-gray-500"} text-xl mb-1`}></i>
                <span className="text-xs">후기</span>
            </button>
            <button
                className={`flex flex-col items-center justify-center ${activeTab === "more" ? "text-blue-600" : "text-gray-500"} cursor-pointer`}
                onClick={() => changeTab("more")}
            >
                <i className={`fas fa-ellipsis-h ${activeTab === "more" ? "text-blue-600" : "text-gray-500"} text-xl mb-1`}></i>
                <span className="text-xs">더보기</span>
            </button>
        </div>
    );
};

export default Bottom;
