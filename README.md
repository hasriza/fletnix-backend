Developed back-end using Node+Express in adherence to [Tasks list](https://drive.google.com/file/d/11auWl_KUrOhJlDL-xudumdA05rWvh2ZW/view?usp=drive_link)

# Instructions for setting up

## MongoDB:

- Install mongoDB
- Create a new database: "fletnix"
- Create collection: "contents" and import shared csv: [Contents CSV](https://drive.google.com/file/d/1a9S-Qfs1Mc_SutljdvOEAnJ5QJLEAebB/view?usp=sharing)
- Add indexes for rating, show_id, and title (optional - better performance)

## Node version

Preferred: v18.16.1

## Steps:

Open terminal and enter

# Prepare .env file:

- Create a new .env file
- Include the following:

```bash
#Port to listen to
PORT=3001

#URL of the Mongo DB
MONGODB_URL=

#JWT secret key
JWT_SECRET=
#Number of minutes after which an access token expires
JWT_ACCESS_EXPIRATION_MINUTES=
#Number of days after which a refresh token expires
JWT_REFRESH_EXPIRATION_DAYS=
#Number of minutes after which a reset password token expires
JWT_RESET_PASSWORD_EXPIRATION_MINUTES=
#Number of minutes after which a verify email token expires
JWT_VERIFY_EMAIL_EXPIRATION_MINUTES=

#MTP configuration options for the email service //
#or testing, you can use a fake SMTP service like Ethereal: https://ethereal.email/create
SMTP_HOST=
SMTP_PORT=
SMTP_USERNAME=
SMTP_PASSWORD=
EMAIL_FROM=
```

- Use git to clone the project and run install:

```bash
git clone https://github.com/hasriza/fletnix-backend.git
yarn install
```

- To run development version:

```bash
yarn run dev
```

- To run production version:

```bash
yarn start
```

### Port will be listening to 3001 (http://localhost:3001)
