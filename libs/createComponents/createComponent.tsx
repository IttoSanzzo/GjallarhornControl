import { forwardRef } from "react";

const createComponent = {
	div: (styledClassName: string = "") =>
		forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
			({ className = "", ...props }, ref) => (
				<div
					{...props}
					ref={ref}
					className={[styledClassName, className].join(" ")}
				/>
			)
		),
	button: (styledClassName: string = "") =>
		forwardRef<
			HTMLButtonElement,
			React.ButtonHTMLAttributes<HTMLButtonElement>
		>(({ className = "", ...props }, ref) => (
			<button
				{...props}
				ref={ref}
				className={[styledClassName, className].join(" ")}
			/>
		)),
	span: (styledClassName: string = "") =>
		forwardRef<HTMLSpanElement, React.HTMLAttributes<HTMLSpanElement>>(
			({ className = "", ...props }, ref) => (
				<span
					{...props}
					ref={ref}
					className={[styledClassName, className].join(" ")}
				/>
			)
		),
	p: (styledClassName: string = "") =>
		forwardRef<
			HTMLParagraphElement,
			React.HTMLAttributes<HTMLParagraphElement>
		>(({ className = "", ...props }, ref) => (
			<p
				{...props}
				ref={ref}
				className={[styledClassName, className].join(" ")}
			/>
		)),
	h1: (styledClassName: string = "") =>
		forwardRef<HTMLHeadingElement, React.HTMLAttributes<HTMLHeadingElement>>(
			({ className = "", ...props }, ref) => (
				<h1
					{...props}
					ref={ref}
					className={[styledClassName, className].join(" ")}
				/>
			)
		),
	h2: (styledClassName: string = "") =>
		forwardRef<HTMLHeadingElement, React.HTMLAttributes<HTMLHeadingElement>>(
			({ className = "", ...props }, ref) => (
				<h2
					{...props}
					ref={ref}
					className={[styledClassName, className].join(" ")}
				/>
			)
		),
	h3: (styledClassName: string = "") =>
		forwardRef<HTMLHeadingElement, React.HTMLAttributes<HTMLHeadingElement>>(
			({ className = "", ...props }, ref) => (
				<h3
					{...props}
					ref={ref}
					className={[styledClassName, className].join(" ")}
				/>
			)
		),
	h4: (styledClassName: string = "") =>
		forwardRef<HTMLHeadingElement, React.HTMLAttributes<HTMLHeadingElement>>(
			({ className = "", ...props }, ref) => (
				<h4
					{...props}
					ref={ref}
					className={[styledClassName, className].join(" ")}
				/>
			)
		),
	h5: (styledClassName: string = "") =>
		forwardRef<HTMLHeadingElement, React.HTMLAttributes<HTMLHeadingElement>>(
			({ className = "", ...props }, ref) => (
				<h5
					{...props}
					ref={ref}
					className={[styledClassName, className].join(" ")}
				/>
			)
		),
	h6: (styledClassName: string = "") =>
		forwardRef<HTMLHeadingElement, React.HTMLAttributes<HTMLHeadingElement>>(
			({ className = "", ...props }, ref) => (
				<h6
					{...props}
					ref={ref}
					className={[styledClassName, className].join(" ")}
				/>
			)
		),

	ul: (styledClassName: string = "") =>
		forwardRef<HTMLUListElement, React.HTMLAttributes<HTMLUListElement>>(
			({ className = "", ...props }, ref) => (
				<ul
					{...props}
					ref={ref}
					className={[styledClassName, className].join(" ")}
				/>
			)
		),
	ol: (styledClassName: string = "") =>
		forwardRef<HTMLOListElement, React.HTMLAttributes<HTMLOListElement>>(
			({ className = "", ...props }, ref) => (
				<ol
					{...props}
					ref={ref}
					className={[styledClassName, className].join(" ")}
				/>
			)
		),
	li: (styledClassName: string = "") =>
		forwardRef<HTMLLIElement, React.HTMLAttributes<HTMLLIElement>>(
			({ className = "", ...props }, ref) => (
				<li
					{...props}
					ref={ref}
					className={[styledClassName, className].join(" ")}
				/>
			)
		),
	input: (styledClassName: string = "") =>
		forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(
			({ className = "", ...props }, ref) => (
				<input
					{...props}
					ref={ref}
					className={[styledClassName, className].join(" ")}
				/>
			)
		),
	textarea: (styledClassName: string = "") =>
		forwardRef<
			HTMLTextAreaElement,
			React.TextareaHTMLAttributes<HTMLTextAreaElement>
		>(({ className = "", ...props }, ref) => (
			<textarea
				{...props}
				ref={ref}
				className={[styledClassName, className].join(" ")}
			/>
		)),
	select: (styledClassName: string = "") =>
		forwardRef<
			HTMLSelectElement,
			React.SelectHTMLAttributes<HTMLSelectElement>
		>(({ className = "", ...props }, ref) => (
			<select
				{...props}
				ref={ref}
				className={[styledClassName, className].join(" ")}
			/>
		)),
	option: (styledClassName: string = "") =>
		forwardRef<
			HTMLOptionElement,
			React.OptionHTMLAttributes<HTMLOptionElement>
		>(({ className = "", ...props }, ref) => (
			<option
				{...props}
				ref={ref}
				className={[styledClassName, className].join(" ")}
			/>
		)),
	label: (styledClassName: string = "") =>
		forwardRef<HTMLLabelElement, React.LabelHTMLAttributes<HTMLLabelElement>>(
			({ className = "", ...props }, ref) => (
				<label
					{...props}
					ref={ref}
					className={[styledClassName, className].join(" ")}
				/>
			)
		),
	form: (styledClassName: string = "") =>
		forwardRef<HTMLFormElement, React.FormHTMLAttributes<HTMLFormElement>>(
			({ className = "", ...props }, ref) => (
				<form
					{...props}
					ref={ref}
					className={[styledClassName, className].join(" ")}
				/>
			)
		),
	table: (styledClassName: string = "") =>
		forwardRef<HTMLTableElement, React.TableHTMLAttributes<HTMLTableElement>>(
			({ className = "", ...props }, ref) => (
				<table
					{...props}
					ref={ref}
					className={[styledClassName, className].join(" ")}
				/>
			)
		),
	thead: (styledClassName: string = "") =>
		forwardRef<
			HTMLTableSectionElement,
			React.HTMLAttributes<HTMLTableSectionElement>
		>(({ className = "", ...props }, ref) => (
			<thead
				{...props}
				ref={ref}
				className={[styledClassName, className].join(" ")}
			/>
		)),
	tbody: (styledClassName: string = "") =>
		forwardRef<
			HTMLTableSectionElement,
			React.HTMLAttributes<HTMLTableSectionElement>
		>(({ className = "", ...props }, ref) => (
			<tbody
				{...props}
				ref={ref}
				className={[styledClassName, className].join(" ")}
			/>
		)),
	tr: (styledClassName: string = "") =>
		forwardRef<HTMLTableRowElement, React.HTMLAttributes<HTMLTableRowElement>>(
			({ className = "", ...props }, ref) => (
				<tr
					{...props}
					ref={ref}
					className={[styledClassName, className].join(" ")}
				/>
			)
		),
	td: (styledClassName: string = "") =>
		forwardRef<
			HTMLTableDataCellElement,
			React.TdHTMLAttributes<HTMLTableDataCellElement>
		>(({ className = "", ...props }, ref) => (
			<td
				{...props}
				ref={ref}
				className={[styledClassName, className].join(" ")}
			/>
		)),
	th: (styledClassName: string = "") =>
		forwardRef<
			HTMLTableHeaderCellElement,
			React.ThHTMLAttributes<HTMLTableHeaderCellElement>
		>(({ className = "", ...props }, ref) => (
			<th
				{...props}
				ref={ref}
				className={[styledClassName, className].join(" ")}
			/>
		)),
	img: (styledClassName: string = "") =>
		forwardRef<HTMLImageElement, React.ImgHTMLAttributes<HTMLImageElement>>(
			({ className = "", ...props }, ref) => (
				<img
					{...props}
					ref={ref}
					className={[styledClassName, className].join(" ")}
				/>
			)
		),
	a: (styledClassName: string = "") =>
		forwardRef<
			HTMLAnchorElement,
			React.AnchorHTMLAttributes<HTMLAnchorElement>
		>(({ className = "", ...props }, ref) => (
			<a
				{...props}
				ref={ref}
				className={[styledClassName, className].join(" ")}
			/>
		)),
	header: (styledClassName: string = "") =>
		forwardRef<HTMLElement, React.HTMLAttributes<HTMLElement>>(
			({ className = "", ...props }, ref) => (
				<header
					{...props}
					ref={ref}
					className={[styledClassName, className].join(" ")}
				/>
			)
		),
	main: (styledClassName: string = "") =>
		forwardRef<HTMLElement, React.HTMLAttributes<HTMLElement>>(
			({ className = "", ...props }, ref) => (
				<main
					{...props}
					ref={ref}
					className={[styledClassName, className].join(" ")}
				/>
			)
		),
};

export default createComponent;
