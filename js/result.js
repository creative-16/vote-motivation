

// Display user info
const username = localStorage.getItem('username');
document.getElementById('userDisplay').textContent = username;
document.getElementById('userPoints').textContent = localStorage.getItem('points') || '0';

// Initialize charts
initializeCharts();

// Update results
updateResults();

// Set up real-time updates (in a real app, this would use Firebase)
setInterval(updateResults, 5000);

// Update last updated time
updateLastUpdatedTime();
setInterval(updateLastUpdatedTime, 1000);

// Navigation buttons
document.getElementById('backToVoteBtn').addEventListener('click', function () {
    window.location.href = 'vote.html';
});

document.getElementById('leaderboardBtn').addEventListener('click', function () {
    window.location.href = 'leaderboard.html';
});

// Dark mode toggle
document.getElementById('darkModeToggle').addEventListener('click', function () {
    document.body.classList.toggle('dark');
    const icon = this.querySelector('i');
    if (document.body.classList.contains('dark')) {
        icon.classList.remove('fa-moon');
        icon.classList.add('fa-sun');
    } else {
        icon.classList.remove('fa-sun');
        icon.classList.add('fa-moon');
    }
});


let pieChart, barChart;

function initializeCharts() {
    // Pie Chart
    const pieCtx = document.getElementById('voteChart').getContext('2d');
    pieChart = new Chart(pieCtx, {
        type: 'pie',
        data: {
            labels: ['Alice Johnson', 'Bob Smith', 'Charlie Davis'],
            datasets: [{
                data: [window.mockVotes.Alice, window.mockVotes.Bob, window.mockVotes.Charlie],
                backgroundColor: ['#ef4444', '#3b82f6', '#10b981'],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'bottom'
                }
            }
        }
    });

    // Bar Chart
    const barCtx = document.getElementById('barChart').getContext('2d');
    barChart = new Chart(barCtx, {
        type: 'bar',
        data: {
            labels: ['Alice Johnson', 'Bob Smith', 'Charlie Davis'],
            datasets: [{
                label: 'Votes',
                data: [window.mockVotes.Alice, window.mockVotes.Bob, window.mockVotes.Charlie],
                backgroundColor: ['#ef4444', '#3b82f6', '#10b981'],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}

function updateResults() {
    // In a real app, this would fetch data from Firebase
    // For now, we'll use the mock data and simulate some changes

    // Simulate random vote changes
    if (Math.random() > 0.7) {
        const candidates = ['Alice', 'Bob', 'Charlie'];
        const randomCandidate = candidates[Math.floor(Math.random() * candidates.length)];
        window.mockVotes[randomCandidate] += Math.floor(Math.random() * 3) + 1;
    }

    // Update vote counts
    const aliceVotes = window.mockVotes.Alice;
    const bobVotes = window.mockVotes.Bob;
    const charlieVotes = window.mockVotes.Charlie;
    const totalVotes = aliceVotes + bobVotes + charlieVotes;

    // Update DOM elements
    document.getElementById('aliceVotes').textContent = aliceVotes;
    document.getElementById('bobVotes').textContent = bobVotes;
    document.getElementById('charlieVotes').textContent = charlieVotes;
    document.getElementById('totalVotes').textContent = totalVotes;

    // Calculate percentages
    const alicePercentage = totalVotes > 0 ? (aliceVotes / totalVotes * 100).toFixed(1) : 0;
    const bobPercentage = totalVotes > 0 ? (bobVotes / totalVotes * 100).toFixed(1) : 0;
    const charliePercentage = totalVotes > 0 ? (charlieVotes / totalVotes * 100).toFixed(1) : 0;

    // Update percentage displays
    document.getElementById('alicePercentage').textContent = `${alicePercentage}%`;
    document.getElementById('bobPercentage').textContent = `${bobPercentage}%`;
    document.getElementById('charliePercentage').textContent = `${charliePercentage}%`;

    // Update progress bars
    document.getElementById('aliceProgress').style.width = `${alicePercentage}%`;
    document.getElementById('bobProgress').style.width = `${bobPercentage}%`;
    document.getElementById('charlieProgress').style.width = `${charliePercentage}%`;

    // Update charts
    pieChart.data.datasets[0].data = [aliceVotes, bobVotes, charlieVotes];
    pieChart.update();

    barChart.data.datasets[0].data = [aliceVotes, bobVotes, charlieVotes];
    barChart.update();

    // Update statistics
    document.getElementById('activeVoters').textContent = Math.floor(totalVotes * 1.4); // Simulate active voters
    document.getElementById('participationRate').textContent = `${(Math.random() * 20 + 70).toFixed(1)}%`;

    // Update time remaining
    const electionEndDate = new Date();
    electionEndDate.setDate(electionEndDate.getDate() + 7);
    const now = new Date();
    const timeRemaining = electionEndDate - now;
    const daysRemaining = Math.ceil(timeRemaining / (1000 * 60 * 60 * 24));
    document.getElementById('timeRemaining').textContent = `${daysRemaining}d`;
}

function updateLastUpdatedTime() {
    const now = new Date();
    const timeString = now.toLocaleTimeString();
    document.getElementById('lastUpdated').textContent = timeString;
}