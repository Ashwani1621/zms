# Zoo Management System - Database Schema

This document outlines the MongoDB database schema for the Zoo Management System. 

---

## Project Structure


zms/
└── backend/
    ├── src/
    │   ├── config/
    │   │   ├── cloudinary.js  # <-- Cloudinary configuration goes here
    │   │   └── mongodb.js     # <-- Database connection logic
    │   ├── middleware/
    │   │   └── multer.js      # <-- Multer configuration and setup
    │   ├── models/
    │   │   ├── adoptionModel.js
    │   │   ├── animalModel.js
    │   │   ├── eventModel.js
    │   │   ├── medicalRecordModel.js
    │   │   ├── staffProfileModel.js
    │   │   ├── ticketModel.js
    │   │   └── userModel.js
    │   └── server.js         # Main Express app entry point
    ├── .env                  # Environment variables (API keys, secrets)
    ├── package-lock.json
    └── package.json

## How Cloudinary and Multer Fit In
Cloudinary and Multer work together as a two-step process to handle image uploads securely and efficiently.

### 1. Multer (backend/src/middleware/multer.js)
Multer's job is to catch the file from the user's request.

 When a form is submitted with a file, Multer is the first piece of your code that handles it.

It processes the incoming multipart/form-data.

It temporarily stores the uploaded file (either in memory or on the server's disk).

It then passes the file object to your controller so you can do something with it.

multer.js file is where you will configure these settings, such as setting limits on file size or file type.

### 2. Cloudinary (backend/src/config/cloudinary.js)
Cloudinary's job is to permanently store the file in the cloud.

After Multer has handed the file to controller,  code will then use the Cloudinary SDK to upload that file to Cloudinary account.

Your cloudinary.js file will contain the configuration code that connects to your Cloudinary account using the API keys from your .env file.

Your controller will call a function to upload the file to Cloudinary.

Cloudinary will send back a secure URL for the uploaded image.

then save only this URL string into the imageUrl field of your animalModel.

This process keeps your database small and fast, while letting a specialized service handle the heavy lifting of storing and delivering images.

## Core Models

### ### 1. User Model

The central model for authentication and role management. It distinguishes between general visitors and  staff members.

-   **Purpose**: Handles user registration, login, and access control.
-   **Key Fields**:
    -   `username`: Unique identifier for logging in.
    -   `email`: Unique email for communication and login.
    -   `password`: Hashed and secured password.
    -   `role`: An `enum` (`visitor`, `staff`, `admin`) that controls user permissions across the API.
    -   `staffProfile`: A reference (`ObjectId`) to a `StaffProfile` document, linking a user to their specific staff details if their role is not 'visitor'.

### ### 2. Staff Profile Model

A dedicated model to store information specific to staff members, keeping the `User` model clean and focused on authentication.

-   **Purpose**: To store employment-related details for users with `staff` or `admin` roles.
-   **Key Fields**:
    -   `user`: A unique, one-to-one reference to the `User` model.
    -   `jobTitle`: The staff member's official title (e.g., 'Zookeeper', 'Veterinarian').
    -   `department`: The department the staff member belongs to (e.g., 'Animal Care').
    -   `hireDate`: The date the staff member was hired.

### ### 3. Animal Model

A comprehensive model for storing all relevant information about a zoo animal.

-   **Purpose**: To act as a central record for each animal in the zoo.
-   **Key Fields**:
    -   `name`: The animal's given name.
    -   `species`: The species of the animal.
    -   `dateOfBirth`: Used to calculate the animal's age.
    -   `habitat`: A string describing the animal's enclosure or living conditions.
    -   `medicalHistory`: An array of references (`ObjectId`) to `MedicalRecord` documents, creating a complete health log.
-   **Virtual Property**:
    -   `age`: This property is not stored in the database. It is calculated automatically in the application logic based on the `dateOfBirth`.

### ### 4. Medical Record Model

Tracks all veterinary interactions for an animal.

-   **Purpose**: To maintain a detailed and chronological health history for each animal.
-   **Key Fields**:
    -   `animal`: A reference (`ObjectId`) to the `Animal` receiving care.
    -   `veterinarian`: A reference (`ObjectId`) to the `User` (who must have a 'staff' role) that provided the care.
    -   `diagnosis`: The vet's diagnosis for the visit.
    -   `treatment`: The prescribed treatment or notes.

### ### 5. Event Model

This model defines scheduled events, shows, or activities at the zoo. Each event can now have its own price, allowing for special paid attractions in addition to general admission.

- **Purpose**: To manage the scheduling, details, and cost of zoo events.

- **Key Fields**:

- `title`: The name of the event.

- `startDateTime & endDateTime`: Full Date objects for      
  precise scheduling and querying.

- `location`: Where the event takes place within the zoo.

- `price`: A Number representing the cost for this specific event. It defaults to 0 for free events.

### ### 6. Ticket Model

Represents a visitor's ticket for a specific day, potentially including special events.

-   **Purpose**: To manage visitor access and entry.
-   **Key Fields**:
    -   `user`: A reference (`ObjectId`) to the `User` who purchased the ticket.
    -   `events`: An array of references to any `Event` documents included with the ticket.
    -   `visitDate`: The date the ticket is valid for.
    -   `qrCodeId`: A unique identifier for the ticket, intended for QR code generation and validation.
    -   `isZooAccessUsed`: A boolean to track if general admission has been redeemed.

### ### 7. Adoption Model

Manages the symbolic adoption of an animal by a user.

-   **Purpose**: To track and manage the symbolic adoption program.
-   **Key Fields**:
    -   `user`: A reference (`ObjectId`) to the `User` adopting the animal.
    -   `animal`: A reference (`ObjectId`) to the `Animal` being adopted.
    -   `status`: The current status of the adoption application (`Pending`, `Approved`, `Rejected`).
    -   `donationAmount`: The amount donated as part of the adoption.
  
### ### 8 Ticket Price Model 
This is a new model designed to store the base prices for general zoo admission. This separates the core ticket prices from the prices of special events.

- **Purpose**: To provide a simple, admin-manageable lookup table for standard admission fees.

- **Key Fields**:

- `ticketType`: An enum ('Adult', 'Child', 'Senior') that is unique to ensure there is only one price entry per type.

- `price`: A Number that stores the base cost for that ticket type.