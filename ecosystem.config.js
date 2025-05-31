module.exports = {
  apps: [
    {
      name: 'zenovate-site',
      exec_mode: 'cluster',
      instances: '1',
      script: 'node_modules/next/dist/bin/next',
      args: 'start -p 3030'
    }
  ]
}
