import { Header } from "../components/Header";
import { Button } from "../components/ui/Button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function NotFound() {
	return (
		<div className='min-h-screen bg-white dark:bg-slate-950'>
			<Header />
			<div className='container mx-auto px-4 py-8'>
				<div className='text-center py-12'>
					<div className='text-8xl mb-4'>🎬</div>
					<h1 className='text-4xl font-bold mb-4 text-slate-900 dark:text-slate-100'>
						404 - Page Not Found
					</h1>
					<p className='text-slate-600 dark:text-slate-400 mb-8 max-w-md mx-auto'>
						The page you&apos;re looking for doesn&apos;t exist. Maybe it&apos;s
						time to discover some new movies?
					</p>
					<Link href='/movies'>
						<Button>
							<ArrowLeft className='w-4 h-4 mr-2' />
							Back to Movies
						</Button>
					</Link>
				</div>
			</div>
		</div>
	);
}
