#!/bin/bash

read -p "duckdns prefix (eg: \"myapp\", if your domain is myapp.duckdns.org): " DNS_PREFIX && \
read -p "duckdns token (eg: 00casd01-95d0-42b5-a43c-e1c156facbae7): " DUCKDNS_TOKEN && \
read -p "site port [443]: " PORT && \
PORT=${PORT:-443} && \

sudo apt-get update && \
sudo apt-get install ca-certificates curl && \
sudo install -m 0755 -d /etc/apt/keyrings && \
sudo curl -fsSL https://download.docker.com/linux/debian/gpg -o /etc/apt/keyrings/docker.asc && \
sudo chmod a+r /etc/apt/keyrings/docker.asc && \
echo \
 "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.asc] https://download.docker.com/linux/debian \
 $(. /etc/os-release && echo "$VERSION_CODENAME") stable" | \
 sudo tee /etc/apt/sources.list.d/docker.list > /dev/null && \
sudo apt-get update && \
sudo apt-get install -y golang-1.22-go caddy git-all docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin && \
sudo groupadd -f docker && \
sudo usermod -aG docker $USER && \
sudo update-alternatives --install /usr/local/bin/go go /usr/lib/go-1.22/bin/go 1 && \
rm -rf caddy_with_duckdns && mkdir caddy_with_duckdns && cd caddy_with_duckdns && \
sudo apt install -y debian-keyring debian-archive-keyring apt-transport-https && \
curl -1sLf 'https://dl.cloudsmith.io/public/caddy/xcaddy/gpg.key' | sudo gpg --dearmor --batch --yes -o /usr/share/keyrings/caddy-xcaddy-archive-keyring.gpg && \
curl -1sLf 'https://dl.cloudsmith.io/public/caddy/xcaddy/debian.deb.txt' | sudo tee /etc/apt/sources.list.d/caddy-xcaddy.list && \
sudo apt update && sudo apt upgrade && \
sudo apt install xcaddy && \
xcaddy build --with github.com/caddy-dns/duckdns && \
sudo dpkg-divert --divert /usr/bin/caddy.default --rename /usr/bin/caddy && \
sudo mv ./caddy /usr/bin/caddy.custom && \
sudo update-alternatives --install /usr/bin/caddy caddy /usr/bin/caddy.default 10 && \
sudo update-alternatives --install /usr/bin/caddy caddy /usr/bin/caddy.custom 50 && \
sudo chmod o+w /etc/caddy/Caddyfile
sudo cat <<EOF > /etc/caddy/Caddyfile
https://$DNS_PREFIX.duckdns.org:$PORT {
    tls {
        dns duckdns $DUCKDNS_TOKEN
    }
    root * /usr/share/caddy
    file_server
}
EOF
sudo systemctl stop apache2 && \
sudo systemctl start caddy && \
newgrp docker