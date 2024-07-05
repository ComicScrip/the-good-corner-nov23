#!/bin/bash

read -p "duckdns prefix (eg: \"myapp\", if your domain is myapp.duckdns.org): " DNS_PREFIX && \
read -p "duckdns token (eg: 00casd01-95d0-42b5-a43c-e1c156facbae7): " DUCKDNS_TOKEN && \
read -p "site port [443]: " PORT && \
PORT=${PORT:-443} && \
WD=$(pwd)

sudo apt-get update && \

# Preapre docker install : https://docs.docker.com/engine/install/debian/
sudo apt-get install ca-certificates curl && \
sudo install -m 0755 -d /etc/apt/keyrings && \
sudo curl -fsSL https://download.docker.com/linux/debian/gpg -o /etc/apt/keyrings/docker.asc && \
sudo chmod a+r /etc/apt/keyrings/docker.asc && \
echo \
 "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.asc] https://download.docker.com/linux/debian \
 $(. /etc/os-release && echo "$VERSION_CODENAME") stable" | \
 sudo tee /etc/apt/sources.list.d/docker.list > /dev/null && \
sudo apt-get update && \

# Install Docker, Caddy, Go, Webhook, Fail2ban
sudo apt-get install -y webhook debian-keyring debian-archive-keyring apt-transport-https fail2ban golang-1.22-go caddy docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin && \

# Configure fail2ban
sudo touch /etc/fail2ban/jail.local && \
sudo chmod o+w /etc/fail2ban/jail.local && \
sudo cat <<EOF > /etc/fail2ban/jail.local
[ssh-ddos]
enabled = true
EOF
sudo /etc/init.d/fail2ban restart && \
# Confirgure docker
sudo groupadd -f docker && \
sudo usermod -aG docker $USER && \

# Configure Go and xcaddy : https://github.com/caddyserver/xcaddy
sudo update-alternatives --install /usr/local/bin/go go /usr/lib/go-1.22/bin/go 1 && \
curl -1sLf 'https://dl.cloudsmith.io/public/caddy/xcaddy/gpg.key' | sudo gpg --dearmor --batch --yes -o /usr/share/keyrings/caddy-xcaddy-archive-keyring.gpg && \
curl -1sLf 'https://dl.cloudsmith.io/public/caddy/xcaddy/debian.deb.txt' | sudo tee /etc/apt/sources.list.d/caddy-xcaddy.list && \
sudo apt update && sudo apt upgrade && \
sudo apt install xcaddy && \

# Complile custom version of caddy with duckdns plugin
xcaddy build --with github.com/caddy-dns/duckdns && \
sudo dpkg-divert --divert /usr/bin/caddy.default --rename /usr/bin/caddy && \
sudo mv ./caddy /usr/bin/caddy.custom && \
sudo update-alternatives --install /usr/bin/caddy caddy /usr/bin/caddy.default 10 && \
sudo update-alternatives --install /usr/bin/caddy caddy /usr/bin/caddy.custom 50 && \
# Configure caddy and restart
sudo chmod o+w /etc/caddy/Caddyfile && \
sudo cat <<EOF > /etc/caddy/Caddyfile
https://$DNS_PREFIX.duckdns.org:$PORT {
    tls { 
        dns duckdns $DUCKDNS_TOKEN 
    }
    reverse_proxy localhost:8000
}

https://ops.$DNS_PREFIX.duckdns.org:$PORT {
    tls { 
        dns duckdns $DUCKDNS_TOKEN 
    }
    reverse_proxy localhost:9000
}
EOF
sudo systemctl start caddy && \

# Configure webhook and restart

sudo touch /etc/webhook.conf && \
sudo chmod o+w /etc/webhook.conf && \
sudo cat <<EOF > /etc/webhook.conf
[
  {
    "id": "update-production",
    "execute-command": "$WD/deploy-production.sh",
    "command-working-directory": "$WD"
  }
]
EOF

sudo chmod o+w /lib/systemd/system/webhook.service && \
sudo cat <<EOF > /lib/systemd/system/webhook.service
[Service]
ExecStart=/usr/bin/webhook -verbose -nopanic -hooks /etc/webhook.conf
User=$USER
Group=$USER

[Install]
WantedBy=multi-user.target
EOF

sudo systemctl daemon-reload && \
sudo systemctl enable webhook && \
sudo systemctl restart webhook && \
echo "✨ DONE ! ✨ Once deployed, your site will be available at https://$DNS_PREFIX.duckdns.org:$PORT"

# To enable running docker without sudo
newgrp docker