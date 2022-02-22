#!/bin/bash
cd /home/ubuntu/test-for-ec2/server
pm2 stop dist/main.js 2> /dev/null || true
pm2 delete dist/main.js 2> /dev/null || true
