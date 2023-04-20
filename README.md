## Setup
Follow the following installation steps to install the app on local environment, keep in mind that prerequisites are must have.

### Prerequisites
1. Git repo access.

### Installation steps
1. Clone repo from git => ```git clone https://github.com/manishparui/innoscripta.git```
2. Setup docker containers => ```docker-compose up -d```
3. Check running container => ```docker ps```
4. Sign into backend container => ```docker exec -it innoscripta-backend-1 sh``` replace ```innoscripta-backend-1``` from pervious step if required.
5. Generate key => ```php artisan key:generate```
6. Migrate database => ```php artisan migrate```
7. There two ways to populate database (for each execution of following commands it will insert 10 data at a time).
  - i. Populate database with fake data => ```php artisan db:seed```
  - ii. Populate database with real data => ```curl http://localhost:8000/api/storeArticlesFromSources```
9. Visit ```http://localhost:3000``` to see the app in action.
10. Sign out from backend container => ```exit```
11. Stop running docker containers and app => ```docker-compose stop```