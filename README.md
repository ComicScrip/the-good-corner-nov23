# Install on Debian 12

```bash
sudo apt update && sudo apt install -y git && mkdir -p apps/tgc/prod && cd apps/tgc/prod && git clone https://github.com/ComicScrip/the-good-corner-nov23.git . && bash install_debian.sh && cp .env.production.example .env.production && nano .env.production && ./deploy-production.sh && docker exec -it prod-backend-1 sh -c "npm run resetDB"
```
