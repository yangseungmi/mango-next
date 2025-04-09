'use client'

import {useRouter} from "next/navigation";
import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import {GoogleLogin} from "@react-oauth/google";
import {jwtDecode} from "jwt-decode";


const LoginPage = () => {
    const router = useRouter();

    const handleLogin = (e) => {
        // 디폴트 페이지로 이동
        e.preventDefault();
        return router.push("/");
    };

    return (
        <div
            className="flex flex-col items-center justify-start min-h-screen bg-gray-50 w-[375px] mx-auto relative pt-16 pb-20">
            <div className="w-full px-6 flex flex-col items-center">
                <div className="mb-10 text-center">
                    <img
                        src="https://public.readdy.ai/ai/img_res/4ba65858292cddfd74a8740485886f48.jpg"
                        alt="베이커리 기계 수리 서비스 로고"
                        className="w-28 h-28 mx-auto mb-4"
                    />
                    <h1 className="text-2xl font-bold text-gray-800">베이커리 기계 수리 서비스</h1>
                    <p className="text-gray-600 mt-2">전문적인 수리 서비스로 빠르게 해결해 드립니다</p>
                </div>

                <form onSubmit={handleLogin} className="w-full space-y-4">
                    <div>
                        <Input
                            type="email"
                            placeholder="이메일 주소"
                            className="w-full h-12 px-4 rounded-lg border border-gray-300 focus:border-blue-500"
                            required
                        />
                    </div>
                    <div className="relative">
                        <Input
                            type="password"
                            placeholder="비밀번호"
                            className="w-full h-12 px-4 rounded-lg border border-gray-300 focus:border-blue-500"
                            required
                        />
                        <button type="button"
                                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                            <i className="fas fa-eye-slash"></i>
                        </button>
                    </div>

                    <Button
                        type="submit"
                        className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white font-medium !rounded-button"
                    >
                        로그인
                    </Button>
                </form>

                <div className="flex justify-between w-full mt-4 text-sm">
                    <a href="#" className="text-gray-600 hover:text-blue-600">회원가입</a>
                    <a href="#" className="text-gray-600 hover:text-blue-600">비밀번호 찾기</a>
                </div>

                <div className="mt-8 w-full">
                    <div className="flex items-center mb-4">
                        <div className="flex-grow h-px bg-gray-300"></div>
                        <span className="px-3 text-gray-500 text-sm">소셜 로그인</span>
                        <div className="flex-grow h-px bg-gray-300"></div>
                    </div>

                    {/*<div className="grid grid-cols-3 gap-3">*/}
                    {/*    <Button variant="outline"*/}
                    {/*            className="h-12 flex items-center justify-center bg-yellow-400 border-none text-black hover:bg-yellow-500 !rounded-button">*/}
                    {/*        <i className="fas fa-comment text-lg mr-2"></i>*/}
                    {/*        카카오*/}
                    {/*    </Button>*/}
                    {/*    <Button variant="outline"*/}
                    {/*            className="h-12 flex items-center justify-center bg-green-500 border-none text-white hover:bg-green-600 !rounded-button">*/}
                    {/*        <i className="fas fa-n text-lg mr-2"></i>*/}
                    {/*        네이버*/}
                    {/*    </Button>*/}
                    {/*</div>*/}
                    <div>
                        <GoogleLogin
                            onSuccess={(credentialResponse) => {
                                const decoded = jwtDecode(credentialResponse.credential!);
                                console.log('✅ 로그인 성공:', decoded);
                                router.push("/");
                            }}
                            onError={() => {
                                console.log('❌ 로그인 실패')
                            }}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;

