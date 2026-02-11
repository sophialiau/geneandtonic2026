// Function to fetch ticket data from your ticket software API
async function fetchTicketData() {
    const ticketStatusDiv = document.getElementById('ticket-status');
    
    try {
        // MANUAL UPDATE: Update these numbers from your Bounce Events dashboard
        // Simply replace the values below whenever you check your ticket sales
        const data = {
            ticketsSold: 0,
            ticketsAvailable: 116,
        };

        displayTicketData(data);
    } catch (error) {
        console.error('Error fetching ticket data:', error);
        ticketStatusDiv.innerHTML = `
            <p style="color: #c9534d;">Unable to load ticket information. Please try again later.</p>
        `;
    }
}

// Function to display ticket data dynamically
function displayTicketData(data) {
    const ticketStatusDiv = document.getElementById('ticket-status');
    
    const ticketsRemaining = data.ticketsAvailable - data.ticketsSold;
    const percentageSold = (data.ticketsSold / data.ticketsAvailable * 100).toFixed(1);
    
    ticketStatusDiv.innerHTML = `
        <div style="width: 100%;">
            <div class="status-item">
                <span class="status-item-label">Tickets Sold</span>
                <span class="status-item-value">${data.ticketsSold} / ${data.ticketsAvailable}</span>
            </div>
            <div class="status-item">
                <span class="status-item-label">Tickets Remaining</span>
                <span class="status-item-value">${ticketsRemaining}</span>
            </div>
            <div class="status-item">
                <span class="status-item-label">Availability</span>
                <span class="status-item-value">${percentageSold}% sold</span>
            </div>
        </div>
    `;
}

// Function to set active nav link based on current page
function setActiveNavLink() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-links a');
    
    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPage || (currentPage === '' && href === 'index.html')) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    setActiveNavLink();
    
    // Only fetch ticket data on the tickets page
    if (window.location.pathname.includes('tickets.html') || 
        (window.location.pathname.split('/').pop() === 'tickets.html')) {
        fetchTicketData();
    }
});

// Optional: Refresh ticket data every 30 seconds
// Uncomment to enable auto-refresh
// setInterval(() => {
//     if (document.getElementById('ticket-status')) {
//         fetchTicketData();
//     }
// }, 30000);
