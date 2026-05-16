export const PROJECTS = [
	{
		id: 'CH-01',
		code: 'rust-cursor',
		title: 'RustCursor',
		badge: 'LIVE',
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
			'Two input backends: WH_MOUSE_LL (anti-cheat-safe) and the Interception kernel driver.',
			'Drag-to-arrange settings GUI with hot-reloading TOML config and per-HWID monitor profiles.',
			'Auto-pauses for fullscreen DX/Vulkan apps via SHQueryUserNotificationState.'
		],
		stack: ['Rust', 'Win32 API', 'egui', 'TOML']
	},
	{
		id: 'CH-02',
		code: 'temp-logging',
		title: 'Temp-logging Dashboard',
		badge: 'DESIGN SOURCE',
		desc: 'ESP32-C3 temperature and humidity sensor with a built-in webserver, paired with a self-hosted Svelte dashboard for logging and visualisation.',
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
			'ESP32-C3 firmware in C++ samples temperature and humidity, serving readings via a built-in HTTP endpoint.',
			'Python polling service fetches readings every 5 minutes and writes to a PostgreSQL database running in Docker.',
			'Svelte dashboard fetches data from a backend API and renders rolling charts.'
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
			['Embedded Rust', 60, 'oklch(0.74 0.16 35)'],
			['Python', 25, 'oklch(0.68 0.12 220)'],
			['Other', 15, 'oklch(0.55 0.01 60)']
		],
		notes: [
			'Team of 13 across software/firmware, hardware/electrical, and systems/control disciplines.',
			'Owned sensor nodes: hardware interface design, PCB design for a remote sensor, and firmware on nRF5340 in Embedded Rust.',
			'Delivered a working MVP that serves as a first prototype and foundation for the next cohort of students to build on.'
		],
		stack: ['Embedded Rust', 'nRF5340', 'Python', 'CAN bus']
	}
];

export const EXPERIENCE = [
	{
		range: 'AUG 2024 — PRESENT',
		duration: 'current',
		company: 'SAAB',
		role: 'Software Engineer',
		blurb: 'Full-time role on a defence-tech software team operating within a large-scale SAFe agile programme.',
		detail: 'Specifics under NDA — happy to talk about scope and stack in conversation.',
		tags: ['Java', 'C++', 'Secret :)'],
		status: 'active'
	},
	{
		range: 'JAN — JUNE 2025',
		duration: '6 months',
		company: 'Ericsson',
		role: "Master's Thesis",
		blurb: 'Satellite integration in 6G.',
		detail: 'Bridging cellular and satellite links for the next-generation radio access network.',
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
		blurb: 'Python tooling for post-processing and visualisation of simulation data.',
		detail: 'Built Python tooling for post-processing and visualisation of simulation data.',
		tags: ['Python', 'Data', 'Tooling'],
		status: 'shipped'
	},
];
