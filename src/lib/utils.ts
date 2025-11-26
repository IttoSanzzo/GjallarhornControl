import { NotificationData } from "@/components/Notification";

export function newNotification(
	message: string = "",
	hasError: boolean = false
): NotificationData {
	return { message, hasError, timestamp: Date.now() };
}

export function capitalize(src: string) {
	return src.charAt(0).toUpperCase() + src.slice(1);
}

export function getPlataformName(
	link: string
): "youtube" | "spotify" | "soundcloud" | undefined {
	if (link.includes("youtube.com") || link.includes("youtu.com"))
		return "youtube";
	if (link.includes("spotify.com")) return "spotify";
	if (link.includes("soundcloud.com")) return "soundcloud";
	return undefined;
}

type ScrollOptions = {
	duration?: number;
	offset?: number;
	easing?: (t: number) => number;
	cancelOnNew?: boolean;
};

const activeAnimations = new WeakMap<
	Element,
	{ rafId?: number; cancel: () => void }
>();

export function scrollChildIntoParentCenter(
	parent: HTMLElement,
	child: HTMLElement,
	opts: ScrollOptions = {}
): { cancel: () => void } {
	const {
		duration = 300,
		offset = 0,
		easing = (t: number) => 1 - Math.pow(1 - t, 3),
		cancelOnNew = true,
	} = opts;

	if (!parent || !child) {
		return { cancel: () => {} };
	}

	const prev = activeAnimations.get(parent);
	if (prev && cancelOnNew) {
		prev.cancel();
	}

	const parentRect = parent.getBoundingClientRect();
	const childRect = child.getBoundingClientRect();
	const startScroll = parent.scrollTop;
	const offsetTop = childRect.top - parentRect.top;

	let target =
		startScroll +
		offsetTop -
		(parent.clientHeight / 2 - child.clientHeight / 2) +
		offset;

	const maxScroll = Math.max(0, parent.scrollHeight - parent.clientHeight);
	if (Number.isFinite(maxScroll)) {
		target = Math.max(0, Math.min(target, maxScroll));
	} else {
		target = Math.max(0, target);
	}

	if (Math.abs(target - startScroll) < 0.5 || duration <= 0) {
		parent.scrollTop = target;
		return { cancel: () => {} };
	}

	let rafId = 0;
	let cancelled = false;
	const startTime = performance.now();

	function step(now: number) {
		if (cancelled) return;
		const elapsed = now - startTime;
		const t = Math.min(1, elapsed / duration);
		const eased = easing(t);
		parent.scrollTop = startScroll + (target - startScroll) * eased;

		if (t < 1) {
			rafId = requestAnimationFrame(step);
			activeAnimations.set(parent, { rafId, cancel });
		} else {
			activeAnimations.delete(parent);
		}
	}

	function cancel() {
		cancelled = true;
		if (rafId) cancelAnimationFrame(rafId);
		activeAnimations.delete(parent);
	}

	rafId = requestAnimationFrame(step);
	activeAnimations.set(parent, { rafId, cancel });

	return { cancel };
}
