'use client'

import React, {useEffect, useReducer, useRef, useState} from 'react';
import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import {Card, CardContent} from "@/components/ui/card";
import {ScrollArea} from "@/components/ui/scroll-area";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import {Badge} from "@/components/ui/badge";
import {useRouter, useSearchParams} from "next/navigation";
import {loadPostcodeScript} from "@/util/loadPostcodeScript";
import Link from "next/link";
import {supabase} from "@/lib/supabase";
import ChangeTabDialog from "@/components/ChangeTabDialog";
import LoginRequiredDialog from "@/components/LoginRequiredDialog";
import {checkIsLoggedIn} from "@/components/checkIsLoggedIn";
import {format} from 'date-fns';

const App = () => {
    const ORDER_STORAGE_KEY = 'order-submit-state'

    type State = typeof initialState;

    type Action =
        | { type: 'SET_ADDRESS'; payload: string }
        | { type: 'SET_DETAIL_ADDRESS'; payload: string }
        | { type: 'SET_ACTIVE_TAB'; payload: string }
        | { type: 'SET_MODEL_NAME'; payload: string }
        | { type: 'SET_PHONE_NUMBER'; payload: string }
        | { type: 'SET_SELECTED_DATE'; payload: string }
        | { type: 'SET_SYMPTOM_DESCRIPTION'; payload: string }
        | { type: 'TOGGLE_MACHINE'; payload: string }
        | { type: 'SET_SELECTED_MACHINES'; payload: string[] }
        | { type: 'RESET' };

    const reducer = (state: State, action: Action): State => {
        switch (action.type) {
            case 'SET_ADDRESS':
                return {...state, address: action.payload};
            case 'SET_DETAIL_ADDRESS':
                return {...state, detailAddress: action.payload};
            case 'SET_MODEL_NAME':
                return {...state, modelName: action.payload};
            case 'SET_PHONE_NUMBER':
                return {...state, phoneNumber: action.payload};
            case 'SET_SELECTED_DATE':
                return {...state, selectedDate: action.payload};
            case 'SET_SYMPTOM_DESCRIPTION':
                return {...state, symptomDescription: action.payload};
            case 'TOGGLE_MACHINE':
                return {
                    ...state,
                    selectedMachines: state.selectedMachines.includes(action.payload)
                        ? state.selectedMachines.filter((item) => item !== action.payload)
                        : [...state.selectedMachines, action.payload],
                };
            case 'SET_SELECTED_MACHINES':
                return {...state, selectedMachines: action.payload};
            case 'RESET':
                return initialState;
            default:
                return state;
        }
    };

    const formattedDate = () => {
        const now = new Date();
        now.setHours(now.getHours() + 9);
        return now.toISOString().slice(0, 16);
    }

    const initialState = {
        address: '',
        detailAddress: '',
        modelName: '',
        phoneNumber: '',
        selectedDate: formattedDate(),
        symptomDescription: '',
        selectedMachines: [] as string[],
    };

    const getInitialState = (): State => {
        if (typeof window === 'undefined') return initialState;
        const saved = localStorage.getItem(ORDER_STORAGE_KEY);
        if (saved) {
            try {
                return JSON.parse(saved) as State;
            } catch (e) {
                console.error('❌ 상태 복원 실패:', e)
                return initialState;
            }
        }
        return initialState;
    }

    const router = useRouter();
    const [state, dispatch] = useReducer(reducer, getInitialState());

    const [activeTab, setActiveTab] = useState("home");
    const [images, setImages] = useState<File[]>([]);
    const fileInputRef = useRef<HTMLInputElement | null>(null);

    const [isSelectedAddress, setIsSelectedAddress] = useState<boolean>(false);

    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [pendingTab, setPendingTab] = useState<string>('');
    const [orderList, setOrderList] = useState<any[]>([]);

    const [showLoginPopup, setShowLoginPopup] = useState(false);

    const searchParams = useSearchParams();

    useEffect(() => {
        const from = searchParams.get('from');
        console.log('from', from)
        if (from === 'detail') {
            setActiveTab('history');
        }
    }, []);

    const removeImage = (index: number) => {
        setImages(prev => prev.filter((_, i) => i !== index));
    };
    const handleImageUpload = () => {
        if (fileInputRef.current) {
            fileInputRef.current!.click();
        }
    };
    const handleFilesChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        console.log('handleFilesChange', event.target.files);
        const selectedFiles = event.target.files;
        if (!selectedFiles) return;

        const fileArray = Array.from(selectedFiles);

        // 최대 3장까지만 업로드 허용
        if (images.length + fileArray.length > 3) {
            alert('최대 3장의 이미지만 업로드할 수 있습니다.');
            return;
        }

        setImages(prev => [...prev, ...fileArray]);
    };
    const handleDialogOpen = () => {
        setIsDialogOpen(true);
    };

    const handleDialogClose = () => {
        setIsDialogOpen(false);
    };

    const handleDialogConfirm = (init: boolean) => {
        if (init) dispatch({type: 'RESET'});
        else localStorage.setItem(ORDER_STORAGE_KEY, JSON.stringify(state));

        setActiveTab(pendingTab);
        handleDialogClose();
    };

    const changeTab = (tab: string) => {
        setActiveTab(tab);
    }

    const toggleMachine = (type: string) => {
        dispatch({type: 'TOGGLE_MACHINE', payload: type});
    };

    const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch({type: 'SET_SELECTED_DATE', payload: e.target.value});
    };

    const handleDetailAddress = (e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch({type: 'SET_DETAIL_ADDRESS', payload: e.target.value});
    };
    const handleSearchAddress = async () => {
        await loadPostcodeScript();

        new (window as any).daum.Postcode({
            oncomplete: function (data: any) {
                const fullAddress = data.address;
                const zoneCode = data.zonecode;
                dispatch({type: 'SET_ADDRESS', payload: fullAddress + '(' + zoneCode + ')'});
                setIsSelectedAddress(true);
            },
        }).open();
    };

    const isFormValid = () => {
        return (
            state.modelName.length > 0 &&
            state.selectedMachines.length > 0 &&
            state.symptomDescription.trim() &&
            state.phoneNumber.trim() &&
            state.address.trim() &&
            state.detailAddress.trim()
        );
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
    // const orderList = [{
    //     machineName: '데커 컨벡션 오븐 DKO-8B',
    //     orderDate: '2025-04-01',
    //     orderStatus: '진행중',
    //     orderReason: '온도 조절 문제로 인한 수리 접수'
    // }];
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

    const handleLogout = async () => {
        //7?ee.9ZpUBkd*NE
        // 1. 토큰 삭제 (쿠키 or localStorage 기반)
        // deleteCookie('accessToken') // 또는 localStorage.removeItem('accessToken') 등

        // 2. 리다이렉트
        await supabase.auth.signOut();
        router.push('/login')
    }

    const getUploadImageFiles = async (images: File[]): Promise<string[]> => {
        const urls: string[] = []

        for (const file of images) {
            const fileName = `${Math.random().toString(36).slice(2)}-${file.name}`

            const {data, error} = await supabase.storage
                .from('order-image')
                .upload(fileName, file)

            if (error) {
                console.error('업로드 실패:', error)
                throw error
            }

            const {data: publicUrlData} = supabase
                .storage
                .from('order-image')
                .getPublicUrl(fileName)

            console.log('publicUrlData.publicUrl',publicUrlData.publicUrl)
            urls.push(publicUrlData.publicUrl)
        }

        return urls;
    }

    const submitOrder = async () => {

        const isLogin = await checkIsLoggedIn();
        console.log('isLogin', isLogin);
        if (!isLogin) {
            // ❗로그인 유도 팝업 표시
            localStorage.setItem(ORDER_STORAGE_KEY, JSON.stringify(state))
            return setShowLoginPopup(true);
        }

        const {
            data: {user},
        } = await supabase.auth.getUser();

        console.log('--user--', user);

        console.log('----', state);

        console.log('Selected Machines:', state.selectedMachines);
        console.log('Model Name:', state.modelName);
        console.log('images', images);
        console.log('Selected Date:', state.selectedDate);
        console.log('Phone Number:', state.phoneNumber);
        console.log('Address:', state.address + ' ' + state.detailAddress);
        console.log('Symptom Description:', state.symptomDescription);
        console.log('user_id:', user?.id);

        // image에서 파일 추출 후 supabase에 insert
        const successUploadImage = getUploadImageFiles(images);


        // 실제로 Supabase에 저장
        const {data, error} = await supabase
            .from('order-info')
            .insert([
                {
                    machine_type: state.selectedMachines, // 배열 그대로 저장 (JSON 타입 필드 추천)
                    model_name: state.modelName,
                    photos: images, // images가 배열이면 Supabase 필드도 JSON이어야 함
                    visit_dt: state.selectedDate,
                    phone: state.phoneNumber,
                    address: `${state.address} ${state.detailAddress}`,
                    description: state.symptomDescription,
                    user_id: user?.id,
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
            setActiveTab('history');
        }
    }

    const resetForm = () => {
        dispatch({type: 'RESET'});
    }

    useEffect(() => {
        const fetchOrders = async () => {
            const {data: {user}} = await supabase.auth.getUser();
            if (!user) return;

            const {data, error} = await supabase
                .from('order-info')
                .select('*')
                .eq('user_id', user.id)
                .order('created_at', {ascending: false});

            if (error) {
                console.error('❌ 주문 조회 실패', error.message);
            } else {
                //setOrders(data || []);

                console.log('fetchOrders data', data);
                setOrderList(data || []);
            }
            //setLoading(false);
        }
        if (activeTab == 'history') {
            fetchOrders();
        }
    }, [activeTab]);

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
                                <div className="flex items-center justify-between mb-4">
                                    <h2 className="text-xl font-bold">수리 접수하기</h2>
                                    <Button
                                        variant="outline"
                                        className="text-xs px-2 py-1 h-auto border-gray-300 hover:bg-gray-100"
                                        onClick={resetForm}
                                    ><i className="fa-solid fa-arrows-rotate"></i>
                                        초기화
                                    </Button>
                                </div>
                                <p className="text-gray-600 mb-6">기계 정보와 고장 내용을 입력해 주세요.</p>

                                {/* 수리 접수 폼 내용 */}
                                <div className="space-y-6">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">기계 종류</label>
                                        <div className="grid grid-cols-3 gap-3">
                                            {machineList.map((type, index) => {
                                                const isSelected = state.selectedMachines.includes(type);

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
                                            value={state.modelName}
                                            onChange={(e) => dispatch({
                                                type: 'SET_MODEL_NAME',
                                                payload: e.target.value
                                            })}
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium mb-2">사진 첨부(선택)</label>
                                        <div
                                            className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center cursor-pointer hover:bg-gray-50 transition-colors"
                                            onClick={handleImageUpload}
                                        >
                                            {images.length > 0 ? (
                                                <div className="flex flex-col items-center">
                                                    <i className="fas fa-check-circle text-green-500 text-2xl mb-2"/>
                                                    <p className="text-sm text-gray-600">이미지가 업로드되었습니다</p>
                                                    <div className="flex flex-wrap gap-3 mt-4">
                                                        {images.map((file, index) => (
                                                            <div key={index} className="relative w-20 h-20">
                                                                {/* X 아이콘 */}
                                                                <button
                                                                    type="button"
                                                                    onClick={(e) => {
                                                                        e.stopPropagation(); // 클릭 이벤트 전파 방지
                                                                        removeImage(index);
                                                                    }}
                                                                    className="absolute -top-2 -right-2 bg-white rounded-full border border-gray-300 shadow text-xs w-5 h-5 flex items-center justify-center hover:bg-red-500 hover:text-white transition"
                                                                >
                                                                    <i className="fa fa-times" aria-hidden="true"></i>
                                                                </button>

                                                                {/* 이미지 미리보기 */}
                                                                <img
                                                                    src={URL.createObjectURL(file)}
                                                                    alt={`업로드된 이미지 ${index + 1}`}
                                                                    className="w-full h-full object-cover rounded-lg border"
                                                                />
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            ) : (
                                                <div className="flex items-center justify-center flex-col">
                                                    <i className="fas fa-camera text-gray-400 text-2xl mb-2"/>
                                                    <p className="text-sm text-gray-600">클릭하여 사진을 첨부하세요</p>
                                                    <p className="text-xs text-gray-500 mt-1">(최대 3장)</p>
                                                </div>
                                            )}
                                        </div>

                                        {/* 숨겨진 파일 선택 input */}
                                        <input
                                            type="file"
                                            accept="image/*"
                                            multiple
                                            hidden
                                            ref={fileInputRef}
                                            onChange={handleFilesChange}
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium mb-2">희망 방문 일시</label>
                                        <Input
                                            type="datetime-local"
                                            className="w-full"
                                            value={state.selectedDate}
                                            onChange={handleDateChange}
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium mb-2">담당자 연락처</label>
                                        <Input
                                            type="text"
                                            placeholder="01012345678"
                                            className="w-full border-gray-300"
                                            value={state.phoneNumber}
                                            onChange={(e) => dispatch({
                                                type: 'SET_PHONE_NUMBER',
                                                payload: e.target.value
                                            })}
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium mb-2">방문 장소</label>
                                        <Input
                                            type="text"
                                            value={state.address}
                                            readOnly
                                            className="w-full border-gray-300"
                                            placeholder="주소를 검색해주세요"
                                            onClick={handleSearchAddress}
                                        />
                                        {(isSelectedAddress || !!state.detailAddress) &&
                                            <Input
                                                type="text"
                                                value={state.detailAddress}
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
                                            value={state.symptomDescription}
                                            onChange={(e) => dispatch({
                                                type: 'SET_SYMPTOM_DESCRIPTION',
                                                payload: e.target.value
                                            })}
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
                                    {orderList.length > 0 ?
                                        orderList.map((item, index) => (
                                            <Card key={index} className="border border-gray-200 shadow-sm">
                                                <CardContent className="p-4">
                                                    <div className="flex justify-between items-start mb-2">
                                                        <div>
                                                            <h4 className="font-bold">{item.model_name}</h4>
                                                            <p className="text-sm text-gray-500">접수일: {item.created_at}</p>
                                                        </div>
                                                        <Badge variant="outline"
                                                               className="bg-blue-50 text-blue-700 border-blue-200">
                                                            {/*{item.orderStatus}*/}
                                                            접수중
                                                        </Badge>
                                                    </div>
                                                    <p className="text-sm text-gray-700 mb-3">{item.description}</p>
                                                    <Button
                                                        onClick={goDetail}
                                                        variant="outline" className="w-full text-sm !rounded-button">
                                                        상세보기
                                                    </Button>
                                                </CardContent>
                                            </Card>
                                        ))
                                        :
                                        <div className="border bg-white">
                                            <p className="text-gray-500 text-sm text-center py-10">
                                                접수 내역이 없습니다.
                                            </p>
                                        </div>
                                    }
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
                    <ChangeTabDialog isOpen={isDialogOpen} onClose={handleDialogClose}
                                     onSaveAndMove={() => handleDialogConfirm(false)}
                                     onMove={() => handleDialogConfirm(true)}/>
                    <LoginRequiredDialog
                        isOpen={showLoginPopup}
                        onClose={() => setShowLoginPopup(false)}
                    />
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

