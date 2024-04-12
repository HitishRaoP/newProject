"use client"
import Image from "next/image"
import Link from "next/link"
import {
    Home,
    LineChart,
    Package,
    Package2,
    PanelLeft,
    Search,
    ShoppingCart,
    Users2,
} from "lucide-react"
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdownMenu"
import { Input } from "@/components/ui/input"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { ModeToggle } from "./modeToggle"
import { UserNav } from "./userNav"
import { usePathname } from 'next/navigation'
export default function Header() {
    const pathname = usePathname()
    return (
        <div className="sm:gap-4 sm:py-4 sm:pl-14">
            <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6 ">
                <Sheet>
                    <SheetTrigger asChild>
                        <Button size="icon" variant="outline" className="sm:hidden">
                            <PanelLeft className="h-5 w-5" />
                            <span className="sr-only">Toggle Menu</span>
                        </Button>
                    </SheetTrigger>
                    <SheetContent side="left" className="sm:max-w-xs">
                        <nav className="grid gap-6 text-lg font-medium">
                            <Link
                                href="#"
                                className="group flex h-10 w-10 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:text-base"
                            >
                                <Package2 className="h-5 w-5 transition-all group-hover:scale-110" />
                                <span className="sr-only">Acme Inc</span>
                            </Link>
                            <Link
                                href="#"
                                className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
                            >
                                <Home className="h-5 w-5" />
                                Dashboard
                            </Link>
                            <Link
                                href="#"
                                className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
                            >
                                <ShoppingCart className="h-5 w-5" />
                                Orders
                            </Link>
                            <Link
                                href="#"
                                className="flex items-center gap-4 px-2.5 text-foreground"
                            >
                                <Package className="h-5 w-5" />
                                Products
                            </Link>
                            <Link
                                href="#"
                                className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
                            >
                                <Users2 className="h-5 w-5" />
                                Customers
                            </Link>
                            <Link
                                href="#"
                                className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
                            >
                                <LineChart className="h-5 w-5" />
                                Settings
                            </Link>
                        </nav>
                    </SheetContent>
                </Sheet>
                <Breadcrumb className="hidden md:flex">
                    <BreadcrumbList>
                        {
                            pathname === '/products' ? <> <BreadcrumbItem>
                                <BreadcrumbLink href="/">Home</BreadcrumbLink>
                            </BreadcrumbItem><BreadcrumbSeparator />
                                <BreadcrumbItem>
                                    <BreadcrumbPage>Products</BreadcrumbPage>
                                </BreadcrumbItem></> : <BreadcrumbPage>Home</BreadcrumbPage>
                        }

                    </BreadcrumbList>
                </Breadcrumb>
                <div className="relative ml-auto flex items-center gap-4 md:grow-0">
                    <UserNav />
                    <ModeToggle />
                </div>
            </header>
        </div>

    )
}
