document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const searchInput = document.getElementById('search-input');
    const searchBtn = document.getElementById('search-btn');
    const cartIcon = document.getElementById('cart-icon');
    const profileBtn = document.getElementById('profile-btn');
    const exploreBtn = document.getElementById('explore-btn');
    const courseList = document.getElementById('course-list');
    const cartModal = document.getElementById('cart-modal');
    const profileModal = document.getElementById('profile-modal');
    const closeModalBtns = document.querySelectorAll('.close-modal');
    const cartItemsContainer = document.getElementById('cart-items');
    const cartTotalPrice = document.getElementById('cart-total-price');
    const checkoutBtn = document.getElementById('checkout-btn');
    const logoutBtn = document.getElementById('logout-btn');
    
    // Dashboard elements
    const enrolledCoursesEl = document.getElementById('enrolled-courses');
    const completedLessonsEl = document.getElementById('completed-lessons');
    const certificatesEl = document.getElementById('certificates');
    const learningProgressEl = document.getElementById('learning-progress');
    
    // Profile elements
    const profileNameEl = document.getElementById('profile-name');
    const profileEmailEl = document.getElementById('profile-email');
    const profileCoursesEl = document.getElementById('profile-courses');
    const profileCompletedEl = document.getElementById('profile-completed');
    const profileHoursEl = document.getElementById('profile-hours');

    //samlpe data
    const utl="http://localhost:8080/api/getall";
    let prome=fetch(utl)
    prome.then((response)=>{
        return response.json()
    }).then((data)=>{
        console.log(data)
    }).catch((error)=>{
        console.log("error")
    })
    // Sample course data
    const courses = [
        {
            id: 'webdev101',
            title: 'Complete Web Development Bootcamp',
            instructor: 'Sarah Johnson',
            price: 89.99,
            rating: 4.8,
            image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
            category: 'Development',
            duration: '35 hours',
            students: 1250,
            lessons: 45
        },
        {
            id: 'datascience101',
            title: 'Data Science Fundamentals',
            instructor: 'Michael Chen',
            price: 99.99,
            rating: 4.7,
            image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
            category: 'Data Science',
            duration: '42 hours',
            students: 890,
            lessons: 38
        },
        {
            id: 'marketing101',
            title: 'Digital Marketing Masterclass',
            instructor: 'Emily Rodriguez',
            price: 79.99,
            rating: 4.9,
            image: 'https://images.unsplash.com/photo-1551033406-611cf9a28f67?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
            category: 'Marketing',
            duration: '28 hours',
            students: 2100,
            lessons: 32
        },
        {
            id: 'flutter101',
            title: 'Flutter Mobile App Development',
            instructor: 'David Kim',
            price: 109.99,
            rating: 4.6,
            image: 'https://images.unsplash.com/photo-1542626991-cbc4e32524cc?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
            category: 'Development',
            duration: '40 hours',
            students: 750,
            lessons: 52
        },
        {
            id: 'analytics101',
            title: 'Business Analytics with Python',
            instructor: 'Robert Taylor',
            price: 94.99,
            rating: 4.5,
            image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
            category: 'Data Science',
            duration: '30 hours',
            students: 680,
            lessons: 28
        },
        {
            id: 'ux101',
            title: 'UX/UI Design Principles',
            instructor: 'Lisa Wong',
            price: 84.99,
            rating: 4.8,
            image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
            category: 'Design',
            duration: '25 hours',
            students: 1500,
            lessons: 30
        }
    ];
    
    // Sample user data
    const user = {
        name: 'Jane Doe',
        email: 'jane.doe@example.com',
        enrolledCourses: 3,
        completedCourses: 1,
        learningHours: 42,
        certificates: 1
    };
    
    // Initialize cart from localStorage or empty array
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    // Initialize enrolled courses (in a real app, this would come from backend)
    let enrolledCourses = [
        courses[0], 
        courses[2], 
        courses[5]
    ];
    
    // Render courses
    function renderCourses(coursesToRender) {
        courseList.innerHTML = '';
        
        coursesToRender.forEach(course => {
            const isEnrolled = enrolledCourses.some(c => c.id === course.id);
            
            const courseCard = document.createElement('div');
            courseCard.className = 'course-card';
            courseCard.dataset.id = course.id;
            
            courseCard.innerHTML = `
                <img src="${course.image}" alt="${course.title}" class="course-image">
                <div class="course-info">
                    <h3 class="course-title">${course.title}</h3>
                    <p class="course-instructor">By ${course.instructor}</p>
                    <div class="course-meta">
                        <span class="course-price">$${course.price.toFixed(2)}</span>
                        <span class="course-rating">
                            <i class="fas fa-star"></i> ${course.rating}
                        </span>
                    </div>
                    <button class="add-to-cart ${isEnrolled ? 'enrolled' : ''}" 
                            ${isEnrolled ? 'disabled' : ''}>
                        ${isEnrolled ? 'Enrolled' : 'Add to Cart'}
                    </button>
                </div>
            `;
            
            courseList.appendChild(courseCard);
        });
        
        // Add event listeners to all Add to Cart buttons
        document.querySelectorAll('.add-to-cart:not(.enrolled)').forEach(button => {
            button.addEventListener('click', addToCart);
        });
    }
    
    // Add to cart function
    function addToCart(e) {
        const button = e.target;
        const courseCard = button.closest('.course-card');
        const courseId = courseCard.dataset.id;
        
        const course = courses.find(c => c.id === courseId);
        
        // Check if course already in cart
        const existingItem = cart.find(item => item.id === courseId);
        
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cart.push({
                ...course,
                quantity: 1
            });
        }
        
        // Update UI
        updateCartCount();
        saveCartToStorage();
        
        // Visual feedback
        button.textContent = 'Added!';
        button.classList.add('added');
        
        setTimeout(() => {
            button.textContent = 'Add to Cart';
            button.classList.remove('added');
        }, 2000);
    }
    
    // Update cart count in header
    function updateCartCount() {
        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        document.querySelector('.cart-count').textContent = totalItems;
    }
    
    // Save cart to localStorage
    function saveCartToStorage() {
        localStorage.setItem('cart', JSON.stringify(cart));
    }
    
    // Render cart items
    function renderCartItems() {
        cartItemsContainer.innerHTML = '';
        
        if (cart.length === 0) {
            cartItemsContainer.innerHTML = '<p>Your cart is empty</p>';
            cartTotalPrice.textContent = '$0.00';
            return;
        }
        
        cart.forEach(item => {
            const cartItem = document.createElement('div');
            cartItem.className = 'cart-item';
            
            cartItem.innerHTML = `
                <div class="cart-item-info">
                    <img src="${item.image}" alt="${item.title}" class="cart-item-img">
                    <div class="cart-item-details">
                        <h4>${item.title}</h4>
                        <p>By ${item.instructor}</p>
                    </div>
                </div>
                <div class="cart-item-actions">
                    <span class="cart-item-price">$${(item.price * item.quantity).toFixed(2)}</span>
                    <div class="quantity-controls">
                        <button class="quantity-btn minus" data-id="${item.id}">-</button>
                        <span>${item.quantity}</span>
                        <button class="quantity-btn plus" data-id="${item.id}">+</button>
                    </div>
                    <button class="remove-item" data-id="${item.id}">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            `;
            
            cartItemsContainer.appendChild(cartItem);
        });
        
        // Calculate and display total
        const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        cartTotalPrice.textContent = `$${total.toFixed(2)}`;
        
        // Add event listeners to quantity buttons
        document.querySelectorAll('.quantity-btn.minus').forEach(btn => {
            btn.addEventListener('click', decreaseQuantity);
        });
        
        document.querySelectorAll('.quantity-btn.plus').forEach(btn => {
            btn.addEventListener('click', increaseQuantity);
        });
        
        document.querySelectorAll('.remove-item').forEach(btn => {
            btn.addEventListener('click', removeItem);
        });
    }
    
    // Decrease item quantity
    function decreaseQuantity(e) {
        const courseId = e.target.dataset.id;
        const item = cart.find(item => item.id === courseId);
        
        if (item.quantity > 1) {
            item.quantity -= 1;
        } else {
            cart = cart.filter(item => item.id !== courseId);
        }
        
        saveCartToStorage();
        updateCartCount();
        renderCartItems();
    }
    
    // Increase item quantity
    function increaseQuantity(e) {
        const courseId = e.target.dataset.id;
        const item = cart.find(item => item.id === courseId);
        
        item.quantity += 1;
        
        saveCartToStorage();
        updateCartCount();
        renderCartItems();
    }
    
    // Remove item from cart
    function removeItem(e) {
        const courseId = e.target.closest('button').dataset.id;
        cart = cart.filter(item => item.id !== courseId);
        
        saveCartToStorage();
        updateCartCount();
        renderCartItems();
    }
    
    // Update dashboard stats
    function updateDashboard() {
        enrolledCoursesEl.textContent = enrolledCourses.length;
        completedLessonsEl.textContent = enrolledCourses.reduce((sum, course) => sum + course.lessons, 0);
        certificatesEl.textContent = user.certificates;
        learningProgressEl.textContent = '75%'; // Sample progress
        
        // Update profile stats
        profileNameEl.textContent = user.name;
        profileEmailEl.textContent = user.email;
        profileCoursesEl.textContent = user.enrolledCourses;
        profileCompletedEl.textContent = user.completedCourses;
        profileHoursEl.textContent = user.learningHours;
    }
    
    // Search functionality
    function searchCourses() {
        const searchTerm = searchInput.value.toLowerCase();
        
        if (searchTerm === '') {
            renderCourses(courses);
            return;
        }
        
        const filteredCourses = courses.filter(course => 
            course.title.toLowerCase().includes(searchTerm) || 
            course.instructor.toLowerCase().includes(searchTerm) ||
            course.category.toLowerCase().includes(searchTerm)
        );
        
        renderCourses(filteredCourses);
    }
    
    // Checkout function
    function checkout() {
        if (cart.length === 0) {
            alert('Your cart is empty!');
            return;
        }
        
        // In a real app, this would redirect to payment page
        alert(`Proceeding to checkout with ${cart.length} items. Total: $${cart.reduce((sum, item) => sum + (item.price * item.quantity), 0).toFixed(2)}`);
        
        // For demo purposes, we'll just enroll the user in the courses
        cart.forEach(item => {
            if (!enrolledCourses.some(c => c.id === item.id)) {
                enrolledCourses.push(courses.find(c => c.id === item.id));
            }
        });
        
        // Update user stats
        user.enrolledCourses = enrolledCourses.length;
        user.learningHours += cart.reduce((sum, item) => sum + parseInt(item.duration), 0);
        
        // Clear cart
        cart = [];
        saveCartToStorage();
        updateCartCount();
        renderCartItems();
        renderCourses(courses);
        updateDashboard();
        
        // Close modal
        cartModal.style.display = 'none';
    }
    
    // Event Listeners
    searchBtn.addEventListener('click', searchCourses);
    searchInput.addEventListener('keyup', function(e) {
        if (e.key === 'Enter') {
            searchCourses();
        }
    });
    
    cartIcon.addEventListener('click', function(e) {
        e.preventDefault();
        renderCartItems();
        cartModal.style.display = 'block';
    });
    
    profileBtn.addEventListener('click', function(e) {
        e.preventDefault();
        profileModal.style.display = 'block';
    });
    
    exploreBtn.addEventListener('click', function() {
        document.getElementById('courses').scrollIntoView({ behavior: 'smooth' });
    });
    
    closeModalBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            cartModal.style.display = 'none';
            profileModal.style.display = 'none';
        });
    });
    
    window.addEventListener('click', function(e) {
        if (e.target === cartModal) {
            cartModal.style.display = 'none';
        }
        if (e.target === profileModal) {
            profileModal.style.display = 'none';
        }
    });
    
    checkoutBtn.addEventListener('click', checkout);
    
    logoutBtn.addEventListener('click', function() {
        // In a real app, this would log the user out
        alert('You have been logged out');
        profileModal.style.display = 'none';
    });
    
    // Initialize the app
    renderCourses(courses);
    updateCartCount();
    updateDashboard();
});