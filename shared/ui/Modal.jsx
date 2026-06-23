'use client'

import React, { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'

export const Modal = ({ isOpen, onClose, title, children, isDestructive = false }) => {
	// Prevent body scroll when open
	useEffect(() => {
		if (isOpen) {
			document.body.style.overflow = 'hidden'
		} else {
			document.body.style.overflow = 'unset'
		}
		return () => {
			document.body.style.overflow = 'unset'
		}
	}, [isOpen])

	if (!isOpen) return null

	return (
		<AnimatePresence>
			{isOpen && (
				<div className="fixed inset-0 z-[1000] flex items-center justify-center p-4 sm:p-6">
					{/* Backdrop */}
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						transition={{ duration: 0.2 }}
						className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
						onClick={onClose}
					/>

					{/* Modal Content */}
					<motion.div
						initial={{ opacity: 0, scale: 0.95, y: 10 }}
						animate={{ opacity: 1, scale: 1, y: 0 }}
						exit={{ opacity: 0, scale: 0.95, y: 10 }}
						transition={{ duration: 0.2, type: 'spring', bounce: 0, w: 20 }}
						className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden max-h-[90vh]"
					>
						{/* Header */}
						{title && (
							<div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-white/50 backdrop-blur z-10 sticky top-0">
								<h2 className={`text-lg font-bold ${isDestructive ? 'text-red-600' : 'text-slate-900'}`}>
									{title}
								</h2>
								<button
									onClick={onClose}
									className="p-2 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
								>
									<X size={20} strokeWidth={2.5} />
								</button>
							</div>
						)}

						{/* Body */}
						<div className="overflow-y-auto flex-1 p-6 custom-scrollbar">
							{children}
						</div>
					</motion.div>
				</div>
			)}
		</AnimatePresence>
	)
}

export const ModalFooter = ({ children }) => {
	return (
		<div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-slate-100 bg-slate-50 sticky bottom-0 z-10">
			{children}
		</div>
	)
}
