FROM nginx:latest

COPY ./config/app.conf /etc/nginx/conf.d/default.conf

RUN mkdir -p /var/www
RUN chown -R www-data:www-data /var/www