#!/bin/bash
cd /home/ubuntu/test-for-ec2/server
npm install
npm install pm2@latest -g
npm install @nestjs/cli -g
sudo apt-get update
sudo apt-get install authbind
sudo touch /etc/authbind/byport/3000
sudo chown ubuntu /etc/authbind/byport/3000
sudo chmod 755 /etc/authbind/byport/3000