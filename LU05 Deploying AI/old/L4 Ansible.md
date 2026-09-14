
## How to install Ansible 

### VM

### Install Ansible 

```bash
su
apt update
apt install ansible -y
```

### Write a Playbook

### Get Playbook on VM

### Run Playbook

## Assignment 

Write an ansible script that will set up LightTPD on a Debian-based system.
Have the students build the yaml script using AI and then have them run it on a Debian-VM

```yaml
---
- name: Setup Lighttpd on Debian
  hosts: webservers
  become: yes
  tasks:

    - name: Update apt package index
      apt:
        update_cache: yes

    - name: Install Lighttpd
      apt:
        name: lighttpd
        state: present

    - name: Ensure Lighttpd is enabled and running
      service:
        name: lighttpd
        state: started
        enabled: yes

    - name: Deploy custom index.html
      copy:
        dest: /var/www/html/index.html
        content: |
          <html>
          <head>
            <title>Welcome to Lighttpd</title>
          </head>
          <body>
            <h1>It works! Lighttpd is running on Debian.</h1>
          </body>
          </html>
        owner: www-data
        group: www-data
        mode: '0644'
```