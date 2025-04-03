'use client'

import React, { useState } from 'react';
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent
} from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState("메인");
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedMachine, setSelectedMachine] = useState<string>('');
  const [symptomDescription, setSymptomDescription] = useState<string>('');
  const [imageUploaded, setImageUploaded] = useState<boolean>(false);
  const swiperModules = [Pagination, Autoplay];
  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedDate(e.target.value);
  };
  const isFormValid = () => {
    return selectedMachine && symptomDescription && selectedDate && imageUploaded;
  };
  const handleImageUpload = () => {
    setImageUploaded(true);
  };
  return (
      <div className="bg-gray-50 min-h-screen w-[375px] pb-16">
        <Tabs defaultValue="메인" value={activeTab} onValueChange={setActiveTab} className="w-full">
          {/* 메인 페이지 */}
          <TabsContent value="메인" className="mt-0 pt-16 pb-20">
            <div className="fixed top-0 w-[375px] z-10 bg-white shadow-sm p-4 flex justify-between items-center">
              <div className="flex items-center">
                <img
                    src="https://public.readdy.ai/ai/img_res/f80578e9af04200d1a2b471e95f4d048.jpg"
                    alt="베이커리 A/S 로고"
                    className="h-8 w-8 mr-2"
                />
                <h1 className="text-xl font-bold text-blue-600">베이커리 A/S 서비스</h1>
              </div>
              <button className="cursor-pointer text-gray-600 relative">
                <i className="fas fa-bell text-xl"></i>
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">3</span>
              </button>
            </div>
            <div className="px-4 mt-4">
              <div className="mb-6">
                <h2 className="text-lg font-medium mb-3">최근 수리한 베이커리</h2>
                <div className="grid grid-cols-4 gap-3">
                  <div className="flex flex-col items-center">
                    <div className="w-full aspect-square rounded-lg overflow-hidden mb-1">
                      <img
                          src="https://public.readdy.ai/ai/img_res/1949e6a615fce694e4eff683ccedabfd.jpg"
                          alt="파리 베이커리"
                          className="w-full h-full object-cover"
                      />
                    </div>
                    <span className="text-xs text-center whitespace-nowrap overflow-hidden text-overflow-ellipsis w-full">파리 베이커리</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="w-full aspect-square rounded-lg overflow-hidden mb-1">
                      <img
                          src="https://public.readdy.ai/ai/img_res/b782c98edb509af16987f260c1fbafe5.jpg"
                          alt="성심당"
                          className="w-full h-full object-cover"
                      />
                    </div>
                    <span className="text-xs text-center whitespace-nowrap overflow-hidden text-overflow-ellipsis w-full">성심당</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="w-full aspect-square rounded-lg overflow-hidden mb-1">
                      <img
                          src="https://public.readdy.ai/ai/img_res/3b20a2115eae5ee9147f218634ffcc1c.jpg"
                          alt="뚜레쥬르"
                          className="w-full h-full object-cover"
                      />
                    </div>
                    <span className="text-xs text-center whitespace-nowrap overflow-hidden text-overflow-ellipsis w-full">뚜레쥬르</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="w-full aspect-square rounded-lg overflow-hidden mb-1">
                      <img
                          src="https://public.readdy.ai/ai/img_res/2dbc54990b3b00130957e9b9b4c3514c.jpg"
                          alt="타르틴"
                          className="w-full h-full object-cover"
                      />
                    </div>
                    <span className="text-xs text-center whitespace-nowrap overflow-hidden text-overflow-ellipsis w-full">타르틴</span>
                  </div>
                </div>
              </div>
              <Card className="mb-6 border-none shadow-md">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg font-medium">진행 중인 A/S 현황</CardTitle>
                  <CardDescription>현재 {3}건의 A/S가 진행 중입니다.</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-between items-center mb-3">
                    <div className="flex items-center space-x-4">
                      <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
                      <span>접수 대기</span>
                    </div>
                    <span className="font-medium">1건</span>
                  </div>
                  <div className="flex justify-between items-center mb-3">
                    <div className="flex items-center space-x-4">
                      <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                      <span>처리 중</span>
                    </div>
                    <span className="font-medium">2건</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center space-x-4">
                      <div className="w-2 h-2 rounded-full bg-green-500"></div>
                      <span>완료</span>
                    </div>
                    <span className="font-medium">0건</span>
                  </div>
                </CardContent>
              </Card>
              <h2 className="text-lg font-medium mb-3">최근 접수 내역</h2>
              <Card className="mb-4 border border-gray-200 shadow-sm hover:shadow-md transition-shadow cursor-pointer">
                <CardContent className="p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium">오븐 온도 조절 불량</h3>
                      <p className="text-sm text-gray-500 mt-1">접수일: 2025-04-02</p>
                      <p className="text-sm text-gray-500">방문 예정: 2025-04-05</p>
                    </div>
                    <Badge className="bg-yellow-500 hover:bg-yellow-600">접수 대기</Badge>
                  </div>
                </CardContent>
              </Card>
              <Card className="mb-4 border border-gray-200 shadow-sm hover:shadow-md transition-shadow cursor-pointer">
                <CardContent className="p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium">믹서기 모터 소음</h3>
                      <p className="text-sm text-gray-500 mt-1">접수일: 2025-04-01</p>
                      <p className="text-sm text-gray-500">방문 예정: 2025-04-04</p>
                    </div>
                    <Badge className="bg-blue-500 hover:bg-blue-600">처리 중</Badge>
                  </div>
                </CardContent>
              </Card>
              <Card className="mb-6 border border-gray-200 shadow-sm hover:shadow-md transition-shadow cursor-pointer">
                <CardContent className="p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium">반죽기 회전 불량</h3>
                      <p className="text-sm text-gray-500 mt-1">접수일: 2025-03-30</p>
                      <p className="text-sm text-gray-500">방문 예정: 2025-04-03</p>
                    </div>
                    <Badge className="bg-blue-500 hover:bg-blue-600">처리 중</Badge>
                  </div>
                </CardContent>
              </Card>
              <Button
                  className="w-full py-6 text-lg font-medium bg-blue-600 hover:bg-blue-700 shadow-lg !rounded-button mb-6"
                  onClick={() => setActiveTab("접수")}
              >
                <i className="fas fa-tools mr-2"></i> 빠른 A/S 접수하기
              </Button>
              <h2 className="text-lg font-medium mb-3">베이커리 기계</h2>
              <div className="grid grid-cols-4 gap-3 mb-6">
                <div className="flex flex-col items-center">
                  <div className="w-full aspect-square rounded-lg overflow-hidden mb-1">
                    <img
                        src="https://public.readdy.ai/ai/img_res/9bc6606d46e042a3c3403e7393c9aa09.jpg"
                        alt="믹서기"
                        className="w-full h-full object-cover"
                    />
                  </div>
                  <span className="text-xs text-center whitespace-nowrap overflow-hidden text-overflow-ellipsis w-full">믹서기</span>
                </div>
                <div className="flex flex-col items-center">
                  <div className="w-full aspect-square rounded-lg overflow-hidden mb-1">
                    <img
                        src="https://public.readdy.ai/ai/img_res/b11fbbc6207662c1b386a4be27ecbe8f.jpg"
                        alt="오븐"
                        className="w-full h-full object-cover"
                    />
                  </div>
                  <span className="text-xs text-center whitespace-nowrap overflow-hidden text-overflow-ellipsis w-full">오븐</span>
                </div>
                <div className="flex flex-col items-center">
                  <div className="w-full aspect-square rounded-lg overflow-hidden mb-1">
                    <img
                        src="https://public.readdy.ai/ai/img_res/e8e58739cdadcf0907a0e1e9871e0fe8.jpg"
                        alt="반죽기"
                        className="w-full h-full object-cover"
                    />
                  </div>
                  <span className="text-xs text-center whitespace-nowrap overflow-hidden text-overflow-ellipsis w-full">반죽기</span>
                </div>
                <div className="flex flex-col items-center">
                  <div className="w-full aspect-square rounded-lg overflow-hidden mb-1">
                    <img
                        src="https://public.readdy.ai/ai/img_res/62fe2190d6c571af81a1e4612ff277e4.jpg"
                        alt="제빵기"
                        className="w-full h-full object-cover"
                    />
                  </div>
                  <span className="text-xs text-center whitespace-nowrap overflow-hidden text-overflow-ellipsis w-full">제빵기</span>
                </div>
              </div>

              <h2 className="text-lg font-medium mb-3">공지사항 및 이벤트</h2>
              <div className="rounded-xl overflow-hidden mb-6">
                <Swiper
                    modules={swiperModules}
                    pagination={{ clickable: true }}
                    autoplay={{ delay: 5000 }}
                    className="h-[160px] rounded-xl"
                >
                  <SwiperSlide>
                    <img
                        src="https://public.readdy.ai/ai/img_res/32deb6963440d91bcb450463ccdc0e6c.jpg"
                        alt="베이커리 기계 수리 이벤트 배너"
                        className="w-full h-full object-cover"
                    />
                  </SwiperSlide>
                </Swiper>
              </div>
            </div>
          </TabsContent>
          {/* 접수 페이지 */}
          <TabsContent value="접수" className="mt-0 pt-16 pb-20">
            <div className="fixed top-0 w-[375px] z-10 bg-white shadow-sm p-4">
              <h1 className="text-xl font-bold text-center">기계 고장 접수</h1>
            </div>
            <div className="px-4 mt-4">
              <Card className="border-none shadow-md mb-6">
                <CardContent className="p-5">
                  <form className="space-y-5">
                    <div>
                      <label className="block text-sm font-medium mb-2">기계 종류</label>
                      <Select value={selectedMachine} onValueChange={setSelectedMachine}>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="기계 종류를 선택하세요" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="믹서기">믹서기</SelectItem>
                          <SelectItem value="오븐">오븐</SelectItem>
                          <SelectItem value="반죽기">반죽기</SelectItem>
                          <SelectItem value="제빵기">제빵기</SelectItem>
                          <SelectItem value="발효기">발효기</SelectItem>
                          <SelectItem value="냉장쇼케이스">냉장쇼케이스</SelectItem>
                          <SelectItem value="기타">기타</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">고장 증상</label>
                      <Textarea
                          placeholder="고장 증상을 자세히 설명해주세요"
                          className="resize-none h-24"
                          value={symptomDescription}
                          onChange={(e) => setSymptomDescription(e.target.value)}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">사진 첨부</label>
                      <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center cursor-pointer hover:bg-gray-50 transition-colors" onClick={handleImageUpload}>
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
                    <Button
                        className="w-full py-5 text-lg font-medium bg-blue-600 hover:bg-blue-700 shadow-md !rounded-button"
                        disabled={!isFormValid()}
                    >
                      접수하기
                    </Button>
                  </form>
                </CardContent>
              </Card>
              <div className="bg-blue-50 rounded-lg p-4 mb-6">
                <h3 className="font-medium text-blue-700 mb-2 flex items-center">
                  <i className="fas fa-info-circle mr-2"></i> 접수 안내
                </h3>
                <ul className="text-sm text-blue-700 space-y-2">
                  <li>• 접수 후 담당자가 확인하여 연락드립니다.</li>
                  <li>• 정확한 증상 설명과 사진 첨부는 빠른 해결에 도움이 됩니다.</li>
                  <li>• 희망 방문 일시는 상황에 따라 조정될 수 있습니다.</li>
                </ul>
              </div>
            </div>
          </TabsContent>
          {/* 내정보 페이지 */}
          <TabsContent value="내정보" className="mt-0 pt-16 pb-20">
            <div className="fixed top-0 w-[375px] z-10 bg-white shadow-sm p-4">
              <h1 className="text-xl font-bold text-center">내 정보</h1>
            </div>
            <div className="px-4 mt-4">
              <Card className="border-none shadow-md mb-6">
                <CardContent className="p-5">
                  <div className="flex items-center space-x-4">
                    <Avatar className="h-16 w-16">
                      <AvatarImage src="https://public.readdy.ai/ai/img_res/b1586fe62598bc3b6e230538708a1c88.jpg" />
                      <AvatarFallback>김</AvatarFallback>
                    </Avatar>
                    <div>
                      <h2 className="text-lg font-medium">김민수</h2>
                      <p className="text-sm text-gray-500">010-1234-5678</p>
                      <p className="text-sm text-gray-500">minsu.kim@example.com</p>
                    </div>
                  </div>
                  <Button variant="outline" className="w-full mt-4 cursor-pointer !rounded-button">
                    <i className="fas fa-user-edit mr-2"></i> 프로필 수정
                  </Button>
                </CardContent>
              </Card>
              <h2 className="text-lg font-medium mb-3">나의 접수 내역</h2>
              <div className="flex space-x-2 mb-4 overflow-x-auto py-1">
                <Badge variant="outline" className="px-3 py-1 cursor-pointer bg-blue-600 text-white">전체</Badge>
                <Badge variant="outline" className="px-3 py-1 cursor-pointer">접수 대기</Badge>
                <Badge variant="outline" className="px-3 py-1 cursor-pointer">처리 중</Badge>
                <Badge variant="outline" className="px-3 py-1 cursor-pointer">완료</Badge>
              </div>
              <ScrollArea className="h-[300px] rounded-md">
                <Card className="mb-3 border border-gray-200 shadow-sm hover:shadow-md transition-shadow cursor-pointer">
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-medium">오븐 온도 조절 불량</h3>
                        <p className="text-sm text-gray-500 mt-1">접수일: 2025-04-02</p>
                        <p className="text-sm text-gray-500">방문 예정: 2025-04-05</p>
                      </div>
                      <Badge className="bg-yellow-500 hover:bg-yellow-600">접수 대기</Badge>
                    </div>
                  </CardContent>
                </Card>
                <Card className="mb-3 border border-gray-200 shadow-sm hover:shadow-md transition-shadow cursor-pointer">
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-medium">믹서기 모터 소음</h3>
                        <p className="text-sm text-gray-500 mt-1">접수일: 2025-04-01</p>
                        <p className="text-sm text-gray-500">방문 예정: 2025-04-04</p>
                      </div>
                      <Badge className="bg-blue-500 hover:bg-blue-600">처리 중</Badge>
                    </div>
                  </CardContent>
                </Card>
                <Card className="mb-3 border border-gray-200 shadow-sm hover:shadow-md transition-shadow cursor-pointer">
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-medium">반죽기 회전 불량</h3>
                        <p className="text-sm text-gray-500 mt-1">접수일: 2025-03-30</p>
                        <p className="text-sm text-gray-500">방문 예정: 2025-04-03</p>
                      </div>
                      <Badge className="bg-blue-500 hover:bg-blue-600">처리 중</Badge>
                    </div>
                  </CardContent>
                </Card>
                <Card className="mb-3 border border-gray-200 shadow-sm hover:shadow-md transition-shadow cursor-pointer">
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-medium">제빵기 타이머 오작동</h3>
                        <p className="text-sm text-gray-500 mt-1">접수일: 2025-03-20</p>
                        <p className="text-sm text-gray-500">방문일: 2025-03-25</p>
                      </div>
                      <Badge className="bg-green-500 hover:bg-green-600">완료</Badge>
                    </div>
                  </CardContent>
                </Card>
                <Card className="mb-3 border border-gray-200 shadow-sm hover:shadow-md transition-shadow cursor-pointer">
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-medium">냉장쇼케이스 온도 이상</h3>
                        <p className="text-sm text-gray-500 mt-1">접수일: 2025-03-15</p>
                        <p className="text-sm text-gray-500">방문일: 2025-03-18</p>
                      </div>
                      <Badge className="bg-green-500 hover:bg-green-600">완료</Badge>
                    </div>
                  </CardContent>
                </Card>
              </ScrollArea>
              <h2 className="text-lg font-medium mt-6 mb-3">설정</h2>
              <Card className="border-none shadow-md mb-6">
                <CardContent className="p-0">
                  <div className="cursor-pointer hover:bg-gray-50 transition-colors p-4 flex justify-between items-center border-b border-gray-100">
                    <div className="flex items-center">
                      <i className="fas fa-bell text-gray-500 w-6"></i>
                      <span className="ml-3">알림 설정</span>
                    </div>
                    <i className="fas fa-chevron-right text-gray-400"></i>
                  </div>
                  <div className="cursor-pointer hover:bg-gray-50 transition-colors p-4 flex justify-between items-center border-b border-gray-100">
                    <div className="flex items-center">
                      <i className="fas fa-shield-alt text-gray-500 w-6"></i>
                      <span className="ml-3">개인정보 관리</span>
                    </div>
                    <i className="fas fa-chevron-right text-gray-400"></i>
                  </div>
                  <div className="cursor-pointer hover:bg-gray-50 transition-colors p-4 flex justify-between items-center border-b border-gray-100">
                    <div className="flex items-center">
                      <i className="fas fa-headset text-gray-500 w-6"></i>
                      <span className="ml-3">고객센터</span>
                    </div>
                    <i className="fas fa-chevron-right text-gray-400"></i>
                  </div>
                  <div className="cursor-pointer hover:bg-gray-50 transition-colors p-4 flex justify-between items-center">
                    <div className="flex items-center">
                      <i className="fas fa-sign-out-alt text-gray-500 w-6"></i>
                      <span className="ml-3">로그아웃</span>
                    </div>
                    <i className="fas fa-chevron-right text-gray-400"></i>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          {/* 탭 네비게이션 바 */}
          <TabsList className="fixed bottom-0 w-[375px] grid grid-cols-3 bg-white border-t border-gray-200 h-16 shadow-md z-10">
            <TabsTrigger
                value="메인"
                className="flex flex-col items-center justify-center data-[state=active]:text-blue-600 cursor-pointer"
            >
              <i className="fas fa-home text-lg"></i>
              <span className="text-xs mt-1">메인</span>
            </TabsTrigger>
            <TabsTrigger
                value="접수"
                className="flex flex-col items-center justify-center data-[state=active]:text-blue-600 cursor-pointer"
            >
              <i className="fas fa-tools text-lg"></i>
              <span className="text-xs mt-1">접수</span>
            </TabsTrigger>
            <TabsTrigger
                value="내정보"
                className="flex flex-col items-center justify-center data-[state=active]:text-blue-600 cursor-pointer"
            >
              <i className="fas fa-user text-lg"></i>
              <span className="text-xs mt-1">내정보</span>
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
  );
};
export default App
