SHELL=/bin/bash
STARTDEV = npm run start:dev 


all: backendDevBuild docker

backendDevBuild: docker
	@sudo npm run start:dev auth & sudo npm run start:dev 
	

auth:
	sudo $(STARTDEV) auth

api:
	sudo $(STARTDEV)

docker:
	@echo "Running containers"
	@sudo systemctl stop mysql
	@sudo systemctl stop postgresql
	@sudo docker compose up -d  --remove-orphans


prisma:
	@sudo prisma migrate dev --name $(name)


git:
	@git add .
	@git commit -a -$(m)
	@git push $(origin)

proto:
	@echo "Generating proto files..."
	@npm run proto:generate ./proto/*.proto