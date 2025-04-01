import {Input} from "postcss";
import {useEffect, useState} from "react";

export default function Total() {
    const [info, setInfo] = useState([]);
    useEffect(() => {
        fetch('/api/orders/1')
            .then(response => response.json())
            .then(data => setInfo(data))
            .catch(error => console.error('Error fetching categories:', error));
    }, []);

    return (
        <div className="mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10">
            <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <h2 className="text-title-md2 font-semibold text-black ">
                    입력한 정보를 확인해주세요
                </h2>
            </div>
            <div
                className="rounded-sm border border-stroke bg-white shadow-default">
                <div className="border-b border-stroke p-4  flex gap-4 xl:flex-row">
                    <div className="w-1/3">
                        <label className="block text-sm font-medium text-black ">
                            서비스</label>
                    </div>
                    <div className="w-2/3">
                        <label className="block text-sm text-gray-600">
                            이전{/*{info["categories"]}*/}
                        </label>
                    </div>
                </div>
                <div className="border-b border-stroke p-4  flex gap-4 xl:flex-row">
                    <div className="w-1/3">
                        <label className="block text-sm font-medium text-black ">
                            기계
                        </label>
                    </div>
                    <div className="w-2/3">
                        <label className="block text-sm text-gray-600">
                            믹서기{/*{info["machines"]}*/}
                        </label>
                    </div>
                </div>
                <div className="border-b border-stroke p-4  flex gap-4 xl:flex-row">
                    <div className="w-1/3">
                        <label className="block text-sm font-medium text-black ">
                            기계 사진</label>
                    </div>
                    <div className="w-2/3 xl:flex-col">
                        <label className="block text-sm text-gray-600">
                            기계 사진 1, 기계 사진 2
                        </label>
                        <label className="block text-sm text-gray-600">
                            설명 블라블라{/*{info["status_detail"]}*/}
                        </label>
                    </div>
                </div>
                <div className="border-b border-stroke p-4  flex gap-4 xl:flex-row">
                    <div className="w-1/3">
                        <label className="block text-sm font-medium text-black ">
                            요청 날짜
                        </label>
                    </div>
                    <div className="w-2/3">
                        <label className="block text-sm text-gray-600">
                            2024/09/11 수요일 14:00 PM{/*{formatDate(info["create_date"])}*/}
                        </label>
                    </div>
                </div>
                <div className="border-b border-stroke p-4  flex gap-4 xl:flex-row">
                    <div className="w-1/3">
                        <label className="block text-sm font-medium text-black ">
                            연락처</label>
                    </div>
                    <div className="w-2/3">
                        <label className="block text-sm text-gray-600">
                            010-5627-3306{/*{info["visit_phone"])*/}
                        </label>
                    </div>
                </div>
                <div className="border-b border-stroke p-4  flex gap-4 xl:flex-row">
                    <div className="w-1/3">
                        <label className="block text-sm font-medium text-black ">
                            방문지</label>
                    </div>
                    <div className="w-2/3 xl:flex-col">
                        <label className="block text-sm text-gray-600">
                            경기도 성남시 분당구 분당동 56-9 7층 쨈쨈이네 빵집 (상가 7층)
                            {/*{info["visit_address"]} {info["visit_name"]}*/}
                        </label>
                        <label className="block text-sm text-gray-600">
                            계단 1 - 없음, 계단 2 - 확인 필요
                        </label>
                        <label className="block text-sm text-gray-600">
                            엘리베이터 - 있음
                        </label>
                        <label className="block text-sm text-gray-600">
                            주차장 - 없음
                        </label>
                    </div>
                </div>
                <div className=" p-4  flex gap-4 xl:flex-row">
                    <div className="w-1/3">
                        <label className="block text-sm font-medium text-black ">
                            요청사항</label>
                    </div>
                    <div className="w-2/3">
                        <label className="block text-sm text-gray-600">
                            백화점 폐점 후 방문해주세요. (9시){/*{info["status_detail"])*/}
                        </label>
                    </div>
                </div>
            </div>
        </div>
    );
}

