# We'll start from a ubuntu bionic
FROM ubuntu:bionic

RUN \
  apt-get update && \
  apt-get install --no-install-recommends -y \
  apt-utils

# Install base packages
RUN \
  apt-get install --no-install-recommends -y \
  software-properties-common \
  curl \
  wget \
  acl \
  apt-transport-https \
  lsb-release \
  sudo \
  locales \
  ca-certificates \
  vim \
  git \
  patch \
  mysql-client \
  openssh-client \
  gpg-agent 

RUN DEBIAN_FRONTEND=noninteractive apt-get install tzdata

# Install Nginx + PHP 7.2
#RUN LC_ALL=C.UTF-8 add-apt-repository ppa:ondrej/php
#RUN echo "Europe/Paris" > /etc/timezone && \
#    dpkg-reconfigure -f noninteractive tzdata && \
#    sed -i -e 's/# en_US.UTF-8 UTF-8/en_US.UTF-8 UTF-8/' /etc/locale.gen && \
#    echo 'LANG="en_US.UTF-8"'>/etc/default/locale && \
#    dpkg-reconfigure --frontend=noninteractive locales && \
#    update-locale LANG=en_US.UTF-8
#
RUN \
  apt-get update && \
  apt-get install --no-install-recommends -y \
  nginx \
  php7.2-fpm \
  php7.2-mysql \
  php7.2-gd \
  php7.2-dev \
  php7.2-curl \
  php7.2-cli \
  php7.2-intl \
  php7.2-json \
  php7.2-common \
  php7.2-xml \
  php7.2-mbstring \
  php7.2-xdebug \
  php7.2-zip \
  php7.2-soap

# Filebeat
#RUN wget -qO - https://artifacts.elastic.co/GPG-KEY-elasticsearch | apt-key add - \
#   && echo "deb https://artifacts.elastic.co/packages/6.x/apt stable main" > /etc/apt/sources.list.d/elastic-6.x.list


# Add node 6 & yarn
RUN   echo "deb https://deb.nodesource.com/node_6.x bionic main" >> /etc/apt/sources.list.d/nodejs.list
RUN   echo "deb-src https://deb.nodesource.com/node_6.x bionic main" >> /etc/apt/sources.list.d/nodejs.list
RUN curl -s https://deb.nodesource.com/gpgkey/nodesource.gpg.key | apt-key add -
RUN echo "deb https://dl.yarnpkg.com/debian/ stable main" | tee /etc/apt/sources.list.d/yarn.list
RUN curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add -
#
RUN \
  apt-get update && \
  apt-get install --no-install-recommends -y \
  nodejs \
  yarn
  # filebeat

# Additional PHP config
RUN sed -i  's/;realpath_cache_size =.*$/realpath_cache_size = 8192K/g' /etc/php/7.2/fpm/php.ini
RUN sed -i  's/;realpath_cache_size =.*$/realpath_cache_size = 8192K/g' /etc/php/7.2/cli/php.ini
RUN sed -i  's/;realpath_cache_ttl =.*$/realpath_cache_ttl = 600/g' /etc/php/7.2/fpm/php.ini
RUN sed -i  's/;realpath_cache_ttl =.*$/realpath_cache_ttl = 600/g' /etc/php/7.2/cli/php.ini
RUN sed -i  's/upload_max_filesize = .*$/upload_max_filesize = 20M/g' /etc/php/7.2/cli/php.ini
RUN sed -i  's/post_max_size = .*$/post_max_size = 20M/g' /etc/php/7.2/cli/php.ini
RUN sed -i  's/memory_limit =.*$/memory_limit = 512M/g' /etc/php/7.2/fpm/php.ini
RUN sed -i  's/memory_limit =.*$/memory_limit = 512M/g' /etc/php/7.2/cli/php.ini
ADD conf/xdebug.tpl.conf  /etc/php/7.2/fpm/conf.d/xdebug.tpl.conf
ADD conf/xdebug.tpl.conf  /etc/php/7.2/cli/conf.d/xdebug.tpl.conf
RUN rm -f /etc/php/7.2/fpm/conf.d/20-xdebug.ini
RUN rm -f /etc/php/7.2/cli/conf.d/20-xdebug.ini
RUN echo 'export PHP_IDE_CONFIG="serverName=adbm"' >> ~/.bashrc
RUN echo 'export PHP_IDE_CONFIG="serverName=adbm"' >> /var/www/.bashrc

# Timezone
RUN rm /etc/localtime
RUN ln -s /usr/share/zoneinfo/Europe/Paris /etc/localtime

# PhpMyAdmin
ENV PHPMYADMIN 4.7+snapshot
RUN curl --output phpMyAdmin.tar.gz --location https://files.phpmyadmin.net/snapshots/phpMyAdmin-${PHPMYADMIN}-all-languages.tar.gz \
    && tar xzf phpMyAdmin.tar.gz \
    && rm phpMyAdmin.tar.gz \
    && mv phpMyAdmin-$PHPMYADMIN-all-languages /var/www/phpmyadmin
ADD conf/phpmyadmin.config.inc.php /var/www/phpmyadmin/config.inc.php

# Install Composer
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer
RUN mkdir -p /var/www/.composer
RUN chmod -Rf 777 /var/www/.composer


# Install Drush & drupal console
RUN sudo ln -s /var/www/drupal/vendor/drush/drush/drush /usr/local/bin/drush
RUN sudo ln -s /var/www/drupal/vendor/drupal/console/bin/drupal /usr/local/bin/drupal

# Lsyncd
#RUN mkdir /etc/lsyncd && apt-get install --no-install-recommends -y lsyncd
#ADD conf/lsyncd.conf.lua /etc/lsyncd/

# Nginx conf
ADD conf/sites-available/*.conf /etc/nginx/sites-available/
ADD conf/conf.d/*.conf /etc/nginx/conf.d/
ADD conf/snippets/*.conf /etc/nginx/snippets/
RUN ln -s /etc/nginx/sites-available/*.conf /etc/nginx/sites-enabled/
RUN rm /etc/nginx/sites-enabled/default
RUN mkdir "/run/php"
RUN mkdir -p /var/cache/nginx/microcache

# nginx must run in foreground
RUN   echo "daemon off;" >> /etc/nginx/nginx.conf

# SSH keys, will be usefull for ajaris tunnel
RUN mkdir -p /root/.ssh
RUN echo 'IdentityFile ~/.ssh-local/id_rsa' > ~/.ssh/config
RUN echo "Host 195.114.115.70\n\tStrictHostKeyChecking no\n" >> /root/.ssh/config

# Filebeat conf
#ADD conf/filebeat/kibana /etc/filebeat/kibana
#ADD conf/filebeat/filebeat.yml /etc/filebeat/
#RUN sudo chmod go-w /etc/filebeat/filebeat.yml

# Install go-lang, only used in docker, not in prod, to export dashboards
#RUN \
#  apt-get install --no-install-recommends -y \
#  npm \
#  golang-go
#RUN mkdir -p /root/go/src/github.com/elastic \
#   && cd /root/go/src/github.com/elastic \
#   && wget https://github.com/elastic/beats/archive/v6.3.0.tar.gz -O - | tar -xz
#   && mv * beats
# After this, you can run:
# go run  /root/go/src/github.com/elastic/beats/dev-tools/cmd/dashboards/export_dashboards.go -kibana http://adbm-kibana:5601

# Install elasticdump, only used in docker, not in prod, to export index
#RUN cd /root \
#  && yarn add elasticdump \
#  && ln -s /root/node_modules/elasticdump/bin/elasticdump /usr/bin/elasticdump


WORKDIR /var/www

# chown must be done here because before this line, volumes are not mounted yet.
ENTRYPOINT sudo /etc/init.d/php7.2-fpm start && \
    #(cd /var/www/pim && yarn install && yarn run encore dev --watch) & \
    #(sudo /usr/bin/filebeat) & \
    sudo nginx

EXPOSE 80 443
