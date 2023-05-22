#!/bin/bash

# Update and upgrade packages
sudo apt-get update -y
sudo apt-get upgrade -y

# Add PHP repository
sudo add-apt-repository ppa:ondrej/php -y

# Update package list again
sudo apt-get update -y

# Install Apache2 web server
sudo apt-get install apache2 -y

# Start Apache2 and enable it to run at boot
sudo systemctl start apache2
sudo systemctl enable apache2

# Check the status of Apache2
sudo systemctl status apache2

# Install MySQL server
sudo apt-get install mysql-server -y

# Start MySQL server and enable it to run at boot
sudo systemctl start mysql
sudo systemctl enable mysql

# Install PHP 7.4 and its required modules
sudo apt-get install php7.4 libapache2-mod-php7.4 php7.4-mysql php7.4-curl php7.4-mbstring php7.4-gd php7.4-xml php7.4-xmlrpc php7.4-intl php7.4-soap php7.4-zip -y
