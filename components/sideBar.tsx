'use client'
import Link from "next/link";
import {
    Home,
    Package2,
} from "lucide-react";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import { FaAmazon } from "react-icons/fa";
import { SiGooglemaps } from "react-icons/si";
import { SiFlipkart } from "react-icons/si";


export default function SideBar() {

    return (
        <div>
            <aside className="fixed inset-y-0 left-0 z-10 hidden w-14 flex-col border-r bg-background sm:flex">
                <nav className="flex flex-col items-center gap-4 px-2 sm:py-5">
                    <Link
                        href="#"
                        className="group flex h-9 w-9 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:h-8 md:w-8 md:text-base"
                    >
                        <Package2 className="h-4 w-4 transition-all group-hover:scale-110" />
                        <span className="sr-only">Acme Inc</span>
                    </Link>
                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Link
                                    href="/"
                                    className={`flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8 `}
                                >
                                    <Home className="h-5 w-5" />
                                    <span className="sr-only">Home</span>
                                </Link>
                            </TooltipTrigger>
                            <TooltipContent side="right">Home</TooltipContent>
                        </Tooltip>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Link
                                    href="/amazon-product-scraper"
                                    className={`flex h-9 w-9 items-center justify-center rounded-lg bg-accent text-accent-foreground transition-colors hover:text-foreground md:h-8 md:w-8`}
                                >
                                    <FaAmazon className="h-5 w-5" />
                                    <span className="sr-only">Amazon</span>
                                </Link>
                            </TooltipTrigger>
                            <TooltipContent side="right">Amazon product scraper</TooltipContent>
                        </Tooltip>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Link
                                    href="/google-maps-lead-generator"
                                    className={`flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8 `}
                                >
                                    <SiGooglemaps className="h-5 w-5" />
                                    <span className="sr-only">Google maps</span>
                                </Link>
                            </TooltipTrigger>
                            <TooltipContent side="right">Google maps lead generator</TooltipContent>
                        </Tooltip>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Link
                                    href="/flipkart-product-scraper"
                                    className={`flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8 `}
                                >
                                    <SiFlipkart className="h-5 w-5" />
                                    <span className="sr-only">Flipkart product scraper</span>
                                </Link>
                            </TooltipTrigger>
                            <TooltipContent side="right">Flipkart product scraper</TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                </nav>
            </aside>
        </div>
    );
}
