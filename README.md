# 🍽️  **Meal Sharing App**

<p><strong>A full-stack web application enabling users to share and reserve meals in their local community. Built with Node.js, Express, MySQL, and Next.js (React), this app encourages community-based meal sharing and reduces food waste.</strong></p>

🚀 **Features**

✅ **Browse Meals:** View a dynamic list of available meals with details like title, description, price, location, and available spots.

✅ **Meal Details:** Access individual meal details and reservation information.

✅ **Make Reservations:** Submit reservations with guest name and contact details.

✅ **Responsive UI:** Optimized for mobile and desktop with a clean, user-friendly layout.

✅ **RESTful API:** Backend endpoints for meals, reservations, and reviews.

✅ **Error Handling:** Clear feedback messages for successful or failed actions.

🛠️ **Tech Stack**:

**Frontend:**
- Next.js (React)

- JavaScript

- CSS (or TailwindCSS, if used)

- Fetch (API calls)


**Backend:**

- Node.js

- Express.js

- Knex.js (query builder)

- MySQL

**Other Tools:**

- Git & GitHub (version control)

  Postman (API testing)

# 📦 Installation
**Clone the Repository:**

git clone https://github.com/yourusername/meal-sharing-app.git

cd meal-sharing-app

**Set Up the Backend:**

**Install dependencies:**


npm install

**Configure the .env file with your database details:**

- DB_HOST=localhost
- DB_USER=root
- DB_PASSWORD=yourpassword
- DB_NAME=meal_sharing

**Run database migrations and seeds:**

- npx knex migrate:latest
- npx knex seed:run
  
**Start the backend server:**

- npm run dev
  
**Set Up the Frontend:**

Navigate to the client folder: -> cd client

**Install dependencies:**
- npm install
  
**Start the frontend server:**

- npm run dev
  
**Access the App:**

Open http://localhost:3000 in your browser.

# 📝 Usage

- Browse meals on the homepage.
- Click on a meal to view details and make a reservation.
- Error and success messages appear via SweetAlert2 pop-ups.

# 📈 Future Enhancements
- User authentication and role-based access control
- Advanced search and filtering (e.g., by cuisine, price, location)
- Upload images for meal listings
- Ratings and reviews from users
- Deployment on cloud platforms (e.g., Heroku, AWS)

# 🤝 Contributing
Contributions are welcome! Please fork the repository, create a new branch, and submit a pull request. For major feature suggestions, please open an issue for discussion first.
