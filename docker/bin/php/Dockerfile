FROM php:7.4-fpm

# Set working directory
WORKDIR /var/www

RUN apt-get update && apt-get install -y \
    git \
    libzip-dev \
    zip \
    unzip

# Install extensions
# RUN docker-php-ext-configure zip --with-libzip
RUN docker-php-ext-configure zip
RUN docker-php-ext-install pdo_mysql zip
RUN curl --silent --show-error https://getcomposer.org/installer | php && \
    mv composer.phar /usr/local/bin/composer

#COPY ./config/php.ini /usr/local/etc/php/php.ini

RUN chown -R www-data:www-data /var/www

# Expose port 9000 and start php-fpm nginx
EXPOSE 9000
CMD ["php-fpm"]
