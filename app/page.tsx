'use client'

import React, {useEffect, useState} from 'react';
import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import {Card, CardContent} from "@/components/ui/card";
import {ScrollArea} from "@/components/ui/scroll-area";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import {Badge} from "@/components/ui/badge";
import {useRouter} from "next/navigation";
import {loadPostcodeScript} from "@/util/loadPostcodeScript";
import Link from "next/link";
import DialogPopup from "@/components/dialog";

const App = () => {
    const router = useRouter();

    const [address, setAddress] = useState('');
    const [detailAddress, setDetailAddress] = useState('');
    const [activeTab, setActiveTab] = useState("home");
    const [selectedDate, setSelectedDate] = useState<string>('');
    const [symptomDescription, setSymptomDescription] = useState<string>('');
    const [imageUploaded, setImageUploaded] = useState<boolean>(false);
    const [selectedMachines, setSelectedMachines] = useState<string[]>([]);
    const [isSelectedAddress, setIsSelectedAddress] = useState<boolean>(false);

    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [pendingTab, setPendingTab] = useState<string>('');

    const handleDialogOpen = () => {
        setIsDialogOpen(true);
    };

    const handleDialogClose = () => {
        setIsDialogOpen(false);
    };

    const handleDialogConfirm = () => {
        setActiveTab(pendingTab);
        handleDialogClose();
    };

    const changeTab = (tab: string) => {
        if(activeTab == 'repair' && tab != 'repair'){
            handleDialogOpen();
            setPendingTab(tab);
        }
        else {
            setActiveTab(tab);
        }
    }

    const toggleMachine = (type: string) => {
        setSelectedMachines((prev) =>
            prev.includes(type)
                ? prev.filter((item) => item !== type) // 선택 해제
                : [...prev, type] // 선택 추가
        );
    };

    useEffect(() => {
        const now = new Date();
        now.setHours(now.getHours() + 9);
        const formatted = now.toISOString().slice(0, 16);
        setSelectedDate(formatted);
    }, []);

    const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedDate(e.target.value);
    };

    const handleDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setSymptomDescription(e.target.value);
    };

    const handleImageUpload = () => {
        setImageUploaded(true);
    };

    const handleDetailAddress = (e: React.ChangeEvent<HTMLInputElement>) => {
        setDetailAddress(e.target.value);
    };
    const handleSearchAddress = async () => {
        await loadPostcodeScript();

        new (window as any).daum.Postcode({
            oncomplete: function (data: any) {
                const fullAddress = data.address;
                setAddress(fullAddress);
                setIsSelectedAddress(true);
            },
        }).open();
    };

    const isFormValid = () => {
        return selectedMachines.length > 0 && symptomDescription && selectedDate && imageUploaded;
    };

    const goDetail = () => {
        return router.push("/detail");
    }

    const machineList = ["오븐", "믹서", "발효기", "반죽기", "냉장고", "기타"];
    const buildingList = ["상가", "아파트", "주택", "", "냉장고", "기타"];
    const moreList = [
        {text: '내 정보', link: '/profile'},
        {text: '알림 설정', link: '/notifications'},
        {text: '자주 묻는 질문', link: '/faq'},
        {text: '고객센터', link: '/support'},
        {text: '이용약관', link: '/terms'},
        {text: '로그아웃', link: ''} // 로그아웃은 따로 처리
    ];
    const orderList = [{
        machineName:'데커 컨벡션 오븐 DKO-8B',
        orderDate:'2025-04-01',
        orderStatus:'진행중',
        orderReason:'온도 조절 문제로 인한 수리 접수'
    }];
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

    const handleLogout = () => {
        //7?ee.9ZpUBkd*NE
        // 1. 토큰 삭제 (쿠키 or localStorage 기반)
        // deleteCookie('accessToken') // 또는 localStorage.removeItem('accessToken') 등

        // 2. 리다이렉트
        router.push('/login')
    }

    const submitOrder = () => {
        // 접수하기 버튼
        /*
        const machineType = ["오븐", "믹서"]; // 또는 위처럼 객체 형태도 가능

        const { data, error } = await supabase
          .from('repair_requests')
          .insert({
            machine_type: machineType, // json 필드
            // 나머지 필드도 함께
          });

          -> supabase 도입 예정
         */
    }

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
                <ScrollArea className="h-[calc(100vh-136px)]">
                    <div className="px-4 py-4">
                        {activeTab === "home" && (
                            <>
                                <div className="mb-6">
                                    <h2 className="text-xl font-bold mb-2">안녕하세요, 배밍밍 님!</h2>
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
                                                className="text-blue-600 text-sm p-0 h-auto cursor-pointer">
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

                            </>
                        )}

                        {activeTab === "repair" && (
                            <div className="py-2">
                                <h2 className="text-xl font-bold mb-4">수리 접수하기</h2>
                                <p className="text-gray-600 mb-6">기계 정보와 고장 내용을 입력해 주세요.</p>

                                {/* 수리 접수 폼 내용 */}
                                <div className="space-y-6">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">기계 종류</label>
                                        <div className="grid grid-cols-3 gap-3">
                                            {machineList.map((type, index) => {
                                                const isSelected = selectedMachines.includes(type);

                                                return (
                                                    <div
                                                        key={index}
                                                        onClick={() => toggleMachine(type)}
                                                        className={`border rounded-lg p-3 text-center cursor-pointer transition ${isSelected ? 'bg-blue-100 border-blue-500 font-semibold' : 'bg-white border-gray-200 hover:border-blue-500 hover:bg-blue-50'}           `}>
                                                        {type}
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">모델명</label>
                                        <Input
                                            type="text"
                                            placeholder="데커 컨벡션 오븐 DKO-8B"
                                            className="w-full border-gray-300"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium mb-2">사진 첨부</label>
                                        <div
                                            className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center cursor-pointer hover:bg-gray-50 transition-colors"
                                            onClick={handleImageUpload}>
                                            {imageUploaded ? (
                                                <div className="flex items-center justify-center flex-col">
                                                    <i className="fas fa-check-circle text-green-500 text-2xl mb-2"></i>
                                                    <p className="text-sm text-gray-600">이미지가 업로드되었습니다</p>
                                                </div>
                                            ) : (
                                                <div className="flex items-center justify-center flex-col">
                                                    <i className="fas fa-camera text-gray-400 text-2xl mb-2"></i>
                                                    <p className="text-sm text-gray-600">클릭하여 사진을 첨부하세요</p>
                                                    <p className="text-xs text-gray-500 mt-1">(최대 3장)</p>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium mb-2">희망 방문 일시</label>
                                        <Input
                                            type="datetime-local"
                                            className="w-full"
                                            value={selectedDate}
                                            onChange={handleDateChange}
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium mb-2">담당자 연락처</label>
                                        <Input
                                            type="text"
                                            placeholder="01012345678"
                                            className="w-full border-gray-300"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium mb-2">방문 장소</label>
                                        <Input
                                            type="text"
                                            value={address}
                                            readOnly
                                            className="w-full border-gray-300"
                                            placeholder="주소를 검색해주세요"
                                            onClick={handleSearchAddress}
                                        />
                                        {isSelectedAddress &&
                                            <Input
                                                type="text"
                                                value={detailAddress}
                                                className="w-full border-gray-300 mt-1"
                                                placeholder="상세 주소를 입력해주세요"
                                                onChange={handleDetailAddress}
                                            />
                                        }
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">고장 증상</label>
                                        <textarea
                                            placeholder="고장 증상을 자세히 설명해 주세요."
                                            className="w-full min-h-[100px] p-3 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            onChange={handleDescriptionChange}
                                        ></textarea>
                                    </div>

                                    <Button
                                        className="w-full py-5 text-lg font-medium bg-blue-600 hover:bg-blue-700 shadow-md !rounded-button"
                                        disabled={!isFormValid()}
                                        onClick={submitOrder}
                                    > 접수하기
                                    </Button>
                                </div>
                            </div>
                        )}

                        {activeTab === "history" && (
                            <div className="py-2">
                                <h2 className="text-xl font-bold mb-4">접수 내역</h2>

                                <div className="space-y-4">
                                    {orderList.map((item, index) => (
                                        <Card key={index} className="border border-gray-200 shadow-sm">
                                            <CardContent className="p-4">
                                                <div className="flex justify-between items-start mb-2">
                                                    <div>
                                                        <h4 className="font-bold">{item.machineName}</h4>
                                                        <p className="text-sm text-gray-600">접수일: {item.orderDate}</p>
                                                    </div>
                                                    <Badge variant="outline"
                                                           className="bg-blue-50 text-blue-700 border-blue-200">
                                                        {item.orderStatus}
                                                    </Badge>
                                                </div>
                                                <p className="text-sm text-gray-700 mb-3">{item.orderReason}</p>
                                                <Button
                                                    onClick={goDetail}
                                                    variant="outline" className="w-full text-sm !rounded-button">
                                                    상세보기
                                                </Button>
                                            </CardContent>
                                        </Card>
                                    ))}
                                </div>
                            </div>
                        )}

                        {activeTab === "quote" && (
                            <div className="py-2">
                                <h2 className="text-xl font-bold mb-4">견적 확인</h2>

                                <Card className="border border-gray-200 shadow-sm mb-4">
                                    <CardContent className="p-4">
                                        <div className="flex justify-between items-start mb-3">
                                            <div>
                                                <h4 className="font-bold">데커 컨벡션 오븐 DKO-8B</h4>
                                                <p className="text-sm text-gray-600">접수번호: REP-20250401-001</p>
                                            </div>
                                            <Badge variant="outline"
                                                   className="bg-yellow-50 text-yellow-700 border-yellow-200">
                                                견적 대기
                                            </Badge>
                                        </div>

                                        <div className="bg-gray-50 p-3 rounded-lg mb-3">
                                            <div className="flex justify-between mb-1">
                                                <span className="text-sm text-gray-600">최종 견적</span>
                                                <span className="font-bold">견적 준비중</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span className="text-sm text-gray-600">조치 완료일</span>
                                                <span className="font-bold">확인중</span>
                                            </div>
                                        </div>

                                        <Button className="w-full bg-blue-600 text-white !rounded-button">
                                            결제하기
                                        </Button>
                                    </CardContent>
                                </Card>
                            </div>
                        )}

                        {activeTab === "more" && (
                            <div className="py-2">
                                <h2 className="text-xl font-bold mb-4">더보기</h2>
                                <div
                                    className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden mb-4">
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
                        )}
                    </div>
                    <DialogPopup isOpen={isDialogOpen} onClose={handleDialogClose}
                                 onConfirm={() => handleDialogConfirm()}/>
                </ScrollArea>
            </main>

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
                    className={`flex flex-col items-center justify-center ${activeTab === "quote" ? "text-blue-600" : "text-gray-500"} cursor-pointer`}
                    onClick={() => changeTab("quote")}
                >
                    <i className={`fas fa-file-invoice-dollar ${activeTab === "quote" ? "text-blue-600" : "text-gray-500"} text-xl mb-1`}></i>
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
    );
};

export default App;

