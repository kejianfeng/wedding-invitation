module.exports = {
  apps: [
    {
      name: 'wedding-invitation',
      script: 'npm',
      args: 'start',
      cwd: '/data/wedding-invitation',
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: '1G',
      env: {
        NODE_ENV: 'production',
        PORT: 5200
      },
      error_file: '/data/wedding-invitation/logs/err.log',
      out_file: '/data/wedding-invitation/logs/out.log',
      log_file: '/data/wedding-invitation/logs/combined.log',
      time: true
    }
  ]
}; 