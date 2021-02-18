# rzhd

> Клиентская часть РЖД проекта на Nuxt.js

## Подготовка окружения.
``` bash
# Установка нужной версии NodeJS.
$ nvm install
$ nvm use

# Установка пакетов.
$ npm install
```

## Build Setup

``` bash
# build
$ bash generate.sh[[ APP_PATH] SHOULD_NPM_INSTALL]
APP_PATH - путь до Django-проекта, по умолчанию ../ssuz.
SHOULD_NPM_INSTALL - выполнить ли npm install перед сборкой,
значение off отключает предварительный npm install,
по умолчанию включено.
```

For detailed explanation on how things work, checkout the [Nuxt.js docs](https://github.com/nuxt/nuxt.js).
