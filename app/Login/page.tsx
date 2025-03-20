import { Button } from "@/components/ui/button";

export default function LoginPage() {
    return (
        <div className="flex min-h-screen items-center justify-center">
            <Button>카카오 로그인</Button>
            <Button variant="outline">네이버 로그인</Button>
        </div>
    );
}
