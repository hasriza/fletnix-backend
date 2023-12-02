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

```bash
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
