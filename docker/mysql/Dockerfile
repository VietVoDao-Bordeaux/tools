FROM mysql:5.7

# All scripts *.sh and *.sql in /docker-entrypoint-initdb.d will be executed at container init
#COPY init/* /docker-entrypoint-initdb.d/

# Specific conf instructions.
ADD conf.d/*.cnf /etc/mysql/conf.d/