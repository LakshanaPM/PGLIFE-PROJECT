document.addEventListener('DOMContentLoaded', () => {
    const signupForm = document.getElementById('signup-form');
    const responseMessageDiv = document.getElementById('response-message');
    function showMessage(msg, type) {
        responseMessageDiv.textContent = msg;
        responseMessageDiv.className = `alert alert-${type === 'success' ? 'success' : 'danger'}`; // Bootstrap alert classes
        responseMessageDiv.style.display = 'block';
        setTimeout(() => {
            responseMessageDiv.style.display = 'none'; 
        }, 5000); 
    }

    signupForm.addEventListener('submit', async (event) => {
        event.preventDefault(); // Prevent default form submission

        const formData = new FormData(signupForm);

        // Basic client-side validation (can be more extensive)
        if (!formData.get('full_name') || !formData.get('phone') || !formData.get('email') ||
            !formData.get('password') || !formData.get('college_name') || !formData.get('gender')) {
            showMessage('Please fill in all required fields.', 'error');
            return;
        }

        try {
            const response = await fetch('signup.php', {
                method: 'POST',
                body: formData
            });

            if (!response.ok) {
                // Handle HTTP errors (e.g., 404, 500)
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json(); // Parse JSON response from PHP

            if (data.status === 'success') {
                showMessage(data.message, 'success');
                signupForm.reset(); // Clear the form on successful signup
                // Optionally, close the modal here if needed:
                // $('#signup-modal').modal('hide');
            } else {
                showMessage(data.message, 'error');
            }
        } catch (error) {
            console.error('Fetch error:', error);
            showMessage('Network error or server unavailable. Please try again.', 'error');
        }
    });
});