import Link from "next/link";
import { cn } from "@/lib/utils"; // ShadCN의 클래스 유틸
import { Home, User, Calendar } from "lucide-react"; // 아이콘 라이브러리 추가
import { Button } from "@/components/ui/button";

const navItems = [
    { name: "홈", href: "/", icon: Home },
    { name: "예약", href: "/reservation", icon: Calendar },
    { name: "내 정보", href: "/profile", icon: User },
];

export default function BottomNav() {

    return (
        <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-md flex justify-around py-2">
            {navItems.map((item) => {
                const Icon = item.icon;
                return (
                    <Link key={item.name} href={item.href}>
                        <Button
                            variant="ghost"
                        >
                            <Icon className="w-5 h-5" />
                            <span className="text-xs">{item.name}</span>
                        </Button>
                    </Link>
                );
            })}
        </nav>
    );
}
