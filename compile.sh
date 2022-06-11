#!/bin/bash
export NODE_ENV

function prinftValues {
  echo ">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>"
  echo "NODE_ENV      $NODE_ENV"
  echo ">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>"
}

# # revisar que existan las variables necesarias
function help {
  echo ">> help <<"
  echo "--env Entorno del desarrollo ['production', 'development']"
}

function prinftTitle {
  echo ""
  echo "____$1____"z
}

function checkValues {
  if [ -z "$NODE_ENV" ] ; then
    echo "No se especificó el entorno del desarrollo."
    echo "Utilice --env ['production', 'development']"
    errorDetectado=true
  fi
}

prinftTitle "Se levantará el contenedor de Backend para el servidor de yogigo"

sleep 1
while test $# -gt 0; do
  case "$1" in
    --env)
      shift
      NODE_ENV=$1
      shift
      ;;
    --help)
      help
      exit 1
      ;;
    *)
      echo "" #new line
      echo "$1 no es un parámetro reconocido! :("
      echo "" #new line
      help
      exit 1
      ;;
  esac
done

errordDetectado=false
checkValues

if [ "$errorDetectado" = true ] ; then
  help
  exit 1
fi

echo "VARIABLES ACTUALIZADAS"
prinftValues
sleep 3

# eliminar contenedores anteriores (en caso de que existan)
prinftTitle "ELIMINAR CONTENEDORES"
sudo docker rm -f app-example-services

prinftTitle "ELIMINAR IMAGENES DE CONTENEDORES"
sudo docker image rm -f app-example-services-image:latest

# crear imagen pm2
prinftTitle "CREAR IMAGEN SERVER"
sudo docker build --quiet --file NoInstall.Dockerfile --tag app-example-services-image:latest .

# server 
prinftTitle "LEVANTAR CONTENEDOR SERVER"
sudo docker run -dp 3000:3000 \
--name app-example-services --label app=app-example-services app-example-services-image