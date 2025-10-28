
// Load saved settings
loadSettings();

// Navigation buttons
document.getElementById('homeBtn').addEventListener('click', function () {
    window.location.href = 'index.html';
});

document.getElementById('profileBtn').addEventListener('click', function () {
    window.location.href = 'profile.html';
});

// Toggle event listeners
document.getElementById('darkModeToggle').addEventListener('change', toggleDarkMode);
document.getElementById('notificationToggle').addEventListener('change', toggleNotifications);
document.getElementById('soundToggle').addEventListener('change', toggleSound);
document.getElementById('animationToggle').addEventListener('change', toggleAnimations);

// Action buttons
document.getElementById('resetVotesBtn').addEventListener('click', function () {
    showConfirmModal('Are you sure you want to reset all your votes?', () => {
        localStorage.removeItem('votingHistory');
        localStorage.setItem('votesRemaining', '3');
        showNotification('Votes reset successfully!', 'success');
    });
});

document.getElementById('exportDataBtn').addEventListener('click', exportData);

document.getElementById('deleteAccountBtn').addEventListener('click', function () {
    showConfirmModal('Are you sure you want to delete your account? This action cannot be undone.', () => {
        localStorage.clear();
        window.location.href = 'index.html';
    });
});

// Save settings button
document.getElementById('saveSettingsBtn').addEventListener('click', saveSettings);

// Confirm modal buttons
document.getElementById('confirmNo').addEventListener('click', hideConfirmModal);

function loadSettings() {
    const settings = JSON.parse(localStorage.getItem('settings') || '{}');

    // Apply saved settings
    if (settings.darkMode) {
        document.getElementById('darkModeToggle').checked = true;
        document.body.classList.add('dark');
    }

    if (settings.notifications !== false) {
        document.getElementById('notificationToggle').checked = true;
    }

    if (settings.sound !== false) {
        document.getElementById('soundToggle').checked = true;
    }

    if (settings.animations !== false) {
        document.getElementById('animationToggle').checked = true;
    }
}

function toggleDarkMode() {
    const isDark = document.getElementById('darkModeToggle').checked;
    if (isDark) {
        document.body.classList.add('dark');
    } else {
        document.body.classList.remove('dark');
    }
}

function toggleNotifications() {
    const isEnabled = document.getElementById('notificationToggle').checked;
    if (isEnabled) {
        showNotification('Notifications enabled', 'info');
    }
}

function toggleSound() {
    const isEnabled = document.getElementById('soundToggle').checked;
    // Sound toggle logic here
}

function toggleAnimations() {
    const isEnabled = document.getElementById('animationToggle').checked;
    if (!isEnabled) {
        document.querySelectorAll('*').forEach(el => {
            el.style.animation = 'none';
        });
    }
}

function saveSettings() {
    const settings = {
        darkMode: document.getElementById('darkModeToggle').checked,
        notifications: document.getElementById('notificationToggle').checked,
        sound: document.getElementById('soundToggle').checked,
        animations: document.getElementById('animationToggle').checked,
        profileVisibility: document.getElementById('profileVisibilityToggle').checked,
        anonymous: document.getElementById('anonymousToggle').checked,
        dataCollection: document.getElementById('dataCollectionToggle').checked
    };

    localStorage.setItem('settings', JSON.stringify(settings));
    showNotification('Settings saved successfully!', 'success');
}

function exportData() {
    const data = {
        username: localStorage.getItem('username'),
        points: localStorage.getItem('points'),
        votingHistory: JSON.parse(localStorage.getItem('votingHistory') || '[]'),
        settings: JSON.parse(localStorage.getItem('settings') || '{}')
    };

    const dataStr = JSON.stringify(data, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,' + encodeURIComponent(dataStr);

    const exportFileDefaultName = `voting-data-${Date.now()}.json`;

    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();

    showNotification('Data exported successfully!', 'success');
}

function showConfirmModal(message, onConfirm) {
    const modal = document.getElementById('confirmModal');
    document.getElementById('confirmMessage').textContent = message;
    modal.classList.remove('hidden');

    document.getElementById('confirmYes').onclick = function () {
        onConfirm();
        hideConfirmModal();
    };
}

function hideConfirmModal() {
    document.getElementById('confirmModal').classList.add('hidden');
}

function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `fixed top-20 right-4 glass rounded-lg p-4 max-w-sm z-50 notification-enter`;
    notification.innerHTML = `
        <div class="flex items-center">
            <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'warning' ? 'exclamation-triangle' : 'info-circle'} text-${type === 'success' ? 'green' : type === 'warning' ? 'yellow' : 'purple'}-400 text-2xl mr-3"></i>
            <div>
                <p class="text-white font-semibold">${type === 'success' ? 'Success' : type === 'warning' ? 'Warning' : 'Info'}</p>
                <p class="text-purple-200 text-sm">${message}</p>
            </div>
        </div>
    `;

    document.body.appendChild(notification);

    setTimeout(() => {
        notification.classList.add('notification-exit');
        setTimeout(() => {
            notification.remove();
        }, 500);
    }, 3000);
}