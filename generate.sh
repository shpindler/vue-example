#!/usr/bin/env bash

# Путь до django-проекта.
backend_path=${1:-../ssuz}
# Путь до nuxt-проекта.
frontend_path="$(dirname -- ${0})"

if [[ ${2} != "off" ]]; then
  # Устанавливаем зависимости.
  cd ${frontend_path}
  npm install
  cd -
fi

# Удаляет сгенерированную ранее статику.
if [[ -e "$backend_path/static/_nuxt" ]]; then
  rm -rf ${backend_path}/static/_nuxt
fi

# Удаляет сгенерированные ранее шаблоны.
if [[ -e "$backend_path/templates/index.html" ]]; then
  rm -f ${backend_path}/templates/index.html
fi

# Сгенерировать.
STATIC_ROOT=/static npm run build
mv ${frontend_path}/dist/_nuxt ${backend_path}/static
mv ${frontend_path}/dist/index.html ${backend_path}/templates

# Очистить папку со сборкой.
rm -rf ${frontend_path}/dist

# Скопировать статику.
cp -R ${frontend_path}/static/nuxt-static ${backend_path}/static
