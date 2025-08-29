"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import {
	Camera,
	Edit3,
	Save,
	X,
	User,
	Mail,
	Phone,
	MapPin,
	Calendar,
	Globe,
	Star,
	Film,
	Eye,
	Heart,
} from "lucide-react";
import { Header } from "../../components/Header";

type ProfileStats = {
	watchedMovies: number;
	favoriteMovies: number;
	watchlistCount: number;
	reviews: number;
};

type ProfileData = {
	name: string;
	email: string;
	phone: string;
	location: string;
	bio: string;
	birthDate: string;
	website: string;
	avatar: string | null;
	joinDate: string;
	stats: ProfileStats;
};

export default function ProfilePage() {
	const [isEditing, setIsEditing] = useState(false);
	const [profileData, setProfileData] = useState<ProfileData>({
		name: "John Doe",
		email: "john.doe@example.com",
		phone: "+1 (555) 123-4567",
		location: "New York, NY",
		bio: "Movie enthusiast and critic. I love exploring different genres and discovering hidden gems in cinema.",
		birthDate: "1990-05-15",
		website: "https://johndoe.com",
		avatar: null,
		joinDate: "2023-01-15",
		stats: {
			watchedMovies: 127,
			favoriteMovies: 23,
			watchlistCount: 45,
			reviews: 89,
		},
	});

	const fileInputRef = useRef<HTMLInputElement | null>(null);

	const handleInputChange = <K extends keyof typeof profileData>(
		field: K,
		value: (typeof profileData)[K]
	) => {
		setProfileData((prev) => ({
			...prev,
			[field]: value,
		}));
	};

	const handleSave = () => {
		// Here you would typically save to your backend
		setIsEditing(false);
		console.log("Saving profile data:", profileData);
	};

	const handleCancel = () => {
		setIsEditing(false);
		// Reset to original data if needed
	};

	const handleAvatarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const file = event.target.files?.[0];
		if (file) {
			const reader = new FileReader();
			reader.onload = (e: ProgressEvent<FileReader>) => {
				const result = e.target?.result;
				setProfileData((prev) => ({
					...prev,
					avatar: typeof result === "string" ? result : null,
				}));
			};
			reader.readAsDataURL(file);
		}
	};

	return (
		<div className='min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-indigo-950 dark:to-purple-950'>
			<Header />

			<main className='pt-24 sm:pt-28 md:pt-32 lg:pt-36 pb-8 px-4'>
				<div className='max-w-6xl mx-auto'>
					{/* Header */}
					<div className='mb-8'>
						<h1 className='text-4xl font-bold text-gray-900 dark:text-white mb-2'>
							My Profile
						</h1>
						<p className='text-gray-600 dark:text-gray-300'>
							Manage your personal information and preferences
						</p>
					</div>

					<div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
						{/* Profile Card */}
						<div className='lg:col-span-1'>
							<div className='bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl shadow-xl border border-white/20 dark:border-gray-700/20 p-6'>
								{/* Avatar Section */}
								<div className='text-center mb-6'>
									<div className='relative inline-block'>
										<div className='w-32 h-32 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 p-1 shadow-lg'>
											<div className='w-full h-full rounded-full bg-white dark:bg-gray-700 flex items-center justify-center overflow-hidden'>
												{profileData.avatar ? (
													<Image
														src={profileData.avatar}
														alt='Profile'
														width={128}
														height={128}
														className='w-full h-full object-cover rounded-full'
													/>
												) : (
													<User className='w-16 h-16 text-gray-400' />
												)}
											</div>
										</div>
										{isEditing && (
											<button
												onClick={() => fileInputRef.current?.click()}
												className='absolute -bottom-2 -right-2 bg-indigo-600 hover:bg-indigo-700 text-white p-2 rounded-full shadow-lg transition-colors'>
												<Camera className='w-4 h-4' />
											</button>
										)}
										<input
											ref={fileInputRef}
											type='file'
											accept='image/*'
											onChange={handleAvatarChange}
											className='hidden'
										/>
									</div>
									<h2 className='text-2xl font-bold text-gray-900 dark:text-white mt-4 mb-2'>
										{profileData.name}
									</h2>
									<p className='text-gray-600 dark:text-gray-300'>
										Member since{" "}
										{new Date(profileData.joinDate).toLocaleDateString(
											"en-US",
											{ month: "long", year: "numeric" }
										)}
									</p>
								</div>

								{/* Stats */}
								<div className='grid grid-cols-2 gap-4 mb-6'>
									<div className='text-center p-3 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 rounded-xl border border-blue-200/20'>
										<div className='flex items-center justify-center mb-2'>
											<Eye className='w-5 h-5 text-blue-600 dark:text-blue-400' />
										</div>
										<div className='text-2xl font-bold text-gray-900 dark:text-white'>
											{profileData.stats.watchedMovies}
										</div>
										<div className='text-sm text-gray-600 dark:text-gray-300'>
											Watched
										</div>
									</div>
									<div className='text-center p-3 bg-gradient-to-r from-red-500/10 to-pink-500/10 rounded-xl border border-red-200/20'>
										<div className='flex items-center justify-center mb-2'>
											<Heart className='w-5 h-5 text-red-600 dark:text-red-400' />
										</div>
										<div className='text-2xl font-bold text-gray-900 dark:text-white'>
											{profileData.stats.favoriteMovies}
										</div>
										<div className='text-sm text-gray-600 dark:text-gray-300'>
											Favorites
										</div>
									</div>
									<div className='text-center p-3 bg-gradient-to-r from-green-500/10 to-emerald-500/10 rounded-xl border border-green-200/20'>
										<div className='flex items-center justify-center mb-2'>
											<Film className='w-5 h-5 text-green-600 dark:text-green-400' />
										</div>
										<div className='text-2xl font-bold text-gray-900 dark:text-white'>
											{profileData.stats.watchlistCount}
										</div>
										<div className='text-sm text-gray-600 dark:text-gray-300'>
											Watchlist
										</div>
									</div>
									<div className='text-center p-3 bg-gradient-to-r from-yellow-500/10 to-orange-500/10 rounded-xl border border-yellow-200/20'>
										<div className='flex items-center justify-center mb-2'>
											<Star className='w-5 h-5 text-yellow-600 dark:text-yellow-400' />
										</div>
										<div className='text-2xl font-bold text-gray-900 dark:text-white'>
											{profileData.stats.reviews}
										</div>
										<div className='text-sm text-gray-600 dark:text-gray-300'>
											Reviews
										</div>
									</div>
								</div>

								{/* Edit Button */}
								{!isEditing ? (
									<button
										onClick={() => setIsEditing(true)}
										className='w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white py-3 px-6 rounded-xl font-semibold transition-all duration-200 shadow-lg hover:shadow-xl flex items-center justify-center gap-2'>
										<Edit3 className='w-4 h-4' />
										Edit Profile
									</button>
								) : (
									<div className='flex gap-3'>
										<button
											onClick={handleSave}
											className='flex-1 bg-green-600 hover:bg-green-700 text-white py-3 px-4 rounded-xl font-semibold transition-colors flex items-center justify-center gap-2'>
											<Save className='w-4 h-4' />
											Save
										</button>
										<button
											onClick={handleCancel}
											className='flex-1 bg-gray-600 hover:bg-gray-700 text-white py-3 px-4 rounded-xl font-semibold transition-colors flex items-center justify-center gap-2'>
											<X className='w-4 h-4' />
											Cancel
										</button>
									</div>
								)}
							</div>
						</div>

						{/* Profile Details */}
						<div className='lg:col-span-2'>
							<div className='bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl shadow-xl border border-white/20 dark:border-gray-700/20 p-8'>
								<h3 className='text-2xl font-bold text-gray-900 dark:text-white mb-6'>
									Personal Information
								</h3>

								<div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
									{/* Name */}
									<div>
										<label className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2'>
											<User className='w-4 h-4 inline mr-2' />
											Full Name
										</label>
										{isEditing ? (
											<input
												type='text'
												value={profileData.name}
												onChange={(e) =>
													handleInputChange("name", e.target.value)
												}
												className='w-full px-4 py-3 bg-white/50 dark:bg-gray-700/50 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400'
											/>
										) : (
											<p className='px-4 py-3 bg-gray-50/50 dark:bg-gray-700/30 rounded-xl text-gray-900 dark:text-white'>
												{profileData.name}
											</p>
										)}
									</div>

									{/* Email */}
									<div>
										<label className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2'>
											<Mail className='w-4 h-4 inline mr-2' />
											Email Address
										</label>
										{isEditing ? (
											<input
												type='email'
												value={profileData.email}
												onChange={(e) =>
													handleInputChange("email", e.target.value)
												}
												className='w-full px-4 py-3 bg-white/50 dark:bg-gray-700/50 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400'
											/>
										) : (
											<p className='px-4 py-3 bg-gray-50/50 dark:bg-gray-700/30 rounded-xl text-gray-900 dark:text-white'>
												{profileData.email}
											</p>
										)}
									</div>

									{/* Phone */}
									<div>
										<label className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2'>
											<Phone className='w-4 h-4 inline mr-2' />
											Phone Number
										</label>
										{isEditing ? (
											<input
												type='tel'
												value={profileData.phone}
												onChange={(e) =>
													handleInputChange("phone", e.target.value)
												}
												className='w-full px-4 py-3 bg-white/50 dark:bg-gray-700/50 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400'
											/>
										) : (
											<p className='px-4 py-3 bg-gray-50/50 dark:bg-gray-700/30 rounded-xl text-gray-900 dark:text-white'>
												{profileData.phone}
											</p>
										)}
									</div>

									{/* Location */}
									<div>
										<label className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2'>
											<MapPin className='w-4 h-4 inline mr-2' />
											Location
										</label>
										{isEditing ? (
											<input
												type='text'
												value={profileData.location}
												onChange={(e) =>
													handleInputChange("location", e.target.value)
												}
												className='w-full px-4 py-3 bg-white/50 dark:bg-gray-700/50 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400'
											/>
										) : (
											<p className='px-4 py-3 bg-gray-50/50 dark:bg-gray-700/30 rounded-xl text-gray-900 dark:text-white'>
												{profileData.location}
											</p>
										)}
									</div>

									{/* Birth Date */}
									<div>
										<label className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2'>
											<Calendar className='w-4 h-4 inline mr-2' />
											Birth Date
										</label>
										{isEditing ? (
											<input
												type='date'
												value={profileData.birthDate}
												onChange={(e) =>
													handleInputChange("birthDate", e.target.value)
												}
												className='w-full px-4 py-3 bg-white/50 dark:bg-gray-700/50 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-gray-900 dark:text-white'
											/>
										) : (
											<p className='px-4 py-3 bg-gray-50/50 dark:bg-gray-700/30 rounded-xl text-gray-900 dark:text-white'>
												{new Date(profileData.birthDate).toLocaleDateString()}
											</p>
										)}
									</div>

									{/* Website */}
									<div>
										<label className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2'>
											<Globe className='w-4 h-4 inline mr-2' />
											Website
										</label>
										{isEditing ? (
											<input
												type='url'
												value={profileData.website}
												onChange={(e) =>
													handleInputChange("website", e.target.value)
												}
												className='w-full px-4 py-3 bg-white/50 dark:bg-gray-700/50 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400'
												placeholder='https://example.com'
											/>
										) : (
											<p className='px-4 py-3 bg-gray-50/50 dark:bg-gray-700/30 rounded-xl text-gray-900 dark:text-white'>
												{profileData.website ? (
													<a
														href={profileData.website}
														target='_blank'
														rel='noopener noreferrer'
														className='text-indigo-600 dark:text-indigo-400 hover:underline'>
														{profileData.website}
													</a>
												) : (
													"Not provided"
												)}
											</p>
										)}
									</div>
								</div>

								{/* Bio */}
								<div className='mt-6'>
									<label className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2'>
										About Me
									</label>
									{isEditing ? (
										<textarea
											value={profileData.bio}
											onChange={(e) => handleInputChange("bio", e.target.value)}
											rows={4}
											className='w-full px-4 py-3 bg-white/50 dark:bg-gray-700/50 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 resize-none'
											placeholder='Tell us about yourself, your interests, favorite movie genres...'
										/>
									) : (
										<p className='px-4 py-3 bg-gray-50/50 dark:bg-gray-700/30 rounded-xl text-gray-900 dark:text-white leading-relaxed'>
											{profileData.bio}
										</p>
									)}
								</div>
							</div>
						</div>
					</div>
				</div>
			</main>

			{/* Background Elements */}
			<div className='fixed inset-0 -z-10 overflow-hidden pointer-events-none'>
				<div className='absolute top-1/4 right-1/4 w-96 h-96 bg-gradient-to-r from-purple-400/10 to-pink-400/10 rounded-full blur-3xl'></div>
				<div className='absolute bottom-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-blue-400/10 to-cyan-400/10 rounded-full blur-3xl'></div>
			</div>
		</div>
	);
}
