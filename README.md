# Importing the Database using phpMyAdmin

Follow these steps to import the database using phpMyAdmin:

## Prerequisites

Make sure you have XAMPP installed on your system with Apache and MySQL services.

## Steps to Import Database

1. Open phpMyAdmin:

   ```
   Start XAMPP Control Panel.
   Enable Apache and MySQL.
   Open a web browser and go to: http://localhost/phpmyadmin
   ```

2. Create or Select the Database:

   ```
   In phpMyAdmin, click on New to create a new database.
   Name the database "khoaluan".
   ```

3. Import SQL File:

   ```
   Select the Import tab.
   Click Choose File and select the file "khoaluan2.sql".
   Click Go to start the import process.
   ```

4. Confirm the Result:

   ```
   If successful, a message will appear: "Import has been successfully finished."
   ```

#

# Running the Client (Front-end)

Follow these steps to set up and run the client:

## Prerequisites

Make sure you have [Node.js](https://nodejs.org/) installed on your system.

## Installation and Running

1. Navigate to the Client Directory:

   ```
   cd client
   ```

2. Install Dependencies:

   ```
   npm install react-scripts
   ```

3. Start the Front-end Application:

   ```
   npm start
   ```

   This command will start the front-end application. Once it's running, you can access it by opening a web browser and going to `http://localhost:3000`.

## Additional Information

- The `npm start` command runs the app in development mode.
- The page will reload if you make edits.
- You will also see any lint errors in the console.

#

# Running the Back-end (Server)

Follow these steps to set up and run the server:

## Prerequisites

Make sure you have [Node.js](https://nodejs.org/) installed on your system.

## Installation and Running

1. Navigate to the Server Directory:

   ```
   cd server
   ```

2. Install ts-node:

   ```
   npm install -g ts-node
   ```

3. Check and Install Missing Dependencies:

   ```
   npm install --save-dev @types/express @types/cors @types/passport @types/express-session @types/multer
   ```

4. Start the Back-end Application:

   ```
   npm run dev
   ```

   The back-end will be accessible at: `http://localhost:3002`.

#

# Default Accounts

Use these accounts to log in to the application:

## User Account

```
Email: 2100004146@nttu.edu.vn
Password: 123
```

## Admin Account

```
Email: ninhhuynh1980@gmail.com
Password: 123
```

#

# Backend Setup

## Environment Variables (.env File)
```
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=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


SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=sieunhangao0985@gmail.com
SMTP_PASS=qqxl iaxs iyiu mqwn


FRONTEND_URL=http://localhost:3000
BACKEND_URL=http://localhost:3002
```


## Configuring Google OAuth (server/src/config/passport.config.ts)

If config/passport.config.ts is missing, create the file with the following content:

```
import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { AppDataSource } from '../database/db';
import { User } from '../entities/user.entity';

const userRepository = AppDataSource.getRepository(User);

passport.use(
    new GoogleStrategy(
        {
            clientID: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
            callbackURL: `${process.env.BACKEND_URL}/auth/google/callback`,
            scope: ['profile', 'email'],
        },
        async (_accessToken, _refreshToken, profile, done) => {
            try {
                console.log('Google Profile:', profile);
                const googleUser = {
                    googleId: profile.id,
                    email: profile.emails![0].value,
                    username: profile.displayName,
                };
                done(null, googleUser);
            } catch (error) {
                console.error('GoogleStrategy Error:', error);
                done(error as Error, undefined);
            }
        }
    )
);

passport.serializeUser((user: any, done) => {
    done(null, user);
});

passport.deserializeUser((user: any, done) => {
    done(null, user);
});
```

Happy coding!