# RIUFrontendFernandoLamas

This is a platform where you can manage superheroes, including adding, editing, and viewing details about various superheroes.

The goal of this project is to create a platform where users can manage superheroes, including adding, editing, and viewing details about various superheroes.

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 18.2.12.

## 🎨 UI with Angular Material

This project uses Angular Material as the main UI component library, providing a clean and responsive design out of the box.

## 💅 Styling with SCSS

The project uses SCSS as the styling language, allowing for:

- Variables and mixins
- Nested selectors
- Easier theming and customization of Angular Material

## 📦 Fake API with JSON Server

This project uses json-server internally to simulate a REST API locally. It's perfect for development and testing without the need for a real backend. It runs locally in the port 3000.

</br>

## 🌐 Available Endpoints

GET <http://localhost:3000/superheroes> → Get all superheroes.

GET <http://localhost:3000/superheroes/1> → Get superhero with ID 1.

POST <http://localhost:3000/superheroes> → Create a new superhero.

PATCH <http://localhost:3000/superheroes/1> → Update superhero.

DELETE <http://localhost:3000/superheroes/1> → Delete superhero.

</br>
Example of payload with mandatory fields for post and patch request:

```json
{
  "name": "New Hero name",
  "realName": "new hero real name",
  "powers": ["Acrobat", "Charm", "Agility"],
  "universe": "DC"
}
```

</br>

## 📁 Database File

All data is stored in the db.json file inside /src/app/data folder of the project. You can edit it manually or through the Angular app.

</br>

## 🧪 Testing the API

You can test the endpoints using tools like:

- Postman
- Insomnia
- cURL
- Or Any REST client of your choice

Just make requests to <http://localhost:3000>

</br>

## Prerequisites

- Docker and Docker Compose installed on your machine.

</br>

## Setup and Running the App

1. **Build and Run the App**

   Run the following command in the directory containing `docker-compose.yml`:

   ```bash
   docker-compose up -d --build
   ```

> The app will start and be available at <http://localhost:8000>.
