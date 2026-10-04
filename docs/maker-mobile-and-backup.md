# 手机投稿与完整备份

手机打开 https://47.236.76.200/admin/submissions ，使用已有管理员密码登录，粘贴链接后选择“保存并直接发布”。已有的采集、分类、保存、归档和首页生成队列继续处理，无需电脑在线。也支持原创文章和配图。不要将管理员密码与公开展示链接一起分享。

公网 nginx 使用主机网络反向代理到 127.0.0.1:3000；首页、封面和归档仍由静态目录提供，后台及其资源转发到现有 Web 服务。HTTP 跳转 HTTPS，密码登录限制频率，公网会话 Cookie 为 Secure/HttpOnly/SameSite=Lax。原电脑 SSH 转发仍可使用。

证书为 Let's Encrypt IP 地址证书；`maker-cert-renew.timer` 每天北京时间 03:30、15:30 检查续期并重新加载 nginx。配置模板在 `deploy/maker/mobile-*.conf`，服务器 `/etc/letsencrypt` 保存证书。旧静态容器 `maker-preview-before-mobile` 已停止并保留以便回退。

服务器 `maker-backup.timer` 每天北京时间 04:10 调用 `/usr/local/sbin/maker-backup`，内容来自 `deploy/maker/maker-backup-full`。与采集和投稿共享锁，避免导出文件正在更新时备份。完整包为 `/root/maker-backups/full-时间.tar.gz.gpg`，包含 PostgreSQL 导出、现有项目文件（包括未提交的部署修改和私密运行配置）、Git bundle、应用数据卷、证书及 systemd/运维脚本；排除 node_modules 和原始 .git 目录。使用 GPG AES256 加密，附 SHA256 校验，现阶段不自动删除历史副本。

恢复密钥在服务器 `/root/maker-backup-recovery.key`，本地副本在项目 `.data/server-backups/maker-backup-recovery.key`，权限 600。密钥须独立保管，不上传到备份包所在网盘。恢复时先解密、核对包内 SHA256SUMS，再恢复 PostgreSQL 和项目/数据卷及运维配置。2026-10-04 已完成一次解密、各文件校验及独立临时数据库恢复测试；未覆盖实际灾难后的整机重装测试。

Codex 已设置每日北京时间 04:30 同步最新加密包和校验文件至 Google Drive。2026-10-04 重新授权后已成功上传完整加密备份及 SHA256 校验文件，读取元数据确认网盘大小为 24,296,979 字节，与本地一致；文件夹为 https://drive.google.com/drive/folders/1esznEEKeLsM89WWfJ_JPfVKUZhOb5VWs 。此同步依赖电脑上的 Codex 可运行；服务器本地备份独立持续。上传后须读取网盘元数据确认，并记录文件 ID 防止重复上传。不要上传恢复密钥、SSH 私钥或未加密配置。
