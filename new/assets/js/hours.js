function updateStatus() {
    const now = new Date();
    const day = now.getDay(); // 0 is Sunday, 1 is Monday, etc.
    const hour = now.getHours();
    const minute = now.getMinutes();

    let isOpen = false;
    let openingHour, openingMinute;

    if (day >= 1 && day <= 5) { // Monday to Friday
        openingHour = 7;
        openingMinute = 0;
        if ((hour > openingHour || (hour === openingHour && minute >= openingMinute)) && (hour < 16 || (hour === 16 && minute === 0))) {
            isOpen = true;
        }
    } else { // Saturday and Sunday
        openingHour = 7;
        openingMinute = 30;
        if ((hour > openingHour || (hour === openingHour && minute >= openingMinute)) && (hour < 16 || (hour === 16 && minute === 0))) {
            isOpen = true;
        }
    }

    const statusElement = document.getElementById('status');
    if (isOpen) {
        statusElement.textContent = 'OPEN now until 4pm';
        statusElement.className = '';
    } else {
        const tomorrow = new Date(now);
        tomorrow.setDate(tomorrow.getDate() + 1);
        const tomorrowDay = tomorrow.getDay();
        const tomorrowOpeningHour = tomorrowDay >= 1 && tomorrowDay <= 5 ? 7 : 7;
        const tomorrowOpeningMinute = tomorrowDay >= 1 && tomorrowDay <= 5 ? 0 : 30;
        const openingTime = `${tomorrowOpeningHour}:${tomorrowOpeningMinute.toString().padStart(2, '0')} AM`;

        const isBeforeOpeningToday = hour < openingHour || (hour === openingHour && minute < openingMinute);
        const openingTimeText = isBeforeOpeningToday ? 'today' : 'tomorrow';
        const displayOpeningTime = isBeforeOpeningToday ? `${openingHour}:00 AM` : openingTime;

        statusElement.textContent = `OPEN ${openingTimeText} at ${displayOpeningTime}`;
        statusElement.className = '';
    }

    // Display current client time
    const timeElement = document.getElementById('current-time');
    if (timeElement) {
        timeElement.textContent = `Current time: ${now.toLocaleTimeString()}`;
    }
}

// Update status immediately and then every minute
updateStatus();
setInterval(updateStatus, 60000);