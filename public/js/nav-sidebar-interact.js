let nav;
let nav_toggle_btn;

const toggleNav = () => {
	toggle_classes(nav, 'open', 'closed');
}

const openNav = () => {
	nav.classList.remove('closed');
	nav.classList.add('open');
}

const closeNav = () => {
	nav.classList.remove('open');
	nav.classList.add('closed');
}

let navSwipeStart = {};
let navSwipeLast = {};

let navSwipeOpenStartMargin = 48; //px; how close to the edge must the swipe start to open the nav bar
let navSwipeOpenMinWidth = 32; //px; how far to the side must they swipe to open the nav bar
let navSwipeCloseMinWidth = 32; //px; how far to the side must they swipe to close the nav bar

const isRightHanded = () => {
	return document.body.classList.contains('right');
};

// If we're in right-handed mode, create a copy of the swipe with coordinates to reflect distance from the right side of the body
const normalizeSwipe = (swipe) => {
	if(isRightHanded()) {
		return Object.assign({}, swipe, {clientX: document.body.clientWidth - swipe.clientX});
	}
	return swipe;
};

const setNavSwipeStart = (touch) => {
	if(touch.touches) {
		navSwipeStart = normalizeSwipe(touch.touches[0]);
		setNavSwipeLast(touch.touches[0]);
	}
};
const setNavSwipeLast  = (touch) => {
	if(touch.touches) {
		navSwipeLast = normalizeSwipe(touch.touches[0]);
	}
};

const handleNavSwipeOpen = (evt) => {
	if(navSwipeStart.target != nav_toggle_btn &&
		navSwipeStart.clientX <= navSwipeOpenStartMargin &&
		navSwipeLast .clientX - navSwipeStart.clientX >= navSwipeOpenMinWidth) {
		openNav();
	}
};

const handleNavSwipeClose = (evt) => {
	if(navSwipeStart.target != nav_toggle_btn &&
		navSwipeStart.clientX - navSwipeLast.clientX >= navSwipeCloseMinWidth) {
		closeNav();
	}
};

const doNavInteract = () => {
	nav = document.getElementById('main-nav');
	nav_toggle_btn = document.getElementById('nav-btn-ctr');
	nav_toggle_btn.addEventListener('click', toggleNav);
	// if nav is open and we tap somewhere outside of it, close it
	document.addEventListener('click', (evt) => {
		if (evt.target.closest('nav#main-nav') == null || evt.target.closest('#nav-click-catcher')) closeNav();
	});
	document.addEventListener('touchstart', (evt) => {
		if (evt.target.closest('nav#main-nav') == null || evt.target.closest('#nav-click-catcher')) closeNav();
	});
	document.addEventListener('keyup', (evt) => {
		if(evt.key === 'Escape') closeNav();
	});

	document.addEventListener('touchstart', setNavSwipeStart);
	document.addEventListener('touchmove', setNavSwipeLast);
	document.addEventListener('touchmove', handleNavSwipeOpen);
	document.addEventListener('touchmove', handleNavSwipeClose);
};

document.addEventListener('DOMContentLoaded', doNavInteract);
