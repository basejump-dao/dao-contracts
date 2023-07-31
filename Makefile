
.PHONY: build clean

CONTRACT_OUT := artifacts/contracts/BAsejumpDAO.sol/BAsejumpDAO.json

CONTRACT_FILES := $(shell find contracts -type f)

TEST_FILES := $(shell find tests -type f)

build: ${CONTRACT_OUT}

${CONTRACT_OUT}: ${CONTRACT_FILES}
	@npx hardhat compile

test: ${CONTRACT_FILES} ${TEST_FILES}
	@npx hardhat test --parallel
	@touch test

docker: Dockerfile ${CONTRACT_FILES} ${TEST_FILES}
	@docker build -t "BasejumpDAO" .

clean:
	rm -rf node_modules artifacts cache docker
