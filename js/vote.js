document.addEventListener('DOMContentLoaded', function () {
    // Check if user is logged in
    if (!sessionStorage.getItem('username')) {
        window.location.href = 'index.html';
        return;
    }

    // Display user info
    const username = sessionStorage.getItem('username');
    document.getElementById('userDisplay').textContent = username;
    document.getElementById('userPoints').textContent = localStorage.getItem('points') || '0';

    // Initialize votes remaining
    let votesRemaining = parseInt(localStorage.getItem('votesRemaining') || '3');
    document.getElementById('votesRemaining').textContent = votesRemaining;

    // Load voting history
    loadVotingHistory();

    // Set up blockchain countdown
    setupBlockchainCountdown();

    // Add event listeners to vote buttons
    document.querySelectorAll('.vote-btn').forEach(button => {
        button.addEventListener('click', function () {
            if (votesRemaining <= 0) {
                showNotification('No votes remaining! Reset at next block.', 'warning');
                return;
            }
            const candidate = this.getAttribute('data-candidate');
            mineVoteBlock(candidate);
        });
    });

    // Navigation
    document.getElementById('backBtn').addEventListener('click', function () {
        window.location.href = 'index.html';
    });

    document.getElementById('viewResultsBtn').addEventListener('click', function () {
        window.location.href = 'result.html';
    });

    document.getElementById('leaderboardBtn').addEventListener('click', function () {
        window.location.href = 'leaderboard.html';
    });

    document.getElementById('profileBtn').addEventListener('click', function () {
        window.location.href = 'profile.html';
    });

    // FAB Navigation
    setupFabNavigation();

    // Close vote modal
    document.getElementById('closeVoteModal').addEventListener('click', function () {
        document.getElementById('voteModal').classList.add('hidden');
    });

    // Update vote counts periodically
    setInterval(updateVoteCounts, 5000);
});

function setupFabNavigation() {
    const fabNav = document.getElementById('fabNav');
    const fabMenu = document.getElementById('fabMenu');

    fabNav.addEventListener('click', function () {
        fabMenu.classList.toggle('active');
        this.querySelector('i').classList.toggle('fa-compass');
        this.querySelector('i').classList.toggle('fa-times');
    });

    document.querySelectorAll('.fab-item').forEach(item => {
        item.addEventListener('click', function () {
            const page = this.getAttribute('data-page');
            window.location.href = `${page}.html`;
        });
    });
}

function loadVotingHistory() {
    const history = JSON.parse(localStorage.getItem('votingHistory') || '[]');
    const historyContainer = document.getElementById('votingHistory');

    if (history.length === 0) {
        historyContainer.innerHTML = '<p class="text-gray-400">No transactions yet. Mine your first vote block!</p>';
        return;
    }

    historyContainer.innerHTML = history.map(item => `
        <div class="flex justify-between items-center p-3 bg-gray-800 bg-opacity-50 rounded-lg">
            <div class="flex items-center space-x-3">
                <i class="fas fa-cube text-cyan-400"></i>
                <div>
                    <span class="text-white">Voted for ${item.candidate}</span>
                    <p class="text-gray-500 text-xs jetbrains">TX: ${item.txId}</p>
                </div>
            </div>
            <div class="text-right">
                <span class="text-gray-400 text-sm">${new Date(item.timestamp).toLocaleString()}</span>
            </div>
        </div>
    `).reverse().join('');
}

function setupBlockchainCountdown() {
    setInterval(function () {
        const now = new Date();
        const seconds = 60 - now.getSeconds();
        const minutes = 9 - now.getMinutes() % 10;

        document.getElementById('blockCountdown').textContent =
            `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

        const progress = ((60 - seconds) / 60) * 100;
        document.getElementById('blockProgress').style.width = `${progress}%`;
    }, 1000);
}

function mineVoteBlock(candidate) {
    // Show blockchain animation
    const blockchainAnimation = document.getElementById('blockchainAnimation');
    blockchainAnimation.classList.add('active');

    // Generate transaction ID
    const txId = '0x' + Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);

    setTimeout(function () {
        blockchainAnimation.classList.remove('active');

        // Update vote count
        window.mockVotes[candidate]++;

        // Update votes remaining
        let votesRemaining = parseInt(localStorage.getItem('votesRemaining') || '3');
        votesRemaining--;
        localStorage.setItem('votesRemaining', votesRemaining);
        document.getElementById('votesRemaining').textContent = votesRemaining;

        // Add to voting history
        const history = JSON.parse(localStorage.getItem('votingHistory') || '[]');
        history.push({
            candidate: candidate,
            timestamp: new Date().toISOString(),
            txId: txId
        });
        localStorage.setItem('votingHistory', JSON.stringify(history));

        // Update user points
        const currentPoints = parseInt(localStorage.getItem('points') || '0');
        const newPoints = currentPoints + 10;
        localStorage.setItem('points', newPoints);
        document.getElementById('userPoints').textContent = newPoints;

        // Show confirmation modal
        document.getElementById('votedCandidate').textContent = candidate;
        document.getElementById('txId').textContent = txId.substring(0, 10) + '...';
        document.getElementById('remainingVotes').textContent = votesRemaining;
        document.getElementById('voteModal').classList.remove('hidden');

        // Update voting history display
        loadVotingHistory();

        // Create success particles
        createSuccessParticles();

        // Show notification
        showNotification(`Vote block mined successfully! TX: ${txId.substring(0, 10)}...`, 'success');

        // Update vote counts display
        updateVoteCounts();
    }, 2000);
}

function createSuccessParticles() {
    const container = document.getElementById('successParticles');
    container.innerHTML = '';

    for (let i = 0; i < 30; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = '50%';
        particle.style.top = '50%';
        particle.style.setProperty('--x', (Math.random() - 0.5) * 200 + 'px');
        particle.style.setProperty('--y', (Math.random() - 0.5) * 200 + 'px');
        particle.style.animationDelay = Math.random() * 0.3 + 's';
        container.appendChild(particle);
    }

    setTimeout(() => {
        container.innerHTML = '';
    }, 1500);
}

function updateVoteCounts() {
    const totalVotes = window.mockVotes.Alice + window.mockVotes.Bob + window.mockVotes.Charlie;

    // Update Alice
    document.getElementById('aliceVoteCount').textContent = window.mockVotes.Alice;
    document.getElementById('aliceVoteBar').style.width = `${(window.mockVotes.Alice / totalVotes * 100)}%`;

    // Update Bob
    document.getElementById('bobVoteCount').textContent = window.mockVotes.Bob;
    document.getElementById('bobVoteBar').style.width = `${(window.mockVotes.Bob / totalVotes * 100)}%`;

    // Update Charlie
    document.getElementById('charlieVoteCount').textContent = window.mockVotes.Charlie;
    document.getElementById('charlieVoteBar').style.width = `${(window.mockVotes.Charlie / totalVotes * 100)}%`;
}

function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `fixed top-24 right-4 glass rounded-lg p-4 max-w-sm z-50 transform translate-x-full transition-transform duration-300`;
    notification.innerHTML = `
        <div class="flex items-center">
            <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'warning' ? 'exclamation-triangle' : 'info-circle'} text-${type === 'success' ? 'green' : type === 'warning' ? 'yellow' : 'cyan'}-400 text-xl mr-3"></i>
            <div>
                <p class="text-white font-semibold">${type === 'success' ? 'Success' : type === 'warning' ? 'Warning' : 'Info'}</p>
                <p class="text-gray-400 text-sm">${message}</p>
            </div>
        </div>
    `;

    document.body.appendChild(notification);

    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);

    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}