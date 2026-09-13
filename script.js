// List of time zones to display
const timeZones = [
    { name: 'New York', tz: 'America/New_York', location: 'USA - Eastern' },
    { name: 'London', tz: 'Europe/London', location: 'United Kingdom' },
    { name: 'Tokyo', tz: 'Asia/Tokyo', location: 'Japan' },
    { name: 'Sydney', tz: 'Australia/Sydney', location: 'Australia' },
    { name: 'Dubai', tz: 'Asia/Dubai', location: 'United Arab Emirates' },
    { name: 'Singapore', tz: 'Asia/Singapore', location: 'Singapore' },
    { name: 'Mumbai', tz: 'Asia/Kolkata', location: 'India' },
    { name: 'São Paulo', tz: 'America/Sao_Paulo', location: 'Brazil' }
];

// Initialize the clocks when page loads
document.addEventListener('DOMContentLoaded', () => {
    createClocks();
    updateTime();
    // Update time every second
    setInterval(updateTime, 1000);
});

// Create clock elements for each timezone
function createClocks() {
    const clocksGrid = document.getElementById('clocksGrid');
    clocksGrid.innerHTML = '';

    timeZones.forEach(zone => {
        const clockDiv = document.createElement('div');
        clockDiv.className = 'clock';
        clockDiv.innerHTML = `
            <div class="timezone">${zone.name}</div>
            <div class="location">${zone.location}</div>
            <div class="digital-time" id="time-${zone.tz}">--:--:--</div>
            <div class="date" id="date-${zone.tz}">Loading...</div>
            <div class="period" id="period-${zone.tz}"></div>
            <div class="offset" id="offset-${zone.tz}"></div>
        `;
        clocksGrid.appendChild(clockDiv);
    });
}

// Update all clocks
function updateTime() {
    timeZones.forEach(zone => {
        const time = new Date().toLocaleString('en-US', {
            timeZone: zone.tz,
            hour12: false,
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
        });

        const date = new Date().toLocaleString('en-US', {
            timeZone: zone.tz,
            weekday: 'long',
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });

        const hour12 = new Date().toLocaleString('en-US', {
            timeZone: zone.tz,
            hour12: true,
            hour: '2-digit'
        });

        const period = new Date().toLocaleString('en-US', {
            timeZone: zone.tz,
            hour12: true
        }).slice(-2);

        // Update time element
        const timeElement = document.getElementById(`time-${zone.tz}`);
        if (timeElement) {
            timeElement.textContent = time;
        }

        // Update date element
        const dateElement = document.getElementById(`date-${zone.tz}`);
        if (dateElement) {
            dateElement.textContent = date;
        }

        // Update period element
        const periodElement = document.getElementById(`period-${zone.tz}`);
        if (periodElement) {
            periodElement.textContent = period;
        }

        // Update offset element
        const offsetElement = document.getElementById(`offset-${zone.tz}`);
        if (offsetElement) {
            const offset = getTimezoneOffset(zone.tz);
            offsetElement.textContent = `UTC ${offset}`;
        }
    });
}

// Get timezone offset from UTC
function getTimezoneOffset(tz) {
    const now = new Date();
    const tzTime = new Date(now.toLocaleString('en-US', { timeZone: tz }));
    const utcTime = new Date(now.toLocaleString('en-US', { timeZone: 'UTC' }));
    
    const offsetMs = tzTime - utcTime;
    const offsetHours = offsetMs / (1000 * 60 * 60);
    
    const sign = offsetHours >= 0 ? '+' : '';
    const hours = Math.floor(Math.abs(offsetHours));
    const minutes = Math.abs(offsetHours * 60) % 60;
    
    return `${sign}${hours}:${minutes.toString().padStart(2, '0')}`;
}
