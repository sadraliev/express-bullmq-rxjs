start:
	docker-compose up -d
stop:
	docker-compose down
dev: 
	npm run start:dev
build: 
	npm run build 
pub:
	npm run pub
sub:
	npm run sub
server:
	npm run server
parser:
	npm run parser
app:
	npm run app

