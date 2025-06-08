'use client'

import React, {useState} from "react";
import {Badge} from "@/components/ui/badge";
import {Button} from "@/components/ui/button";
import {Card} from "@/components/ui/card";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import {Progress} from "@/components/ui/progress";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs";
import {ScrollArea} from "@/components/ui/scroll-area";
import {Dialog, DialogContent, DialogTrigger} from "@/components/ui/dialog";
import Bottom from "@/app/common/components/Bottom";
import {useRouter} from "next/navigation";

const App = () => {
    const router = useRouter();
    const [activeTab, setActiveTab] = useState<string>("review");
    const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(
        null,
    );

    const goReview = () => {
        return router.push('/review');
    }

    const repairDetails = {
        id: 1,
        machineName: "데커 컨벡션 오븐 DKO-8B",
        machineModel: "DKO-8B",
        manufacturer: "데커 주방기기",
        repairDetails: "온도 센서 교체 및 컨트롤러 수리",
        date: "2025-05-20",
        completionDate: "2025-05-21",
        rating: 5,
        status: "완료",
        cost: "285,000원",
        partsCost: "180,000원",
        laborCost: "105,000원",
        warranty: "부품 6개월, 기술 3개월",
        technician: {
            name: "김민수 기술자",
            id: "tech123",
            specialty: "상업용 오븐 전문",
            experience: "8년",
            rating: 4.9,
            completedRepairs: 342,
            responseTime: "평균 30분 이내",
        },
        beforeAfterImages: [
            {
                id: 1,
                type: "수리 전",
                url: "https://readdy.ai/api/search-image?query=Commercial%20convection%20oven%20with%20exposed%20wiring%20and%20damaged%20control%20panel%2C%20detailed%20close-up%20of%20malfunctioning%20temperature%20sensor%2C%20technical%20inspection%20view%2C%20broken%20display%20screen%2C%20professional%20diagnostic%20photo%2C%20isolated%20on%20clean%20white%20background%2C%20clear%20visibility%20of%20damaged%20components&width=300&height=200&seq=1&orientation=landscape",
                description: "온도 센서 손상 및 컨트롤 패널 오작동 상태",
            },
            {
                id: 2,
                type: "수리 중",
                url: "https://readdy.ai/api/search-image?query=Commercial%20convection%20oven%20repair%20in%20progress%2C%20technician%20hands%20replacing%20temperature%20sensor%2C%20open%20control%20panel%20with%20visible%20circuit%20boards%2C%20professional%20repair%20work%2C%20technical%20maintenance%20view%2C%20tools%20and%20replacement%20parts%20visible%2C%20clean%20workspace%20environment&width=300&height=200&seq=2&orientation=landscape",
                description: "온도 센서 교체 및 컨트롤러 회로 수리 작업",
            },
            {
                id: 3,
                type: "수리 후",
                url: "https://readdy.ai/api/search-image?query=Fully%20repaired%20commercial%20convection%20oven%20with%20new%20control%20panel%2C%20pristine%20condition%20after%20maintenance%2C%20professional%20product%20photography%2C%20functioning%20digital%20display%2C%20clean%20stainless%20steel%20finish%2C%20ready%20for%20operation%2C%20isolated%20on%20white%20background%2C%20high-quality%20detailed%20image&width=300&height=200&seq=3&orientation=landscape",
                description: "새 온도 센서 및 컨트롤러 설치 완료 상태",
            },
            {
                id: 4,
                type: "테스트",
                url: "https://readdy.ai/api/search-image?query=Commercial%20convection%20oven%20in%20testing%20phase%20after%20repair%2C%20temperature%20display%20showing%20correct%20readings%2C%20diagnostic%20test%20in%20progress%2C%20technical%20verification%20process%2C%20professional%20equipment%20testing%2C%20quality%20control%20check%2C%20clean%20laboratory%20environment&width=300&height=200&seq=4&orientation=landscape",
                description: "수리 후 온도 테스트 및 작동 확인",
            },
        ],
        reviewContent: `데커 컨벡션 오븐 DKO-8B 모델을 사용한지 약 2년 정도 되었는데, 갑자기 온도가 불규칙하게 올라가고 디스플레이가 깜빡이는 문제가 발생했습니다. 빵집을 운영하다 보니 오븐이 멈추면 영업에 큰 차질이 생겨서 급하게 수리를 요청했습니다. 김민수 기술자님이 당일에 방문해주셔서 정말 감사했습니다. 오븐을 꼼꼼하게 점검하시더니 온도 센서가 손상되었고 컨트롤러에도 문제가 있다고 진단해주셨습니다. 부품을 교체하고 회로를 수리하는 데 총 4시간 정도 걸렸지만, 작업 과정을 상세히 설명해주시고 수리 후에는 오븐 사용 시 주의사항까지 친절하게 알려주셨습니다. 수리 비용은 예상보다 조금 높았지만, 부품 품질이 좋고 워런티도 제공해주셔서 만족스럽습니다. 수리 후에는 온도가 정확하게 유지되고 디스플레이도 안정적으로 작동합니다. 오히려 수리 전보다 성능이 좋아진 것 같아 매우 만족스럽습니다. 특히 김민수 기술자님의 전문성과 친절함에 감동받았습니다. 다른 주방 기기에 문제가 생겨도 꼭 다시 연락드리고 싶습니다. 빠른 대응과 완벽한 수리 서비스에 진심으로 감사드립니다.`,
        additionalNotes: "수리 후 3개월간 무상 점검 서비스 제공",
    };

    return (
        <div className="flex flex-col min-h-screen bg-gray-50 w-[375px] mx-auto relative">
            <div className="flex flex-col w-[375px] min-h-[762px] bg-gray-50 relative pb-16">
                {/* Header */}

                <header className="fixed top-0 w-[375px] z-10 bg-white shadow-sm p-4 flex items-center">
                    <button
                        onClick={() => goReview()}
                        className="mr-3 cursor-pointer bg-transparent border-none p-0"
                    >
                        <i className="fas fa-arrow-left text-gray-700"></i>
                    </button>
                    <h1 className="text-lg font-bold">후기 접수 상세</h1>
                </header>

                {/* Main Content */}
                <div className="mt-[62px] px-4 pb-20">
                    {/* Machine Info Section */}
                    <Card className="p-4 mt-3 bg-white !rounded-button">
                        <div className="flex justify-between items-start">
                            <div>
                                <h2 className="text-xl font-semibold text-gray-800">
                                    {repairDetails.machineName}
                                </h2>
                                <p className="text-sm text-gray-600 mt-1">
                                    모델: {repairDetails.machineModel} | 제조사:{" "}
                                    {repairDetails.manufacturer}
                                </p>
                            </div>
                            <Badge className="bg-blue-600 hover:bg-blue-700">
                                {repairDetails.status}
                            </Badge>
                        </div>

                        <div className="flex items-center mt-2">
                            <div className="flex text-yellow-400 mr-2">
                                {[...Array(5)].map((_, i) => (
                                    <i
                                        key={i}
                                        className={`${i < repairDetails.rating ? "fas" : "far"} fa-star`}
                                    ></i>
                                ))}
                            </div>
                            <span className="text-sm text-gray-700 font-medium">
              {repairDetails.rating}.0
            </span>
                        </div>
                    </Card>

                    {/* Repair Details Section */}
                    <Card className="p-4 mt-3 bg-white !rounded-button">
                        <h3 className="text-lg font-medium text-gray-800">수리 내역</h3>
                        <div className="flex items-start mb-2">
                            <div className="bg-blue-100 rounded-full p-2 mr-3">
                                <i className="fas fa-tools text-blue-600"></i>
                            </div>
                            <div>
                                <p className="text-sm font-medium text-gray-800">수리 내용</p>
                                <p className="text-sm text-gray-600 mt-1">
                                    {repairDetails.repairDetails}
                                </p>
                            </div>
                        </div>
                        <div className="flex items-start">
                            <div className="bg-blue-100 rounded-full p-2 mr-3">
                                <i className="fas fa-shield-alt text-blue-600"></i>
                            </div>
                            <div>
                                <p className="text-sm font-medium text-gray-800">품질 보증</p>
                                <p className="text-sm text-gray-600 mt-1">
                                    {repairDetails.warranty}
                                </p>
                            </div>
                        </div>
                    </Card>

                    {/* Technician Info Section */}
                    <Card className="p-4 mt-3 bg-white !rounded-button">
                        <h3 className="text-lg font-medium text-gray-800 mb-3">
                            수리 기사 정보
                        </h3>

                        <div className="flex items-center">
                            <Avatar className="h-16 w-16 mr-4">
                                <AvatarImage
                                    src="https://readdy.ai/api/search-image?query=Professional%20Asian%20male%20technician%20in%20uniform%2C%20portrait%20photo%2C%20friendly%20smile%2C%20technical%20expert%2C%20professional%20headshot%2C%20clean%20background%2C%20high%20quality%20portrait%2C%20maintenance%20engineer%2C%2040%20years%20old&width=100&height=100&seq=5&orientation=squarish"/>
                                <AvatarFallback>KM</AvatarFallback>
                            </Avatar>

                            <div>
                                <div className="flex items-center">
                                    <h4 className="font-medium text-gray-800">
                                        {repairDetails.technician.name}
                                    </h4>
                                    <Badge className="ml-2 bg-blue-100 text-blue-800 hover:bg-blue-200">
                                        인증
                                    </Badge>
                                </div>
                                <p className="text-sm text-gray-600 mt-1">
                                    {repairDetails.technician.specialty}
                                </p>
                                <div className="flex items-center mt-1">
                                    <div className="flex text-yellow-400 text-xs mr-1">
                                        <i className="fas fa-star"></i>
                                    </div>
                                    <span className="text-xs text-gray-700">
                  {repairDetails.technician.rating}
                </span>
                                    <span className="text-xs text-gray-500 mx-1">|</span>
                                    <span className="text-xs text-gray-600">
                  경력 {repairDetails.technician.experience}
                </span>
                                </div>
                            </div>
                        </div>

                        <div className="mt-4 grid grid-cols-2 gap-3">
                            <div className="bg-gray-50 p-3 rounded-lg">
                                <p className="text-xs text-gray-500 mb-1">완료한 수리</p>
                                <p className="text-base font-medium text-gray-800">
                                    {repairDetails.technician.completedRepairs}건
                                </p>
                            </div>
                            <div className="bg-gray-50 p-3 rounded-lg">
                                <p className="text-xs text-gray-500 mb-1">응답 시간</p>
                                <p className="text-base font-medium text-gray-800">
                                    {repairDetails.technician.responseTime}
                                </p>
                            </div>
                        </div>
                    </Card>

                    {/* Before/After Photos */}
                    <Card className="p-4 mt-3 bg-white !rounded-button">
                        <h3 className="text-lg font-medium text-gray-800 mb-3">
                            수리 전/후 사진
                        </h3>

                        <ScrollArea className="w-full">
                            <div className="flex space-x-3 pb-2">
                                {repairDetails.beforeAfterImages.map((image, index) => (
                                    <Dialog key={image.id}>
                                        <DialogTrigger asChild>
                                            <div
                                                className="flex-none cursor-pointer !rounded-button"
                                                onClick={() => setSelectedImageIndex(index)}
                                            >
                                                <div
                                                    className="relative w-[150px] h-[100px] rounded-lg overflow-hidden">
                                                    <img
                                                        src={image.url}
                                                        alt={image.description}
                                                        className="w-full h-full object-cover"
                                                    />
                                                    <div className="absolute top-2 left-2">
                                                        <Badge
                                                            className="bg-black bg-opacity-70 text-white hover:bg-black hover:bg-opacity-80">
                                                            {image.type}
                                                        </Badge>
                                                    </div>
                                                </div>
                                                <p className="text-xs text-gray-600 mt-1 w-[150px] truncate">
                                                    {image.description}
                                                </p>
                                            </div>
                                        </DialogTrigger>
                                        <DialogContent className="p-0 max-w-[350px] !rounded-button">
                                            <div className="relative">
                                                <img
                                                    src={image.url}
                                                    alt={image.description}
                                                    className="w-full h-auto"
                                                />
                                                <div className="absolute top-4 left-4">
                                                    <Badge
                                                        className="bg-black bg-opacity-70 text-white hover:bg-black hover:bg-opacity-80">
                                                        {image.type}
                                                    </Badge>
                                                </div>
                                            </div>
                                            <div className="p-4">
                                                <p className="text-sm text-gray-800">
                                                    {image.description}
                                                </p>
                                            </div>
                                        </DialogContent>
                                    </Dialog>
                                ))}
                            </div>
                        </ScrollArea>
                    </Card>

                    {/* Review Content */}
                    <Card className="p-4 mt-3 bg-white !rounded-button">
                        <h3 className="text-lg font-medium text-gray-800 mb-3">상세 후기</h3>

                        <div className="text-sm text-gray-700 whitespace-pre-line">
                            {repairDetails.reviewContent
                                .split("\n\n")
                                .map((paragraph, index) => (
                                    <p key={index} className="mb-3">
                                        {paragraph}
                                    </p>
                                ))}
                        </div>

                        <div className="mt-4 bg-blue-50 p-3 rounded-lg">
                            <div className="flex items-start">
                                <i className="fas fa-info-circle text-blue-600 mt-1 mr-2"></i>
                                <div>
                                    <p className="text-sm font-medium text-gray-800">추가 정보</p>
                                    <p className="text-sm text-gray-600 mt-1">
                                        {repairDetails.additionalNotes}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default App;
