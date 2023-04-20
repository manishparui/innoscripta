FROM  php:8.1-fpm
RUN apt-get update && apt-get install -y \
    libonig-dev \
    libxml2-dev \
    libzip-dev \
    libpng-dev \
    libjpeg-dev \
    libfreetype6-dev \
    && docker-php-ext-install pdo mbstring pdo_mysql
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer
# RUN docker-php-ext-install pdo mbstring pdo_mysql
WORKDIR /app/backend
COPY . .
RUN composer install
EXPOSE 8000
CMD php artisan serve --host=0.0.0.0
