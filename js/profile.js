

// Load user data
loadUserProfile();

// Navigation buttons
document.getElementById('homeBtn').addEventListener('click', function () {
    window.location.href = 'index.html';
});

document.getElementById('voteBtn').addEventListener('click', function () {
    window.location.href = 'vote.html';
});

document.getElementById('resultsBtn').addEventListener('click', function () {
    window.location.href = 'result.html';
});

document.getElementById('leaderboardBtn').addEventListener('click', function () {
    window.location.href = 'leaderboard.html';
});

document.getElementById('settingsBtn').addEventListener('click', function () {
    window.location.href = 'settings.html';
});


function loadUserProfile() {
    const username = localStorage.getItem('username');
    const points = parseInt(localStorage.getItem('points') || '0');
    const votingHistory = JSON.parse(localStorage.getItem('votingHistory') || '[]');

    // Update profile header
    document.getElementById('profileUsername').textContent = username.toUpperCase();
    document.getElementById('joinDate').textContent = new Date().getFullYear();
    document.getElementById('totalVotes').textContent = votingHistory.length;
    document.getElementById('totalPoints').textContent = points;

    // Calculate rank (mock calculation)
    const rank = Math.max(1, Math.floor(Math.random() * 100) - points / 10);
    document.getElementById('userRank').textContent = `#${rank}`;

    // Update activity feed
    updateActivityFeed(votingHistory);
}

function updateActivityFeed(history) {
    const activityFeed = document.getElementById('activityFeed');

    if (history.length === 0) {
        activityFeed.innerHTML = '<p class="text-purple-200">No recent activity</p>';
        return;
    }

    const activities = history.slice(-5).reverse().map(item => {
        const timeAgo = getTimeAgo(new Date(item.timestamp));
        return `
            <div class="flex items-center space-x-4 p-3 bg-white bg-opacity-5 rounded-lg">
                <div class="bg-green-500 bg-opacity-20 rounded-full p-2">
                    <i class="fas fa-check text-green-400"></i>
                </div>
                <div class="flex-1">
                    <p class="text-white">Voted for ${item.candidate}</p>
                    <p class="text-purple-200 text-sm">${timeAgo}</p>
                </div>
            </div>
        `;
    }).join('');

    activityFeed.innerHTML = activities;
}

function getTimeAgo(date) {
    const seconds = Math.floor((new Date() - date) / 1000);

    let interval = seconds / 31536000;
    if (interval > 1) return Math.floor(interval) + " years ago";

    interval = seconds / 2592000;
    if (interval > 1) return Math.floor(interval) + " months ago";

    interval = seconds / 86400;
    if (interval > 1) return Math.floor(interval) + " days ago";

    interval = seconds / 3600;
    if (interval > 1) return Math.floor(interval) + " hours ago";

    interval = seconds / 60;
    if (interval > 1) return Math.floor(interval) + " minutes ago";

    return "Just now";
}