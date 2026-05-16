export const PROJECTS = [
	{
		id: 'CH-01',
		code: 'rust-cursor',
		title: 'RustCursor',
		badge: 'LIVE · 2 DUA',
		featured: true,
		desc: 'A Windows tray tool that remaps the cursor between monitors of different resolutions and physical sizes by translating through a shared millimetre coordinate space. Drag-to-arrange GUI, per-display HWID profiles, two input backends.',
		stats: [
			['LANG', 'Rust 100%'],
			['RELEASES', 'v0.4.2'],
			['COMMITS', '50'],
			['STATUS', 'Maintained']
		],
		href: 'https://github.com/Dayren43/RustCursor',
		langs: [['Rust', 100, 'oklch(0.74 0.16 35)']],
		notes: [
			'Maps pixels → physical millimetres so crossings preserve physical height regardless of pixel density.',
			'Two backends: WH_MOUSE_LL (anti-cheat-safe) and the Interception kernel driver.',
			'Drag-to-arrange Settings GUI with hot-reloading TOML config and per-HWID profiles.',
			'Auto-pauses for fullscreen DX/Vulkan apps via SHQueryUserNotificationState.'
		],
		stack: ['Rust', 'egui', 'Win32 API', 'schtasks', 'TOML']
	},
	{
		id: 'CH-02',
		code: 'temp-logging',
		title: 'Temp-logging Dashboard',
		badge: 'DESIGN SOURCE',
		desc: 'ESP32-C3 temperature sensor publishing readings to a self-hosted Svelte dashboard. Logging pipeline, on-device webserver, and the visualisation system whose aesthetic this very page borrows from.',
		stats: [
			['LANG', 'Svelte 84%'],
			['HARDWARE', 'ESP32-C3'],
			['COMMITS', '15'],
			['STATUS', 'Personal']
		],
		href: 'https://github.com/Dayren43/Temp-logging',
		langs: [
			['Svelte', 84.3, 'oklch(0.74 0.16 35)'],
			['JavaScript', 8.3, 'oklch(0.84 0.14 95)'],
			['C++', 2.9, 'oklch(0.65 0.10 280)'],
			['Python', 2.1, 'oklch(0.68 0.12 220)'],
			['CSS', 1.1, 'oklch(0.62 0.13 320)'],
			['HTML', 0.7, 'oklch(0.55 0.10 30)'],
			['Other', 0.6, 'oklch(0.55 0.01 60)']
		],
		notes: [
			'ESP32-C3 firmware in C++ samples a digital temp sensor and serves readings over Wi-Fi.',
			'Svelte dashboard pulls the JSON feed, persists to disk, and renders rolling charts.',
			'Python utilities for batch export and CSV inspection.',
			'The colour, spacing and mono-typography system on this site started life here.'
		],
		stack: ['Svelte', 'ESP32-C3', 'C++', 'Python', 'JavaScript']
	},
	{
		id: 'CH-03',
		code: 'bike-trailer',
		title: 'LTU Bike Trailer',
		badge: 'UNIVERSITY · CAPSTONE',
		desc: 'The largest group project of my degree: a multi-disciplinary instrumented bicycle trailer built with the LTU Bike-trailer team. Hardware, firmware, telemetry and the integration work that ties them together.',
		stats: [
			['TEAM', 'Multi-discipline'],
			['ROLE', 'Software / Firmware'],
			['INSTITUTION', 'LTU'],
			['STATUS', 'Delivered']
		],
		href: 'https://github.com/Ltu-Bike-trailer',
		langs: [
			['Embedded C', 55, 'oklch(0.66 0.12 260)'],
			['Rust', 25, 'oklch(0.74 0.16 35)'],
			['Python', 15, 'oklch(0.68 0.12 220)'],
			['Other', 5, 'oklch(0.55 0.01 60)']
		],
		notes: [
			'Cross-team capstone with electrical, mechanical and software disciplines.',
			'Owned a slice of the firmware + data layer; learned to ship in a real org structure.',
			'Final deliverable runs as an instrumented platform for further research.',
			'Biggest lesson: glue work is half the project — protocols, naming, sync.'
		],
		stack: ['Embedded C', 'Rust', 'Python', 'CAN bus', 'Git']
	}
];

export const EXPERIENCE = [
	{
		range: 'AUG 2024 — PRESENT',
		duration: 'current',
		company: 'SAAB',
		role: 'Software Engineer',
		blurb: 'Full-time role on a defence-tech software team.',
		detail: 'Specifics under NDA — happy to talk about scope and stack in conversation.',
		tags: ['Secret :)'],
		status: 'active'
	},
	{
		range: 'JAN — JUNE 2025',
		duration: '6 months',
		company: 'Ericsson',
		role: "Master's Thesis",
		blurb: 'Satellite integration in 6G.',
		detail:
			'Final thesis project bridging cellular and satellite links for the next-generation radio access network.',
		tags: ['6G', 'NTN', 'Research', 'Python'],
		status: 'shipped'
	},
	{
		range: 'JUN — AUG 2024',
		duration: '3 months',
		company: 'Ericsson',
		role: 'R&D Internship',
		blurb: 'Built a Java framework for integrating external standard tests.',
		detail:
			'Designed and shipped a testing framework in Java that plugged third-party standard test suites into the in-house pipeline so they ran alongside internal cases.',
		tags: ['Java', 'Test infra', 'R&D'],
		status: 'shipped'
	},
	{
		range: 'JUN — AUG 2023',
		duration: '3 months',
		company: 'Ericsson',
		role: 'R&D Internship',
		blurb: 'Python post-processing tooling for data analysis.',
		detail:
			'Wrote Python utilities to ingest raw measurement data, clean it, and surface the metrics engineers actually wanted to look at.',
		tags: ['Python', 'Data', 'Tooling'],
		status: 'shipped'
	}
];
