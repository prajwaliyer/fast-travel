# fast-travel
 
## Developer Setup
These instructions were made in WSL2 running Ubuntu 20.04 distro. If using WSL, you will also need to download the 'Remote - WSL' VSCode extension that is linked in the 'VSCode Extensions' section. You will also need the environment file (ask developer).

### NodeJS Installation
```
sudo apt update && sudo apt upgrade
sudo apt-get install curl
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.1/install.sh | bash
command -v nvm         # this should return 'nvm', if you receive 'command not found' or no response at all, close your current terminal, reopen it, and try again
nvm ls                 # list node version
nvm install --lts
nvm ls                 # list node version
node --version         # verify node installation
npm --version          # verify npm installation
```

### Link WSL to VSCode
After downloading the 'Remote - WSL' extension in VSCode, in the WSL terminal open VSCode by cd to the project folder and entering:
```
code .
```
You can now close the WSL terminal and use the built-in VSCode terminal.

### Django Installation
It is recommended to work in a virtual environment. Inside the project folder:
```
sudo apt install python3.8-venv
python3 -m venv .venv
```
If using virtual environment, run the following command **the first time and every time** you quit your environment and re-enter:
```
source .venv/bin/activate
```
If done correctly, this will show a (.venv) at the start of every terminal line.

Install Django:
```
python3 -m pip install django
pip install python-dotenv
pip install djangorestframework
```

cd into the frontend folder and run:
```
npm run build
```

To run the project, cd back to the base directory and run:
```
python manage.py runserver
```

### VSCode Extensions
- Name: Remote - WSL:
https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-wsl
- Name: ES7+ React/Redux/React-Native snippets:
https://marketplace.visualstudio.com/items?itemName=dsznajder.es7-react-js-snippets
- Name: JavaScript (ES6) code snippets:
https://marketplace.visualstudio.com/items?itemName=xabikos.JavaScriptSnippets
- Name: Django:
https://marketplace.visualstudio.com/items?itemName=batisteo.vscode-django
- Name: Python:
https://marketplace.visualstudio.com/items?itemName=ms-python.python
