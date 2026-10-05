# aimaker.news 域名上线

2026-10-05 已确认 aimaker.news 和 www.aimaker.news 的 A 记录均指向 47.236.76.200，并申请覆盖两者的 HTTPS 证书。

正式地址为 https://aimaker.news；HTTP 与 www 地址均跳转到正式地址，原IP访问继续保留。服务器私有 .env 中 SITE_URL 已更新为正式域名，因此RSS与文章阅读地址使用HTTPS域名。修改前的NGINX配置和私有环境文件保存在服务器私有 .data，未提交到仓库。

域名证书使用 `/etc/letsencrypt/live/aimaker-news/`，到期日2027-01-03；现有 maker-cert-renew.timer 已启用，maker-cert-renew 脚本会续签所有到期证书并重新加载NGINX。HTTP ACME挑战路径保留供续签使用。部署时先申请证书，再应用 deploy/maker/mobile-nginx.conf，避免不存在证书导致NGINX启动失败。

上线检查：HTTPS首页200，www和HTTP跳转到主域名，RSS50条且文章地址使用新域名，文章页200，管理员投稿入口未登录时转到登录页，旧IP首页200。
