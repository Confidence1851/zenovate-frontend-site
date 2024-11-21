import { Separator } from '@/components/ui/separator'
import { SidebarInset, SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'
import { Breadcrumb, BreadcrumbItem, BreadcrumbList, BreadcrumbPage } from '@/components/ui/breadcrumb'
import { AppSidebar } from '@/components/dashboard/AppSidebar'

export default function layout({ children }: { children: React.ReactNode }) {
	return (
		<div className='relative w-full'>
			<SidebarProvider>
				<AppSidebar />
				<SidebarInset>
					<header className='border-b px-[5vw] sm:px-[3.5vw] xl:px-4'>
						<div className='flex h-16 shrink-0 items-center gap-2  w-full max-w-7xl mx-auto'>
							<SidebarTrigger className='-ml-1 text-[#000000]' />
							<Separator orientation='vertical' className='mr-2 h-4 bg-[#000000]' />
							<Breadcrumb>
								<BreadcrumbList>
									<BreadcrumbItem>
										<BreadcrumbPage className='text-[#000000]'>Orders</BreadcrumbPage>
									</BreadcrumbItem>
								</BreadcrumbList>
							</Breadcrumb>
						</div>
					</header>
					<div className='flex flex-1 flex-col gap-4 p-4'>{children}</div>
				</SidebarInset>
			</SidebarProvider>
		</div>
	)
}
