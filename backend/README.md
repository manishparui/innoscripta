# Web services
Webservices and web API.

## Setup / Deployment
Follow the following installation steps to install the app on local or live environment, keep in mind that prerequisites are must have. Follow the update steps to update the application to letest version.

### Prerequisites
1. Git repo access.
2. Composer package manager (see FAQ for installation steps).

### Installation steps
1. Clone repo from git => ```git clone https://github.com/<username>/<repo_name>.git```
2. Get access to git by entering username and password.
3. Browse project directory => ```cd <repo_name>```
4. Rename .env.example to .env => ```mv staging.env .env```
5. Change .env configuration using any editor i.e. => ```nano .env```
6. Install dependencies => ```composer install```
7. Generate application key => ```php artisan key:generate```
8. Generate storage symlink => ```php artisan storage:link```
9. [Only for live server] Change Apache document root to ```/public``` folder.

### Updation steps
1. Browse project directory  => ```cd <repo_name>```
2. Take latest code from remote => ```git pull```
3. Get access to git by entering username and password.
4. Install dependencies => ```composer install```

## FAQ
#### How install composer?
- Visit [getcomposer.org](https://getcomposer.org/download/)

#### How to change Apache document root?
- **Webmin / Virtualmin** Navigate to ```Virtualmin``` => ```Server Configuration``` => ```Website Options``` then change ```Website document sub-directory``` value to preffered location.