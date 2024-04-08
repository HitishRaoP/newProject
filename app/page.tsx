"use client"
import { Input } from "@/components/ui/input";

export default function Home() {
    
    return (
        <main className="px-4 sm:pr-6 sm:pl-20 md:pl-[80px] md:pr-6">
            <Input
                placeholder="Search"
                className="h-20 my-auto "
                type="text"
            />
        </main>
    );
}
