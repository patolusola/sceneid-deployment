SCENEID README DOCUMENT

SceneID Landing Page Project Steps

This documents details the steps taken to provision a server on a Linux (Ubuntu machine) using AWS (EC2 instance).  It includes setting up a Web Server, Creating a Dynamic Landing Page,  Ensuring the Webpage is Secure among other things. 


Objective
The goal was to create and host a simple one-page landing page with a form that allows prospective investors to send messages, which are saved to a file on the server. The stack includes Nginx as a web server, Node.js for the backend API, and GitHub for version control and deployment.


Server Setup
I provisioned an EC2 instance (Ubuntu, t2.micro) using AWS, which I connected to the server via ssh from my local machine. After which I installed the required packages:
	- Nginx (web server)
	- Node.js and npm (to run the backend API)
	- PM2 (to keep the API running as a background process)
	- Git (to clone the project repository)

Domain & DNS
I registered the free domain `sceneid.run.place` on https://freedomain.one/, then went on to configure DNS to point the domain to the EC2 instance's public IP using an A record.

Deployment Steps
Cloned the project repository into `/var/www/sceneid`, I then placed the frontend files in `/var/www/sceneid/html/`. Created Node.js backend at /var/www/sceneid/api/server.js to receive contact form submissions and save them to submissions.txt
Then set appropriate file permissions to allow the API to write to the file.

Nginx Configuration
Created a custom configuration file at `/etc/nginx/sites-available/sceneid` and linked it to sites-enabled/.
Configure Nginx to
	- serve files from /var/www/sceneid/html
	- serve as a reverse proxy to the Node.js server on port 3000
Remove the default site to avoid conflicts.
Then reload Nginx to apply changes

HTTPS with Certbot
Installed Certbot and generated free SSL certificates with: 
	sudo certbot --nginx -d sceneid.run.place -d www.sceneid.run.place
Certbot updated the Nginx config automatically to support HTTPS.

Running the Backend
Booted the backend with PM2:
	pm2 start /var/www/sceneid/api/server.js
	pm2 save
PM2 ensures the API stays active and restarts on reboot.

Outcome
The landing page is accessible via `https://sceneid.run.place`
Contact form submissions are successfully handled by the backend and stored on the server

***** claps for self *****

-----

***************************************** CURTAINS CLOSE *****************************************
